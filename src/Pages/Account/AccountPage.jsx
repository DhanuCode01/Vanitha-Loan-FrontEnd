import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountPage(){
    const params =useParams(); //Read and Assign The parameter  //passed
    const key=params.key;
    const navigate=useNavigate();

    const [details,setDetails]=useState();
    const [loaded,setLoaded]=useState("Loading");

    const token=localStorage.getItem('token');

    useEffect(()=>{
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/account/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data.AccountRows[0])
          setDetails(res.data.AccountRows[0]);
          setLoaded("Loaded");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "An Error Occurred❗");
          setLoaded("Error");
        });
    } else {
      toast.error("Please login and try again...❗");
      setLoaded("Error");
    }
    },[])



            function InfoRow({ label, value }) {
                    return (
                        <div className="flex justify-between border-b pb-1">
                        <span className="font-medium">{label}:</span>
                        <span className="text-right">{value}</span>
                        </div>
                    );
        }


    return(
 
        <div className="min-h-screen bg-primary p-6">
  {/* Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-black ml-[250px]">Account Details - {key}</h1>
  </div>

  {/* Loading State */}
  {loaded === "Loading" && (
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
      <span className="text-sm font-medium">Loading account details...</span>
    </div>
  )}

  {/* Error State */}
  {loaded === "Error" && (
    <p className="text-red-500 text-sm italic">Failed to load account details.</p>
  )}

  {/* Loaded State */}
  {loaded === "Loaded" && details && (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-3xl mx-auto mt-[100px]">
      <h2 className="text-2xl font-semibold text-accent mb-4">Account Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-m text-gray-700">
        <InfoRow label="Account Number" value={details.ACCOUNT_NO} />
        <InfoRow label="Customer ID" value={details.CUS_ID} />
        <InfoRow label="Ledger Name" value={details.LEDGER_NAME} />
        <InfoRow label="Account Balance" value={`Rs. ${parseFloat(details.ACC_BAL).toFixed(2)}`} />
        <InfoRow label="Interest Amount" value={`Rs. ${parseFloat(details.INTE_AMOUNT).toFixed(2)}`} />
        <InfoRow label="Loan Issued Date" value={new Date(details.LOAN_ISSUED_DATE).toLocaleDateString()} />
        <InfoRow label="Loan Period (Months)" value={details.LOAN_PERIOD} />
        <InfoRow label="Loan Installment" value={`Rs. ${parseFloat(details.LOAN_INSTALLMENT).toFixed(2)}`} />
        <InfoRow label="Payable Installment" value={`Rs. ${parseFloat(details.PAYABLE_INSTALLMENT).toFixed(2)}`} />
        <InfoRow label="Last Paid Date" value={new Date(details.LAST_PAID).toLocaleDateString()} />
      </div>
      <div className="mt-6 flex justify-between">
        <button
            onClick={() => navigate("/add", { state: details })}
            className="bg-accent text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200 hover:bg-primary hover:text-black"
        >
            Add New Entry
        </button>
        <button
            /* onClick={() => navigate("/update", { state: details })} */
            className="bg-accent text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200 hover:bg-primary hover:text-black"
        >
            Update last Entry
        </button>
       </div>

    </div>
  )}
</div>

    );
}