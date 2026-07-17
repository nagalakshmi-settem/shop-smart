import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';
import { loginSuccess } from '../../redux/authSlice';


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[formData,setFormData] = useState({email:"",password:""})
const[error,setError] = useState(null);
const[loading,setLoading] = useState(false);
  const handleChange = (e) => {
setFormData({...formData,[e.target.name]:e.target.value})
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setLoading(true);
const res = await axiosInstance.post('/auth/login', formData);
dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
navigate('/');
} catch (err) {
setError(err.response?.data?.message || "Something went wrong");
setLoading(false)
    }
  };

  const handleGoogleSuccess = async(credentialResponse) =>{
try{
  const res = await axiosInstance.post("/auth/google",{
    token:credentialResponse.credential,
  })
  dispatch(loginSuccess({token:res.data.token,user:res.data.user}));
      navigate("/");

}catch(err){
console.log(err);
setError(err.response?.data?.message || "Google login failed");
}
  }

  const handleGoogleError = ()=>{
    console.log("Google Login Failed")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Shop<span className="text-yellow-400">Smart</span>
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Login to your account
        </p>

{error && (
  <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded mb-4">
    {error}
  </div>
)}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
value={formData.email}
onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
value ={formData.password}
onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0]"
            />
          </div>

          {/* Login Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#2874f0] hover:bg-[#1a5dc7] text-white py-2.5 rounded font-medium text-sm disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>


        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#2874f0] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}