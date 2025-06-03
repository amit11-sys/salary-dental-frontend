const StateCard = ({ state, salary, submission }: any) => {
  return (
    <div
      
    //   href="/specialty/emergency-medicine/alabama"
    >
      <h3 className="font-semibold text-gray-900">{state}</h3>
      <p className="text-gray-600">${salary} year</p>
      <p className="text-sm text-gray-500">{submission} reports</p>
    </div>
  );
};

export default StateCard;
