const ChildCard = ({ child, onExpressInterest, onDonate }) => {
    const fundingRaised = Number(child.fundingRaised) || 0;
    const fundingGoal = Number(child.fundingGoal) || 1; // avoid division by zero
  
    const fundingPercent = Math.min(
      Math.round((fundingRaised / fundingGoal) * 100),
      100
    );
  
    return (
      <div className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl shadow-md p-5 w-full max-w-sm relative">
        {child.urgent && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold shadow-md z-10">
            URGENT
          </span>
        )}
  
        <img
          src={`http://localhost:5000/uploads/${child.photo}`}
          alt={child.name}
          className="w-full h-48 object-cover rounded"
        />
        <h4 className="mt-2 font-semibold text-lg">{child.name}</h4>
        <p>Age: {child.age}</p>
        <p>Education: {child.education}</p>
        <p>Location: {child.location}</p>
  
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-1">
            Funding: ₹{fundingRaised.toLocaleString()} / ₹{fundingGoal.toLocaleString()}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                fundingPercent === 100 ? "bg-green-600" : "bg-blue-500"
              }`}
              style={{ width: `${fundingPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{fundingPercent}% funded</p>
        </div>
  
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onExpressInterest(child)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Express Interest
          </button>
  
          <button
            onClick={() => onDonate(child)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Donate
          </button>
        </div>
      </div>
    );
  };
  export default ChildCard;
