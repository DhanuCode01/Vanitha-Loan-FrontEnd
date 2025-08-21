import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import CustomerPage from "../Customer/CustomerPage";
import AccountPage from "../Account/AccountPage";
import RightBar from "../../Components/RightBar";


  
export default function HomePage() {

  const [refreshRightBar, setRefreshRightBar] = useState(false);

    // function to trigger refresh
  const triggerRightBarRefresh = () => {
    setRefreshRightBar((prev) => !prev); // toggle value
  };


  return (
    <div className="flex flex-col md:flex-row  h-screen overflow-hidden">
      <div className="md:w-[300px] w-full">
        <SideBar />
      </div>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/account/:key" element={<AccountPage onEntryAdded={triggerRightBarRefresh}/>} />
        </Routes>
      </div>
      <div className="md:w-[300px] w-full md:block hidden">
        <RightBar refresh={refreshRightBar}/>
      </div>
    </div>
  );
}
