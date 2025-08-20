import { Route, Routes } from "react-router-dom";
import CustomerPage from "../Customer/CustomerPage";
import AccountPage from "../Account/AccountPage";
import RightBar from "../../Components/RightBar";
import MobileSideBars from "../../test/MobileSideBars";
import SideBarMobile from "../../Components/SideBarMobile";
import AccountPageMobile from "../Account/AccountPageMobile";



export default function MobilePage() {
  return (
    
    <div className="flex flex-col h-screen overflow-hidden">
        <div className="w-full max-w-[767px] mx-auto max-h-[450px] p-2 overflow-auto">
          <SideBarMobile />
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