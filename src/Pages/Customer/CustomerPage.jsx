import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InstallmentCard from "../../Components/InstallmentCard";

export default function CustomerPage() {
  const [members, setMembers] = useState([]);
  const [loaded, SetLoaded] = useState("loading");

  const token = localStorage.getItem("token");

  const navigate=useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/customer/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMembers(res.data.Rows);
          SetLoaded("Loaded");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.Message || "An Error Occurred❗");
          SetLoaded("Error");
        });
    } else {
      toast.error("Please login and try again...❗");
      SetLoaded("Error");
    }
  }, []);

const total = members.reduce((acc, member) => acc + (member.CreditAmount || 0), 0);





  return (
    <div className="px-4 py-6 md:px-6 bg-primary min-h-screen">
  
      {/* Loading / Error / Table */}
      {loaded === "loading" && (
        <div className="flex items-center gap-3 text-accent animate-pulse">
          <svg
            className="w-5 h-5 animate-spin text-accent"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 1010 10h-2a8 8 0 11-8-8z"
            ></path>
          </svg>
          <span className="text-sm font-medium">Loading members...</span>
        </div>
      )}

      {loaded === "Error" && (
        <p className="text-red-500 text-sm italic">Failed to load data.</p>
      )}

      {loaded === "Loaded" && (
        <div className="space-y-4">
        {members.map((member, idx) => (
                    <InstallmentCard key={idx} idx={idx} member={member}/>
                  ))}
              <h6 className="mt-4 text-base md:text-lg font-semibold text-accent">
                Today Total: {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h6>
          </div>
          )}
 
    </div>
  );
}
