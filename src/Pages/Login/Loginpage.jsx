import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const backEndURL = import.meta.env.VITE_BackEndURL;

    axios
      .post(backEndURL + '/api/user/user', {
        UserFullName: fullName,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        if (res.data.user.PermissionLevel === '1') {
          toast.success('Login Success 😎👌');
          navigate('/home');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error || 'Please Try Again ❗');
      });
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/finance.jpg')" }}
    >
      <form onSubmit={handleOnSubmit} className="w-[380px]">
        <div className="bg-white/20 backdrop-blur-2xl rounded-2xl p-8 shadow-xl flex flex-col items-center  relative">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[80px] h-[80px] object-cover rounded-xl mb-2"
          />

          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full mb-4 px-4 py-3 bg-transparent border-b-2 border-gray-700 text-black text-lg outline-none placeholder-gray-700"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 bg-transparent border-b-2 border-gray-700 text-black text-lg outline-none placeholder-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-m text-black mt-4">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:underline hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
