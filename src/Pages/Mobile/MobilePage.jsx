import { Route, Routes } from "react-router-dom";
import CustomerPage from "../Customer/CustomerPage";
import AccountPage from "../Account/AccountPage";
import RightBar from "../../Components/RightBar";
import MobileSideBars from "../../Components/MobileSideBars";
import SideBarMobile from "../../test/TestSix";
import AccountPageMobile from "../Account/AccountPageMobile";



export default function MobilePage() {
  return (
    
    <div className="flex flex-col h-screen overflow-hidden">
        <div className="w-full max-w-[767px] mx-auto h-[450px] p-2  ">
        <SideBarMobile/>
        </div>
        <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<CustomerPage/>} />
          <Route path="/account/:key" element={<AccountPageMobile/>} />
        </Routes>
      </div>
    </div>
  );
}



{/* <div className="flex flex-col   h-screen overflow-hidden">
       <div className="md:w-[100px] w-full">
        <MobileSideBars />
      </div>
       <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<CustomerPage/>} />
          <Route path="/account/:key" element={<AccountPage/>} />
        </Routes>
      </div>
    </div> */}