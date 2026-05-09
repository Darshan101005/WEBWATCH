import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-dark">Webwatch</h1>
          <p className="text-gray-600 mt-2">Reset Your Password</p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-dark mb-2">Forgot Password?</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Reset Button */}
          <button
            disabled={!email}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 mb-4 ${
              email
                ? 'glow-btn glow-btn-primary'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Send Reset Link
            <ChevronRight size={20} />
          </button>

          {/* Back to Login */}
          <a href="/login" className="flex items-center justify-center gap-2 text-primary hover:text-secondary transition-colors font-semibold">
            <ArrowLeft size={18} />
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
