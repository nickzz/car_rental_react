import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';   // ✅ import Link

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const { token, role } = response.data;

      // Save token and role
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userRole', role);
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('email', { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register('password', { required: true })}
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link to="forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Register Link */}
        <div className="mt-2 text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link to="register" className="text-sm text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
