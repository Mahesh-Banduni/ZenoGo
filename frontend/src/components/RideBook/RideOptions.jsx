import {scooter, mini, sedan, SUV} from "../../utils/icons"

const RideOptions = ({ selectedOption }) => {
  const options = [
    { id: "Bike", image: scooter, name: "Bike", description: "Zip through traffic at affordable fares" },
    { id: "Mini", image: mini, name: "Mini", description: "Comfy hatchbacks at pocket-friendly fares" },
    { id: "Sedan", image: sedan, name: "Sedan", description: "Sedans with free WiFi and top drivers" },
    { id: "SUV", image: SUV, name: "SUV", description: "SUVs with free WiFi and top drivers" }
  ];

  // Find the selected ride
  const selectedRide = options.find(option => option.id === selectedOption);

  if (!selectedRide) return null; // If no ride is selected, return nothing

  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 rounded-lg border border-amber-500 bg-amber-50 flex items-center justify-start">
        <img src={selectedRide.image} alt={selectedRide.name} className="h-8 w-12 mr-3" />
        <div className="flex flex-col items-start text-left w-full">
          <h3 className="font-bold">{selectedRide.name}</h3>
          <p className="text-xs text-gray-600 break-words">{selectedRide.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
