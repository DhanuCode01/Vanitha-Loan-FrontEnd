import { Route, Routes } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import CustomerPage from "../Customer/CustomerPage";
import AccountPage from "../Account/AccountPage";
import { TestThree } from "../../test/TestThree";

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/account/:key" element={<AccountPage/>} />
          <Route path="/add" element={<TestThree/>} />

        </Routes>
      </div>
    </div>
  );
}
