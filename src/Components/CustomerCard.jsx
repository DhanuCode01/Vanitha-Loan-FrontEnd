import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function CustomerCard({ idx, member ,refresh }) {
  const navigate = useNavigate();
  
  // Detect mobile screen size (max width 767px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Function to handle navigation
  const handleNavigate = () => {
    if (isMobile) {
      navigate(`/mobile/account/${member.CustomerID}`);
      refresh();
    } else {
      navigate(`/desktop/account/${member.CustomerID}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="p-2 rounded-xl bg-secondary hover:bg-accent text-black hover:text-white transition-colors duration-200 shadow-md cursor-pointer space-y-1 touch-manipulation"
      onClick={handleNavigate}       // Works for mouse click
      onTouchEnd={handleNavigate}    // Works for mobile touch
    >
      <h5 className="font-semibold truncate text-xs">
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
