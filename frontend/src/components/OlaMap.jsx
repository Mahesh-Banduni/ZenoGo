import { useEffect } from "react";
import { OlaMaps } from "olamaps-web-sdk";

const OlaMap = (rideData) => {
    console.log(rideData.rideData);
    useEffect(() => {
        // Initialize Ola Maps with API Key
        const olaMaps = new OlaMaps({
            apiKey: import.meta.env.VITE_OLAMAPS_API_KEY, // Replace with your API key
        });

        // Compute the midpoint between pickup and drop-off
        let centerLat, centerLng;
        if (rideData?.rideData) {
            const { pickupLat, pickupLng, dropOffLat, dropOffLng } = rideData.rideData;
            centerLat = (pickupLat + dropOffLat) / 2;
            centerLng = (pickupLng + dropOffLng) / 2;
        } else {
            // Default center (India)
            centerLat = 22.5937;
            centerLng = 78.9629;
        }

        // Render the map
        const myMap = olaMaps.init({
            style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            container: "map",
            center: [centerLng, centerLat], // Centered at the midpoint of the route
            zoom: rideData?.rideData ? 10 : 4, // Adjust zoom level
        });

        if (rideData.rideData) {
            const { pickupLat, pickupLng, dropOffLat, dropOffLng, polyline } = rideData.rideData;

            // Add marker for Drop-off
            const dropOffMarker = olaMaps
                .addMarker({ color: "red" })
                .setLngLat([dropOffLng, dropOffLat])
                .addTo(myMap)
                .setPopup(
                    olaMaps.addPopup({ offset: [0, -10] }).setText("Drop-off Location")
                );

            // Add marker for Pickup
            const pickupMarker = olaMaps
                .addMarker({ color: "green" })
                .setLngLat([pickupLng, pickupLat])
                .addTo(myMap)
                .setPopup(
                    olaMaps.addPopup({ offset: [0, -10] }).setText("Pickup Location")
                );

            // Function to decode Ola Maps polyline
            function decodePolyline(encoded) {
                let coordinates = [];
                let index = 0, len = encoded.length;
                let lat = 0, lng = 0;

                while (index < len) {
                    let shift = 0, result = 0, byte;
                    do {
                        byte = encoded.charCodeAt(index++) - 63;
                        result |= (byte & 0x1f) << shift;
                        shift += 5;
                    } while (byte >= 0x20);
                    let deltaLat = (result & 1) ? ~(result >> 1) : result >> 1;
                    lat += deltaLat;

                    shift = 0;
                    result = 0;
                    do {
                        byte = encoded.charCodeAt(index++) - 63;
                        result |= (byte & 0x1f) << shift;
                        shift += 5;
                    } while (byte >= 0x20);
                    let deltaLng = (result & 1) ? ~(result >> 1) : result >> 1;
                    lng += deltaLng;

                    coordinates.push([lng / 1e5, lat / 1e5]);
                }
                return coordinates;
            }

            // Decode and plot the polyline
            const decodedCoordinates = decodePolyline(polyline);
            myMap.on("load", () => {
                myMap.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: decodedCoordinates,
                        },
                    },
                });

                myMap.addLayer({
                    id: "route-line",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#e88205",
                        "line-width": 4,
                    },
                });
            });
        }
    }, []);

    return <div id="map" className="w-full lg:w-3/5 md:w-2/4 h-svh" />;
};

export default OlaMap;
