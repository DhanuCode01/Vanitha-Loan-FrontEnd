import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';

export default function LoginPage() {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = (e) => {

    e.preventDefault();
    const backEndURL = import.meta.env.VITE_BackEndURL;

    axios
      .post(backEndURL + '/api/user/user', {
        UserFullName: fullName,
        password: password,
      })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.setItem('token', res.data.token); //set token value in local storage
        localStorage.setItem('user', JSON.stringify(res.data.data));//set user data in local storage
        
        navigate("/main");


        //Hold this part (THAWAKALIKAWA)
        /* if (res.data.user.PermissionLevel === '1') {
          toast.success('Login Success 😎👌');
          navigate('/home');
        } else {
          navigate('/');
        } */





      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error || 'Please Try Again ❗');
      });
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/finance.jpg')" }}
    >
      <form onSubmit={handleOnSubmit} className="w-[380px]">
        <div className="bg-white/20 backdrop-blur-2xl rounded-2xl p-8 shadow-xl flex flex-col items-center  relative">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[80px] h-[80px] object-cover  mb-2"
          />
              <div>
              
                      <div className="mb-4 w-full">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        User Name
                      </label>
                      <div className="flex items-center border border-gray-700  bg-white/60 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500">
                        <FaRegUser className="mx-3 text-gray-600 text-lg" />
                        <input
                          type="text"
                          className="flex-1 h-9 px-2 bg-transparent text-black text-lg outline-none rounded-r-xl"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>


                    <div className="mb-4 w-full">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Password
                      </label>
                      <div className="flex items-center border border-gray-700   bg-white/60 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500">
                        <TbLockPassword className="mx-3 text-gray-600 text-lg" />
                        <input
                          type={showPassword ? "text":"password"}
                          className="flex-1 h-9 px-2 bg-transparent text-black text-lg outline-none rounded-r-xl"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-600 hover:text-gray-900 px-2"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

              </div>
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
