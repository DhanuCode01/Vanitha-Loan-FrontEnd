import { useNavigate } from "react-router-dom";


export default function CustomerCard({ idx, member }) {
    
    const navigate=useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      className="p-2 rounded-xl bg-secondary hover:bg-accent text-black hover:text-white transition-colors duration-200 shadow-md cursor-pointer space-y-1"
      onClick={() =>/*  console.log("HI") */navigate(`/account/${member.CustomerID}`)
                  }
    >
      <h5 className=" font-semibold truncate text-xs">
        {idx + 1}. {member.CUSTOMER_NAME}
      </h5>

      <div className="text-xs">
        <p><span className="font-small">Customer ID:</span> {member.CustomerID}</p>
        <p><span className="font-small">NIC:</span> {member.NIC}</p>
        <p><span className="font-small">Mobile:</span> {member.PersonnalMobileNo}</p>
      </div>
    </div>
  );
}
