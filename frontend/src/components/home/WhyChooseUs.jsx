import { ShieldCheck, Clock, ThumbsUp, Smartphone } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    { icon: <ShieldCheck size={40} />, title: "Safe & Secure", description: "All rides are monitored for your safety." },
    { icon: <Clock size={40} />, title: "On-Time Service", description: "Reliable and punctual rides always." },
    { icon: <ThumbsUp size={40} />, title: "Affordable Pricing", description: "Transparent fares with no hidden charges." },
    { icon: <Smartphone size={40} />, title: "Easy Booking", description: "Book rides instantly via our app or website." },
  ];

  return (
    <div className="py-16 px-4 bg-amber-100">
      <h2 className="text-4xl font-bold text-center text-black">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">

        {benefits.map((benefit, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-lg text-center flex flex-col items-center">
            <div className="text-yellow-500 mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
