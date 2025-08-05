import { useNavigate } from "react-router-dom";


export default function InstallmentCard({ idx, member }) {
    
    //const navigate=useNavigate();

  return (
    <div
      className="p-2 rounded-xl bg-secondary hover:bg-accent text-black hover:text-white transition-colors duration-200 shadow-md cursor-pointer space-y-1"
    >
      <h5 className=" font-semibold truncate text-xs">
        {idx + 1}. {member.AccountNumber}
      </h5>

      <div className="text-xs">
        <p><span className="font-small">Account Number:</span> {member.AccountNumber}</p>
        <p><span className="font-small">Customer ID:</span> {member.CustomerID}</p>
        <p><span className="font-small">Transaction Time:</span> {member.TransactionTime}</p>
        <p><span className="font-small">Credit Amount:</span> {member.CreditAmount}</p>
      </div>
    </div>
  );
}
