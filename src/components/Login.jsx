import { ChevronRight, Eye, EyeOff, Loader } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-dark">Webwatch</h1>
          <p className="text-gray-600 mt-2">Monitor Your Infrastructure</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-dark mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin}>
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

            <div className="mb-6">
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

            <div className="text-right mb-6">
              <a href="/forgot-password" className="text-sm font-semibold text-primary hover:text-secondary transition-colors">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={!email || !password || loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 mb-4 ${
                (email && password && !loading)
                  ? 'glow-btn glow-btn-primary'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold text-primary hover:text-secondary transition-colors">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
