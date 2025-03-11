import { useEffect } from "react";
import { OlaMaps } from "olamaps-web-sdk";

const OlaMap = ({ rideData }) => {
    console.log("Ride Data:", rideData);

    useEffect(() => {
        // Initialize Ola Maps with API Key
        const olaMaps = new OlaMaps({
            apiKey: import.meta.env.VITE_OLAMAPS_API_KEY, // Replace with your API key
        });

        // Extract rideData values safely
        const pickupLat = rideData?.pickupLat ?? null;
        const pickupLng = rideData?.pickupLng ?? null;
        const dropOffLat = rideData?.dropOffLat ?? null;
        const dropOffLng = rideData?.dropOffLng ?? null;

        // Compute the center safely, fallback to default location (India)
        let centerLat = 22.5937, centerLng = 78.9629; // Default India location
        if (pickupLat !== null && pickupLng !== null && dropOffLat !== null && dropOffLng !== null) {
            centerLat = (pickupLat + dropOffLat) / 2;
            centerLng = (pickupLng + dropOffLng) / 2;
        }

        // Render the map
        const myMap = olaMaps.init({
            style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            container: "map",
            center: [centerLng, centerLat], // Prevents NaN errors
            zoom: rideData && pickupLat !== null ? 10 : 4, // Adjust zoom level
        });

        if (pickupLat !== null && pickupLng !== null && dropOffLat !== null && dropOffLng !== null) {
            // Add Pickup Marker
            const pickupMarker = olaMaps
                .addMarker({ color: "green" })
                .setLngLat([pickupLng, pickupLat])
                .addTo(myMap);

            // Add Drop-off Marker
            const dropOffMarker = olaMaps
                .addMarker({ color: "red" })
                .setLngLat([dropOffLng, dropOffLat])
                .addTo(myMap);

            // Create Always Visible Popup for Pickup
            const pickupPopup = olaMaps
                .addPopup({ offset: [0, -30] }) // Adjust offset for better visibility
                .setText(`📍 Pickup: ${rideData.pickupAddress}`)
                .addTo(myMap);

            pickupMarker.setPopup(pickupPopup); // Attach popup to marker
            pickupPopup.addTo(myMap); // Make it always visible

            // Create Always Visible Popup for Drop-off
            const dropOffPopup = olaMaps
                .addPopup({ offset: [0, -30] }) // Adjust offset for better visibility
                .setText(`📍 Drop-off: ${rideData.dropOffAddress}`)
                .addTo(myMap);

            dropOffMarker.setPopup(dropOffPopup);
            dropOffPopup.addTo(myMap);
        }

        // Handle polyline if present
        if (rideData?.polyline) {
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
            const decodedCoordinates = decodePolyline(rideData.polyline);
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
    }, [rideData]);

    return <div id="map" className="lg:w-3/4 md:w-2/4 h-screen" />;
};

export default OlaMap;
