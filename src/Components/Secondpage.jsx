import React from 'react';

function SignUpPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white">
      <h1 className="text-4xl font-extrabold mt-12 tracking-wide">Sign Up</h1>

      <button className="flex items-center justify-center bg-white text-purple-700 font-medium rounded-full px-6 py-3 mt-8 shadow-lg hover:bg-gray-100 transition duration-300">
        <img src="google-logo.svg" alt="Google logo" className="inline-block mr-3 h-6 w-6" />
        Sign up with Google
      </button>

      <p className="text-gray-300 mt-6">Or continue with your email</p>

      <form className="w-full max-w-sm mt-8 bg-white rounded-lg p-8 shadow-lg">
        <input 
          type="text" 
          placeholder="Enter your name" 
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input 
          type="text" 
          placeholder="Enter username" 
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input 
          type="email" 
          placeholder="Enter email" 
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input 
          type="password" 
          placeholder="Enter password" 
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2 focus:ring-2 focus:ring-purple-500" />
          <label className="text-gray-600">I agree with the Terms of Service and Privacy Policy</label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-full px-6 py-3 transition duration-300">
          Create Account
        </button>
      </form>

      <p className="text-gray-300 mt-6">Already have an account? <a href="#" className="text-purple-200 underline hover:text-white transition duration-300">Log in</a></p>
    </div>
  );
}

export default SignUpPage;
