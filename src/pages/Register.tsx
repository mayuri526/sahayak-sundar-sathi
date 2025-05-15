
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-care-blue">SahayakApp</h1>
        <p className="text-xl text-gray-600">Elder Care Companion</p>
      </div>
      <AuthForm type="register" />
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Already have an account? <Link to="/login" className="text-care-blue hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
