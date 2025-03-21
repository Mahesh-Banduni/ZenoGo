import { NavLink } from "react-router-dom";

const CTASection = () => {
    return (
        <div className="py-16 bg-gray-800 text-white text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to Ride?</h2>
        <p className="mt-3 text-base sm:text-lg">Book your ride now and enjoy a smooth experience.</p>
        <NavLink to="/select-ride">
         <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg">
          Book a Ride
         </button>
        </NavLink>

      </div>
      
    );
  };
  
  export default CTASection;
  