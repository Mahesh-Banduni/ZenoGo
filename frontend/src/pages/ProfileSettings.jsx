import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { useSelector } from "react-redux";
import { logo } from "../utils/icons";

const ProfileSettings = () => {
  const profile = useSelector(state => state.profile);
  const {status, setStatus, fetchProfile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile(); // Fetch user data when component mounts
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData.name, formData.phone);
      setIsEditing(false);
      fetchProfile();    
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  if (profile.loading) return (
    <div className="flex items-center justify-center h-64 gap-2">
      <div className="relative animate-pulse overflow-hidden rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105">
          {/* <img src={logo} alt="ZenoGo Logo" className="h-7 sm:h-8 md:h-9 w-auto object-contain transform transition-transform duration-300 group-hover:rotate-3" /> */}
          <p>Loading</p>
        </div>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600">
      </div>
    </div>
  );
  if (profile.error) return <p className="text-center text-red-500">{profile.error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile Settings</h2>
      <hr></hr>
      <br></br>
      {status.message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            status.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {status.message}
          </div>
        )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              isEditing ? "border-amber-400" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={true}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              isEditing ? "border-amber-400 bg-gray-100 cursor-not-allowed" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              isEditing ? "border-amber-400" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {!isEditing ? (
            <button
              type="button"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              onClick={() => setIsEditing(true) && setStatus({type:'', message:''})}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
