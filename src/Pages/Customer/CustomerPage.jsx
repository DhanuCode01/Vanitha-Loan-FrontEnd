import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CustomerPage() {
  const [members, setMembers] = useState([]);
  const [loaded, SetLoaded] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");

  const key = localStorage.getItem("key");
  const token = localStorage.getItem("token");

  const navigate=useNavigate();

  useEffect(() => {
    if (token && key) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/customer/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMembers(res.data.groupRows);
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

  const filteredMembers = members.filter(
    (member) =>
      member.CustomerID?.toLowerCase().includes(searchTerm.toLowerCase()) ||            //filter search member in members array
      member.CUSTOMER_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||         //check CustomerID
      member.NIC?.toLowerCase().includes(searchTerm.toLowerCase())                      //check NIC
  );

  return (
    <div className="p-6 bg-primary min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black ml-[250px]">Customer List</h1>
        <input
          type="text"
          placeholder="Search by ID, Name or NIC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm text-left text-black border-black border-2">
            <thead className="bg-accent text-white uppercase text-s">
              <tr>
                <th className="border px-4 py-3">Customer ID</th>
                <th className="border px-4 py-3">Name</th>
                <th className="border px-4 py-3">Address</th>
                <th className="border px-4 py-3">NIC</th>
                <th className="border px-4 py-3">Mobile No</th>
                <th className="border px-4 py-3">Telephone No</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={index}
                  className="border-black border-x-2 hover:bg-secoundary cursor-pointer transition"
                  onDoubleClick={() =>
                    /* console.log("HI", member.CustomerID); */
                    navigate(`/account/${member.CustomerID}`)

                  }
                >
                  <td className="border px-4 py-2">{member.CustomerID}</td>
                  <td className="border px-4 py-2">{member.CUSTOMER_NAME}</td>
                  <td className="border px-4 py-2">{member.CUSTOMER_ADDRESS}</td>
                  <td className="border px-4 py-2">{member.NIC}</td>
                  <td className="border px-4 py-2">{member.PersonnalMobileNo}</td>
                  <td className="border px-4 py-2">{member.PersonnalTelephoneNo}</td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-400 italic py-6"
                  >
                    No matching results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
