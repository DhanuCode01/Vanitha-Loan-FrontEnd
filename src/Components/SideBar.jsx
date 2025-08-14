import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomerCard from "./CustomerCard";
import { CiSearch } from "react-icons/ci";

export default function SideBar() {
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState("Loading");
  const [searchTerm, setSearchTerm] = useState("");

  const [groups, setGroups] = useState([]);
  const [groupLoaded, setGroupLoaded] = useState("Loading"); 
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    
    if (token) {
      axios
        .post(`${import.meta.env.VITE_BackEndURL}/api/customer/search/${user.UserID}`,
            {data:searchTerm}, 
            {headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMembers(res.data.SearchRows || []);
          setLoaded("Loaded");
        })
        .catch((err) => {
          console.error(err);
          setLoaded("Error");
        });
    } else {
      toast.error("Please login and try again...❗");
    }
  }, [searchTerm, token, user.UserID]);



  
  useEffect(()=>{

            if (token) {
            axios
              .get(`${import.meta.env.VITE_BackEndURL}/api/customer/group/${user.UserID}`,
                  {headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                console.log(res);
                setGroups(res.data.groupRows || []);
                setGroupLoaded("Loaded");
              })
              .catch((err) => {
                console.error(err);
                setGroupLoaded("Error");
              });
          } else {
            toast.error("Please login and try again...❗");
          }

  },[])

  const handleGroupChange =(e)=>{
        const key=e.target.value;
        console.log(key);

           if (token) {
            axios
              .get(`${import.meta.env.VITE_BackEndURL}/api/customer/member/${key}`,
                  {headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                console.log(res);
                setMembers(res.data.SearchRows || []);
                setLoaded("Loaded");
              })
              .catch((err) => {
                console.error(err);
                setLoaded("Error");
              });
          } else {
            toast.error("Please login and try again...❗");
          } 
  }
          


  return (
    <div className="h-full md:h-screen flex bg-primary">
      <aside className="w-full h-full bg-white shadow-lg flex flex-col border-r border-gray-200">
        {/* Logo Section */}
        <div className="w-full h-[100px] flex justify-center items-center border-b border-gray-200 bg-primary">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[200px] h-[70px] object-contain"
          />
        </div>
          <div className="flex items-center gap-2 px-4 py-1 border-b border-gray-200 bg-white">
            <CiSearch className="text-black text-xl" />
            <input
              type="text"
              placeholder="Search...."
              value={searchTerm}
              onChange={(e) =>{
                 setSearchTerm(e.target.value);
                 setLoaded("Loading");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          
          <select
            onChange={(e)=>{handleGroupChange(e);
              setLoaded("Loading");
            }}
            className="w-[280px] h-[35px] px-3 py-2 my-2 mx-1 border border-gray-300 rounded-md shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option className="max-w-[300px]" value="">Select Group</option>
            {groups.map((group) => (
              <option className="max-w-[300px]" key={group.GroupCode} value={group.GroupCode}>
                {group.GROUP_NAME}
              </option>
            ))}
          </select>






  

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-3 bg-primary">
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

          {loaded === "Loaded" && members.length !== 0 && (
            members.map((member, idx) => (
            <CustomerCard key={idx} idx={idx} member={member}/>
          ))
          )}

          
        </div>
      </aside>
    </div>
  );
}
