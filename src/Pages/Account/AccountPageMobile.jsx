import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountPageMobile() {
  const params = useParams();
  const key = params.key;
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState("Loading");

  const [creditAmounts, setCreditAmounts] = useState({});
  const [descriptions, setDescriptions] = useState({});

  const token = localStorage.getItem("token");

    // dialog box state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  //before show dialog(enter data)  {ConformReEnter}
  const [availableTotal,setAvailableTotal]=useState("");


  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/account/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setDetails(res.data.AccountRows);
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
  }, [key]);

          function InfoRow({ label, value }) {
            return (
              <div className="flex justify-between border-b">
                <span className="font-medium">{label}:</span>
                <span className="text-right">{value}</span>
              </div>
            );
          }

  async function confirmAddEntry() {
                  
                   const token = localStorage.getItem("token");
                  const user = JSON.parse(localStorage.getItem("user"));
                  const detail = selectedDetail;
                  const index = selectedIndex;
                  const creditAmount = creditAmounts[index] || "";
                  const description = descriptions[index] || "";

                  //check if creditAmount AND description is=null 
                  if (!creditAmount || !description) {
                  toast.error("Please Fill In Credit Amount And Description❗");
                  return;
                }

                  if (token) {
                                try {
                                  const result = await axios.post(
                                    `${import.meta.env.VITE_BackEndURL}/api/installment`,
                                    {
                                      AccountNumber: detail.ACCOUNT_NO,
                                      CustomerID: detail.CUS_ID,
                                      DebitAmount: 0.0,
                                      CreditAmount: creditAmount,
                                      UserName: user.UserName,
                                      UserID: user.UserID,
                                      DeviceId: user.Device_id,
                                      EntryType: "MOBILE",
                                      Description: description,
                                    },
                                    {
                                      headers: {
                                        Authorization: "Bearer " + token,
                                      },
                                    }
                                  );

                                  toast.success(result?.data?.message || "Success✔️");

                                  // Optional: clear inputs after success
                                  setCreditAmounts((prev) => ({ ...prev, [index]: "" }));
                                  setDescriptions((prev) => ({ ...prev, [index]: "" }));
                                } catch (err) {
                                  console.log(err);
                                  toast.error(err?.response?.data?.error || "ERROR ‼️");
                                }
                  } else {
                    toast.error("Please Login First");
                  }
  }


   //before show dialog(enter data)  {ConformReEnter}
  async function checkTodayEntry(detail,index) {

                  const token = localStorage.getItem("token");
                  const creditAmount = creditAmounts[index] || "";
                  const description = descriptions[index] || "";

                  //check if creditAmount AND description is=null 
                  if (!creditAmount || !description) {
                  toast.error("Please Fill In Credit Amount And Description❗");
                  return;
                }

                  if (token) {

                                  try {

                                        const result=await axios
                                              .post(`${import.meta.env.VITE_BackEndURL}/api/installment/get`,
                                                  { AccountNumber:detail.ACCOUNT_NO}, 

                                                  {headers: { Authorization: `Bearer ${token}` },
                                              });
                                              setAvailableTotal(result.data.totalCredit);
                                              setShowDialog(true);
                                    
                                      } catch (error) {
                                            //toast.error(error?.response?.data?.error || "ERROR ‼️");
                                            setAvailableTotal("");
                                            setShowDialog(true);
                                      }
                             
                                
                            } else {
                              toast.error("Please login and try again...❗");
                            }
    
  }

  return (
    <div className="min-h-screen bg-primary px-4 py-2 md:px-6">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-xl md:text-2xl font-bold text-black text-center md:text-left">
          Account Details - {key}
        </h1>
      </div>

      {/* Loading */}
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

      {/* Error */}
      {loaded === "Error" && (
        <p className="text-red-500 text-sm italic">Failed to load account details.</p>
      )}

      {/* Loaded */}
      {loaded === "Loaded" && details && (
        <div className="space-y-8">
          {details.map((detail, index) => (
            <div
              key={detail.ACCOUNT_NO || index}
              className="bg-white rounded-xl shadow-lg p-3 md:p-6 border border-gray-200 w-full max-w-full mx-auto"
            >
              <h2 className="text-lg md:text-2xl font-semibold text-accent mb-4 border-b pb-2">
                ACCOUNT NUMBER : {detail.ACCOUNT_NO}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
                <InfoRow label="Account Number" value={detail.ACCOUNT_NO} />
                <InfoRow label="Customer ID" value={detail.CUS_ID} />
                <InfoRow label="Ledger Name" value={detail.LEDGER_NAME} />
                <InfoRow label="Account Balance" value={`Rs. ${parseFloat(detail.ACC_BAL).toFixed(2)}`}/>
                <InfoRow label="Interest Amount" value={`Rs. ${parseFloat(detail.INTE_AMOUNT).toFixed(2)}`}/>
                <InfoRow label="Loan Issued Date" value={new Date(detail.LOAN_ISSUED_DATE).toLocaleDateString()}/>
                <InfoRow label="Loan Period (Months)" value={detail.LOAN_PERIOD} />
                <InfoRow label="Loan Installment" value={`Rs. ${parseFloat(detail.LOAN_INSTALLMENT).toFixed(2)}`}/>
                <InfoRow label="Payable Installment" value={`Rs. ${parseFloat(detail.PAYABLE_INSTALLMENT).toFixed(2)}`}/>
                <InfoRow label="Last Paid Date" value={new Date(detail.LAST_PAID).toLocaleDateString()} />

                <div className="mt-6 flex flex-col sm:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Credit Amount
                      </label>
                      <input
                        type="number"
                        value={creditAmounts[index] || ""}
                        placeholder="Enter credit amount"
                        onChange={(e) =>
                          setCreditAmounts((prev) => ({
                            ...prev,
                            [index]: e.target.value,
                          }))
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={descriptions[index] || ""}
                        placeholder="Enter description"
                        onChange={(e) =>
                          setDescriptions((prev) => ({
                            ...prev,
                            [index]: e.target.value,
                          }))
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDetail(detail);
                      setSelectedIndex(index);
                      checkTodayEntry(detail,index)
                      //setShowDialog(true);
                    }}
                    className="bg-accent text-white font-semibold px-6 py-2 mt-4 rounded-xl shadow-md transition duration-200 hover:bg-primary hover:text-black"
                  >
                    Add New Entry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Confirmation Dialog */}
            {showDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-primary rounded-xl p-6 shadow-lg max-w-sm w-full">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Confirm New Entry
                  </h2>
      
                  <div className="space-y-3 mb-4 text-sm text-accent">
                      {availableTotal !== "" && (
                        <div className="bg-red-100 border border-red-400 rounded-xl p-4 text-center shadow-md">
                          <h1 className="flex justify-center items-center text-red-600 text-4xl mb-2 animate-bounce">
                            <FaTriangleExclamation />
                          </h1>
                          <h1 className="text-lg font-bold text-red-700">
                            Today you already entered a value
                          </h1>
                          <p className="text-xl font-extrabold text-red-800 mt-1">
                            Rs. {parseFloat(availableTotal).toLocaleString()}
                          </p>
                        </div>
                      )}
      
                      {availableTotal === "" && (
                        <div className="bg-green-100 border border-green-400 rounded-xl p-4 text-center shadow-md">
                          <h1 className="flex justify-center items-center text-green-600 text-4xl mb-2 animate-pulse">
                            <BsBookmarkCheckFill />
                          </h1>
                          <h1 className="text-lg font-bold text-green-700">
                            No entries recorded today
                          </h1>
                        </div>
                      )}
      
                      
                      <p>
                        Are you sure you want to add this entry for:
                      </p>
      
                      <div className="bg-gray-100 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Account Number:</span>
                          <span className="text-gray-800">{selectedDetail?.ACCOUNT_NO}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Credit Amount:</span>
                          <span className="text-gray-800">
                            Rs. {creditAmounts[selectedIndex] || "—"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Description:</span>
                          <span className="text-gray-800">{descriptions[selectedIndex] || "—"}</span>
                        </div>
                      </div>
                    </div>
      
      
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {setShowDialog(false)
                                      setAvailableTotal("")
                                      setCreditAmounts({})
                                      setDescriptions({})
                                    }}
                      className="px-4 py-2 bg-gray-300 rounded-lg text-sm font-medium hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        confirmAddEntry();
                        setShowDialog(false);
                      }}
                      className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-secoundary hover:text-black"
                    >
                      Conform
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
}
