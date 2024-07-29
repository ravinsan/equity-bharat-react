import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../Config';
import { toast } from 'react-toastify';
import { setProfile, setToken } from '../redux/profileReducer';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({email:"", password:""});
  const { email, password } = formData;
  const [errors, setErrors] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password Length must be 6 or more than 6";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleSubmit = async ()=>{
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setLoading(true); 
          try{
            const response = await axios.post(`${API_URL}signin`, formData);
            // console.log(response.data.token);
            if(response.status == 200)
            {
              dispatch(setToken(response.data.token));
              dispatch(setProfile(response.data.user));
              toast.success(response.data.message);
              navigate("/dashboard");
            }
          }
          catch(error)
          {
            toast.error(error.message);
          }finally {
            setLoading(false); 
          }
    }else{
      setErrors(errors);
    }
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" name="email" value={email} onChange={(e)=>handleChange(e)} placeholder="Email..." className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "is-invalid" : ""}`} />
            <span className='text-red-700'>{errors.email}</span>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>handleChange(e)} placeholder="Password..." className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "is-invalid" : ""}`} />
            <span className='text-red-700'>{errors.password}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="button" onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
