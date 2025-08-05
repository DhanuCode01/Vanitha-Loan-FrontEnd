import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountPage() {
  const params = useParams();
  const key = params.key;
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState("Loading");

  const [creditAmounts, setCreditAmounts] = useState({});
  const [descriptions, setDescriptions] = useState({});

  const token = localStorage.getItem("token");

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
  }, []);

          function InfoRow({ label, value }) {
            return (
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">{label}:</span>
                <span className="text-right">{value}</span>
              </div>
            );
          }

  async function handleOnClick(detail, index) {
                  const token = localStorage.getItem("token");
                  const user = JSON.parse(localStorage.getItem("user"));
                  const creditAmount = creditAmounts[index] || "";
                  const description = descriptions[index] || "";
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

  return (
    <div className="min-h-screen bg-primary p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black ml-[250px]">
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
        <div>
          {details.map((detail, index) => (
            <div
              key={detail.ACCOUNT_NO || index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-3xl mx-auto mt-[100px]"
            >
              <h2 className="text-2xl font-semibold text-accent mb-4 border-b pb-2">
                ACCOUNT NUMBER : {detail.ACCOUNT_NO}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-m text-gray-700">
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
                    onClick={() => handleOnClick(detail, index)}
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
    </div>
  );
}
