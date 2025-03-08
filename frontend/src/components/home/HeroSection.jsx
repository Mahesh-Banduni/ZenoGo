import { Search, MapPin, Navigation, X } from "lucide-react";
import { banner } from "../../utils/icons";
import useRide from "../../hooks/useRide";
import { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image with overlay and zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-30000 scale-105 animate-slow-zoom"
        style={{ 
          backgroundImage: `url(${banner})`,
          animation: "slowZoom 45s infinite alternate ease-in-out",
        }}
      ></div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

      {/* Content with fade-in animation */}
      <div 
        className={`relative z-10 text-center text-white px-4 sm:px-6 md:px-12 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-400 drop-shadow-xl mb-4 tracking-tight">
          <span className="block animate-slide-in-right" style={{ animationDelay: "0.2s" }}>Hassle-Free Rides,</span>
          <span className="block animate-slide-in-left" style={{ animationDelay: "0.6s" }}>Anytime, Anywhere!</span>
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-gray-200 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          Book your ride instantly with quick and easy navigation.
        </p>

        {/* Search Form with improved visual style */}
        <form
          className="mt-8 bg-black/30 backdrop-blur-sm text-white p-3 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-3 max-w-3xl mx-auto border border-amber-500/30 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
          onSubmit={(e) => handleHeroSection(e, formData)}
        >
          {/* Pickup Input */}
          <div className="relative w-full group">
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 transition-all duration-300 group-hover:text-amber-400"
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
              className="w-full py-3 pl-12 pr-10 rounded-lg bg-white/10 border border-amber-500/40 text-white placeholder-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
              placeholder="Pickup Location..."
              required
            />
            {formData.pickupAddress && (
              <X
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                size={18}
                onClick={() => clearInput("pickupAddress")}
              />
            )}
            {showDropdown && dropdownType === "pickup" && locationResults.length > 0 && (
              <ul className="absolute w-full bg-gray-900/95 border border-amber-500/30 rounded-lg shadow-xl mt-2 max-h-60 overflow-y-auto z-50 animate-fade-in">
                {locationResults.map((location, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-amber-500/20 cursor-pointer text-gray-200 transition-colors duration-200"
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
          <div className="relative w-full group">
            <Navigation
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 transition-all duration-300 group-hover:text-amber-400"
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
              className="w-full py-3 pl-12 pr-10 rounded-lg bg-white/10 border border-amber-500/40 text-white placeholder-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
              placeholder="Dropoff Location..."
              required
            />
            {formData.dropOffAddress && (
              <X
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                size={18}
                onClick={() => clearInput("dropOffAddress")}
              />
            )}
            {showDropdown && dropdownType === "dropoff" && locationResults.length > 0 && (
              <ul className="absolute w-full bg-gray-900/95 border border-amber-500/30 rounded-lg shadow-xl mt-2 max-h-60 overflow-y-auto z-50 animate-fade-in">
                {locationResults.map((location, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-amber-500/20 cursor-pointer text-gray-200 transition-colors duration-200"
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

          {/* Submit Button with pulse effect */}
          <button
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 md:px-8 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-amber-500/20 focus:ring-2 focus:ring-amber-400"
            type="submit"
            disabled={loading}
          >
            <Search size={20} className={loading ? "" : "animate-pulse"} /> 
            <span>{loading ? "Processing..." : "Find Ride"}</span>
          </button>
        </form>

        {/* Hint text */}
        <p className="mt-4 text-amber-300/80 text-sm opacity-0 animate-fade-in" style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}>
          Thousands of drivers ready to pick you up!
        </p>
      </div>

      {/* Animated accent elements */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-amber-500/30 to-orange-500/30 opacity-0 animate-fade-in" style={{ animationDelay: "2s", animationFillMode: "forwards" }}></div>
      
      <div className="absolute top-16 right-12 w-32 h-32 rounded-full bg-amber-500/10 blur-xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-16 left-12 w-24 h-24 rounded-full bg-orange-500/10 blur-xl animate-pulse hidden lg:block"></div>
    </div>
  );
};

export default HeroSection;