import {scooter, mini, sedan, SUV} from "../../utils/icons"

const RideOptions = ({ onSelect, selectedOption }) => {
    const options = [
      { id: 'Bike',image: scooter, name: 'Bike', description: 'Zip through traffic at affordable fares' },
      { id: 'Mini',image:mini, name: 'Mini', description: 'Comfy hatchbacks at pocket-friendly fares' },
      { id: 'Sedan',image:sedan, name: 'Sedan', description: 'Sedans with free wifi and top drivers' },
      { id: 'SUV',image:SUV, name: 'SUV', description: 'SUVs with free wifi and top drivers' }
    ];
  
    return (
      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            className={`p-3 rounded-lg border flex items-center justify-items-start ${
              selectedOption === option.id
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-300'
            }`}
            onClick={() => onSelect(option.id)}
          >
            <img src={option.image} alt={option.image} className="h-8 w-12 mr-2" />
            <div className="flex flex-col items-start text-left w-full">
               <h3 className="font-bold">{option.name}</h3>
               <p className="text-xs text-gray-600 break-words">{option.description}</p>
            </div>

          </button>
        ))}
      </div>
    );
  };
  
  export default RideOptions;