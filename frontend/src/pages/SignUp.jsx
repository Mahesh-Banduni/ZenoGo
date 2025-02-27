// components/SignUp.js
import useSignUp from "../hooks/useSignUp";
import { NavLink } from "react-router-dom";
import { signup } from "../utils/icons"; // You can change this to a relevant signup image

const SignUp = () => {
  const { formData, handleChange, handleSubmit, loading, status } = useSignUp();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold text-center">
          Your Ride, Your Way – Fast, Safe, Reliable. Sign Up & Ride!
        </h2>

        {status.message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              status.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-md font-bold text-white transition ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
          Already have an account?{" "}
          <NavLink to="/login" className="text-amber-600 hover:text-amber-700">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
