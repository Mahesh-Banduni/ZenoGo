const Testimonials = () => {
    const reviews = [
      { name: "Rohit Kohli", text: "Amazing service! The ride was smooth and on time.", location: "Dehradun, Uttarakhand" },
      { name: "Sarah Khan", text: "Very affordable and convenient. Loved the experience!", location: "Mumbai, Maharashtra" },
      { name: "Amit Iyer", text: "Best ride-hailing service I've used so far.", location: "Bengaluru, Karnataka" },
    ];
  
    return (
      <div className="py-16 px-4 bg-white">
        <h2 className="text-4xl font-bold text-center text-black">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">

          {reviews.map((review, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-xl shadow-lg text-center">
              <p className="text-gray-700 italic">"{review.text}"</p>
              <h3 className="mt-4 text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Testimonials;
  