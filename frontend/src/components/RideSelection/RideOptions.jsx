import {scooter, mini, sedan, SUV} from "../../utils/icons"
const RideOptions = ({ onSelect, value }) => {
  const options = [
    { id: 'Bike', image: scooter, name: 'Bike', description: 'Zip through traffic at affordable fares' },
    { id: 'Mini', image: mini, name: 'Mini', description: 'Comfy hatchbacks at pocket-friendly fares' },
    { id: 'Sedan', image: sedan, name: 'Sedan', description: 'Sedans with free wifi and top drivers' },
    { id: 'SUV', image: SUV, name: 'SUV', description: 'SUVs with free wifi and top drivers' }
  ];

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <div
          key={option.id}
          role="button"
          tabIndex={0}
          className={`p-2 rounded-lg border flex items-center cursor-pointer ${
            value === option.id ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            onSelect(option.id);
          }}
        >
          <img src={option.image} alt={option.name} className="h-8 w-12 mr-2" />
          <div className="flex flex-col items-start text-left w-full">
             <h3 className="font-bold sm:text-sm">{option.name}</h3>
             <p className="text-xs text-gray-600 break-words">{option.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideOptions;
