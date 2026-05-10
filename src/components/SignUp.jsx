import { ChevronRight, Eye, EyeOff, Check, X, Loader } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../services/api';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
    { label: 'Contains special character', met: /[!@#$%^&*().]/.test(password) },
  ];

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!allRequirementsMet || !passwordsMatch || !name || !email) {
      toast.error('Please fill all fields correctly');
      return;
    }

    setLoading(true);
    try {
      const response = await signup(name, email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success('Account created successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-black text-dark">Webwatch</h1>
          <p className="text-gray-600 mt-2">Create Your Account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-dark mb-6">Get Started</h2>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-dark mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-dark mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-dark mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {password && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-semibold text-dark mb-2">Password Requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-3 h-3 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-gray-600'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold text-dark mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              {confirmPassword && (
                <p className={`mt-1 text-xs font-semibold ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!allRequirementsMet || !passwordsMatch || !name || !email || loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 mb-3 ${
                (allRequirementsMet && passwordsMatch && name && email && !loading)
                  ? 'glow-btn glow-btn-primary'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-3">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-primary hover:text-secondary transition-colors">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
