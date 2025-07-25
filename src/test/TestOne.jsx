import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

export default function TestOne() {
    const [members, setMembers] = useState([]);
    const [loaded, SetLoaded] = useState("loading");

    const [searchTerm,setSearchTerm]=useState("");

    // const params = useParams();
    // const key = params.key;
    const key=localStorage.getItem("key");
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        if (token && key) {
                    axios.get(`${import.meta.env.VITE_BackEndURL}/api/customer/${key}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                        .then((res) => {
                            setMembers(res.data.groupRows);
                            SetLoaded("Loaded");
                        })
                        .catch((error) => {
                            toast.error(error?.response?.data?.Message || "An Error Occured❗");
                            SetLoaded("Error");
                        });

                    } else {
                    toast.error("Please login and try again...❗");
                    }
    }, []);


    const filteredMembers = members.filter((member) =>                                //filter search member in members array
            member.CustomerID?.toLowerCase().includes(searchTerm.toLowerCase()) ||              //check CustomerID
            member.CUSTOMER_NAME?.toLowerCase().includes(searchTerm.toLowerCase())||            //check customer Name
            member.NIC?.toLowerCase().includes(searchTerm.toLowerCase())                        //check customer NIC
);


    return (
        <div className="p-4">
            {loaded === "loading" && <p>Loading...</p>}
            {loaded === "Error" && <p className="text-red-500">Error loading data.</p>}
            {loaded === "Loaded" && (
                <div className="overflow-x-auto">
                    <div className="flex justify-end mb-4">
                                                            <input
                                                              type="text"
                                                              placeholder="Search..."
                                                              value={searchTerm}
                                                              onChange={(e) => setSearchTerm(e.target.value)}
                                                              className="w-64 p-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                    </div>
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Customer ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Address</th>
                                <th className="border px-4 py-2">NIC</th>
                                <th className="border px-4 py-2">Mobile No</th>
                                <th className="border px-4 py-2">Telephone No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-50" onDoubleClick={() => console.log("HI", member.CustomerID)}>
                                    <td className="border px-4 py-2">{member.CustomerID}</td>
                                    <td className="border px-4 py-2">{member.CUSTOMER_NAME}</td>
                                    <td className="border px-4 py-2">{member.CUSTOMER_ADDRESS}</td>
                                    <td className="border px-4 py-2">{member.NIC}</td>
                                    <td className="border px-4 py-2">{member.PersonnalMobileNo}</td>
                                    <td className="border px-4 py-2">{member.PersonnalTelephoneNo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}


