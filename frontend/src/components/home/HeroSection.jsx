import { Search, MapPin, Navigation, X } from "lucide-react";
import { banner } from "../../utils/icons";
import useRide from "../../hooks/useRide";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    clearInput,
    loading,
    locationResults,
    handleSelectLocation,
    handleHeroSection,
    showDropdown,
  } = useRide();

  const [dropdownType, setDropdownType] = useState(null);

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
          Hassle-Free Rides, Anytime, Anywhere!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Book your ride instantly with quick and easy navigation.
        </p>

        {/* Search Bar */}
        <form
          className="mt-6 bg-amber-100 text-black p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-3 max-w-2xl mx-auto"
          onSubmit={(e) => handleHeroSection(e, formData)} // Pass `formData` correctly
        >
          {/* Pickup Input */}
          <div className="relative w-full">
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"
              size={20}
            />
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={(e) => {
                handleChange(e);
                setDropdownType("pickup");
              }}
              className="w-full py-3 pl-12 pr-10 rounded-lg bg-gray-100 border border-gray-300"
              placeholder="Pickup Location..."
              required
            />
            {formData.pickupAddress && (
              <X
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                size={18}
                onClick={() => clearInput("pickupAddress")}
              />
            )}
            {showDropdown && dropdownType === "pickup" && locationResults.length > 0 && (
              <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-50">
                {locationResults.map((location, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleSelectLocation("pickupAddress", location.address);
                      handleSelectLocation("pickupLat", location.lat);
                      handleSelectLocation("pickupLng", location.lng);
                    }}
                  >
                    {location.address}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropoff Input */}
          <div className="relative w-full">
            <Navigation
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 fill-black"
              size={20}
            />
            <input
              type="text"
              name="dropOffAddress"
              value={formData.dropOffAddress}
              onChange={(e) => {
                handleChange(e);
                setDropdownType("dropoff");
              }}
              className="w-full py-3 pl-12 pr-10 rounded-lg bg-gray-100 border border-gray-300"
              placeholder="Dropoff Location..."
              required
            />
            {formData.dropOffAddress && (
              <X
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                size={18}
                onClick={() => clearInput("dropOffAddress")}
              />
            )}
            {showDropdown && dropdownType === "dropoff" && locationResults.length > 0 && (
              <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-50">
                {locationResults.map((location, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleSelectLocation("dropOffAddress", location.address);
                      handleSelectLocation("dropOffLat", location.lat);
                      handleSelectLocation("dropOffLng", location.lng);
                    }}
                  >
                    {location.address}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2"
            type="submit"
            disabled={loading}
          >
            <Search size={20} /> {loading ? "Processing..." : "Find Ride"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
