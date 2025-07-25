import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SideBar() {
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState("Loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const key = localStorage.getItem("key");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BackEndURL}/api/customer/name/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMembers(res.data.groupRows || []);
          setLoaded("Loaded");
        })
        .catch((err) => {
          console.error(err);
          setLoaded("Error");
        });
    } else {
      toast.error("Please login and try again...❗");
    }
  }, []);

  return (
    <div className="w-[250px] h-screen flex bg-primary">
      <aside className="w-[250px] h-full bg-white shadow-lg flex flex-col border-r border-gray-200">
        {/* Logo Section */}
        <div className="w-full h-[100px] flex justify-center items-center border-b border-gray-200 bg-primary">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[200px] h-[70px] object-contain"
          />
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-primary ">
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
                    <span className="text-sm font-medium">Loading members...</span>
                </div>
                )}

          {loaded === "Error" && (
            <p className="text-red-500 text-sm italic">Failed to load data.</p>
          )}
          {loaded === "Loaded" && members.length === 0 && (
            <p className="text-gray-500 text-sm italic">No members found.</p>
          )}

          {members.map((member, idx) => (
            <div
              key={idx}
              className="px-2 py-1 rounded-lg bg-secoundary hover:bg-accent cursor-pointer transition-colors duration-200"
            >
              <h6 className="text-sm font-semibold text-gray-800 hover:text-white truncate">
                {member.CUSTOMER_NAME}
              </h6>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
