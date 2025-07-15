import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserID: "",
    UserFullName: "",
    UserName: "",
    UserPassword: "",
    MobilePassword: "",
    bank_code: "01",
    UserRole: "1-Administrator",
    PermissionLevel: "1",
    UserStatus: "A",
    LogStatus: "N",
    LoginFrom: "0.0.0.0",
    UserType: "M",
    FieldOfficerTargetAmount: 50000.0,
    MaxWithdrawalAmount: 25000.0,
    tellerReceivedCash: 0.0,
    tellerIssuedCash: 0.0,
    last_ReceiptNo: "RC0000000000004",
    last_VoucherNo: "VC0000000000004",
    last_JournalNo: "JN0000000000004",
    last_ReverseEntryNo: "U00000000004",
    Legacy: "No",
    PasswordExpire: "True",
    PasswordUpdatedDate: new Date().toISOString().split("T")[0],
    web_password: "",
    web_portal_status: "inactive",
    fo_cashbook_id: "CBK404",
    mobile_no: "",
    mobile_otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const backEndURL = import.meta.env.VITE_BackEndURL;

    axios
      .post(`${backEndURL}/api/user/user`, formData)
      .then((res) => {
        toast.success("Registered successfully ✅");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed ❌");
      });
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/finance.jpg')" }}
    >
      <form
        onSubmit={handleRegister}
        className="w-[420px] bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>

        <input
          type="text"
          name="UserFullName"
          placeholder="Full Name"
          value={formData.UserFullName}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="UserName"
          placeholder="Username"
          value={formData.UserName}
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="UserPassword"
          placeholder="Password"
          value={formData.UserPassword}
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="MobilePassword"
          placeholder="Mobile Password"
          value={formData.MobilePassword}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="mobile_no"
          placeholder="Mobile Number"
          value={formData.mobile_no}
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="web_password"
          placeholder="Web Portal Password"
          value={formData.web_password}
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
