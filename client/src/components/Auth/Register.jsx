import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function Register() {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  const [error,setError] = useState(null);
const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try{
setLoading(true);
    const user = await axiosInstance.post("/auth/register", formData);
    navigate('/login')
}catch(err){
setError(err.response?.data?.message);
setLoading(false);
}
   
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Shop<span className="text-yellow-400">Smart</span>
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Create your account
        </p>

{error&&( <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded mb-4">
    {error}
  </div>)}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value = {formData.name}
              onChange={(e)=>{
                handleChange(e)
              }}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value = {formData.email}
              onChange={(e)=>{
                handleChange(e)
              }}              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value = {formData.password}
              onChange={(e)=>{
                handleChange(e)
              }}              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2874f0] hover:bg-[#1a5dc7] text-white py-2.5 rounded font-medium text-sm disabled:opacity-50"
          >
{loading ? 'Creating account...' : 'Register'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#2874f0] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}