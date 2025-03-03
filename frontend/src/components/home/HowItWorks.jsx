import { ClipboardCheck, MapPin, Car, DollarSign } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { icon: <MapPin size={40} />, title: "Enter Your Location", description: "Pick your pickup and drop-off points with ease." },
    { icon: <ClipboardCheck size={40} />, title: "Choose Your Ride", description: "Select from a variety of comfortable rides." },
    { icon: <Car size={40} />, title: "Track Your Ride", description: "Get real-time updates and estimated arrival time." },
    { icon: <DollarSign size={40} />, title: "Pay & Enjoy", description: "Hassle-free payments and a comfortable ride." },
  ];

  return (
    <div className="py-14 px-4 bg-gray-100 text-black text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">How It Works</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
    {steps.map((step, index) => (
      <div key={index} className="p-5 bg-white rounded-xl shadow-md flex flex-col items-center">
        <div className="text-yellow-500 text-3xl mb-3">{step.icon}</div>
        <h3 className="text-lg font-semibold">{step.title}</h3>
        <p className="text-gray-600 text-sm">{step.description}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default HowItWorks;
