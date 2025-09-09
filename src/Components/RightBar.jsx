import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InstallmentCard from "./InstallmentCard";


export default function RightBar({refresh}) {
  const [members, setMembers] = useState([]);
  const [loaded, SetLoaded] = useState("loading");

 const [selectedAccounts, setSelectedAccounts] = useState([]);

 const [nameOfAccountHolder, setNameOfAccountHolder]=useState("");//manually Enter Value 
 const [date,setDate]=useState();
 const [slip,setSlip]=useState();

 const [showDialog,setShowDialog]=useState(false);



  const token = localStorage.getItem("token");

  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/customer/all/${user.UserID}`, {
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
  }, [loaded,refresh]);

const total = members.reduce((acc, member) => acc + (member.CreditAmount || 0), 0);

const selectedTotal = members
  .filter((m) => selectedAccounts.includes(m.AccountNumber))
  .reduce((acc, m) => acc + (m.CreditAmount || 0), 0);




const handleAccountChange = (accountNumber) => {
  setSelectedAccounts((prev) => {
    if (prev.includes(accountNumber)) {
      // if already selected → remove it
      return prev.filter((acc) => acc !== accountNumber);
    } else {
      // if not selected → add it
      return [...prev, accountNumber];
    }
  });
};

async function handleAddDeposited() {
            if (!slip) {
            toast.error("Please upload a slip❗");
            return;
          }
          // Convert file → ArrayBuffer → Uint8Array (buffer data)
          const arrayBuffer = await slip.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          // Convert Uint8Array into a normal array (so JSON.stringify works well)
          const bufferData = Array.from(uint8Array);


         const token = localStorage.getItem("token");
         const user = JSON.parse(localStorage.getItem("user"));

        if (token) {
                                try {
                                  const result = await axios.post(
                                    `${import.meta.env.VITE_BackEndURL}/api/deposits`,
                                    {
                                      
                                      date:date,
                                      NameOfAccountHolder:nameOfAccountHolder,
                                      Slip: bufferData,
                                      Total: selectedTotal,
                                      UserID: user.UserID,
                                      AccountNumbers:selectedAccounts,
                                    },
                                    {
                                      headers: {
                                        Authorization: "Bearer " + token,
                                      },
                                    }
                                  );

                                  toast.success(result?.data?.message || "Success✔️");

                                  // Optional: clear inputs after success
                                  // Correct reset
                                  setNameOfAccountHolder("");
                                  setDate("");
                                  setSlip(null);
                                  setSelectedAccounts([]);
                                  SetLoaded("loading");

                                } catch (err) {
                                  console.log(err);
                                  toast.error(err?.response?.data?.error || "ERROR ‼️");
                                }
                  } else {
                    toast.error("Please Login First");
                  }
    
}


  return (
    <div className="h-full md:h-screen w-full md:w-[300px] flex flex-col bg-primary overflow-y-auto p-2 space-y-2 ">
  
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
        <div className="space-y-2 h-full w- full relative">
 
            <div className="h-[calc(100%-260px)] overflow-auto">
            {members.map((member, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="SelectedAccountS"
                  value={member.AccountNumber}
                  checked={selectedAccounts.includes(member.AccountNumber)}
                  onChange={() => handleAccountChange(member.AccountNumber)}
                />
                <InstallmentCard idx={idx} member={member} />
              </div>
            ))}

              <h6 className="mt-4 text-lg font-semibold text-accent">
                Today Total: {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h6>
              </div>
                  <div className="w-[calc(100%-20px)] h-[250px]  absolute bottom-1 rounded-xl shadow-2xl shadow-accent flex flex-col p-2 space-y-2">
                      <input
                        type="text"
                        placeholder="Name Of Account Holder"
                        value={nameOfAccountHolder}
                        onChange={(e) => setNameOfAccountHolder(e.target.value)}
                        className="p-1 rounded border"
                      />

                      <input
                        type="date"
                        value={date || ""}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-1 rounded border"
                      />

                      <input
                        type="file"
                        onChange={(e) => setSlip(e.target.files[0])}
                        className="p-1"
                      />

                      <label className="font-semibold text-accent">
                        Selected Total:{" "}
                        {selectedTotal.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </label>

                      <button
                          onClick={() => {
                            if (!nameOfAccountHolder || selectedAccounts.length === 0 || !date) {
                              toast.error("Find Empty Value Try again ❗");
                              // reset values if needed:
                              setNameOfAccountHolder("");
                              setSelectedAccounts([]);
                              setDate("");
                            } else {
                              setShowDialog(true);
                            }
                          }}
                          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-secoundary hover:text-black"
                        >
                          Deposit
                        </button>

                    </div>    
          </div>
          )}


         {/* Confirmation Dialog */}
                {showDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        Confirm Deposit
                      </h2>

                      <div className="space-y-4 text-sm text-gray-700">
                        <div className="bg-green-100 border border-green-400 rounded-xl p-4 text-center shadow-md">
                          <h1 className="text-green-600 text-3xl font-bold mb-2 animate-pulse">
                            {selectedTotal.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </h1>
                          <p className="text-green-700 font-semibold">
                            Total Deposit Amount
                          </p>
                        </div>

                        <p className="text-gray-600 text-center">
                          Please confirm the details before proceeding:
                        </p>

                        <div className="bg-gray-100 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Account Holder:</span>
                            <span className="text-gray-900">{nameOfAccountHolder || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Account Numbers:</span>
                            <span className="text-gray-900">
                              {selectedAccounts.length > 0
                                ? selectedAccounts.join(", ")
                                : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Date:</span>
                            <span className="text-gray-900">{date || "-"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          onClick={() => setShowDialog(false)}
                          className="px-4 py-2 bg-gray-300 rounded-lg text-sm font-medium hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            handleAddDeposited();
                            setShowDialog(false);
                          }}
                          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-secoundary hover:text-black"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}

 
    </div>
  );
}
