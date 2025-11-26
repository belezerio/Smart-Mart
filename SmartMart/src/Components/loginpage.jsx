import { useState } from 'react';
import { Mail, Lock, User, Store, ShoppingBag, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('signin');
  const [step, setStep] = useState('role');
  const [role, setRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep('form');
  };

  const handleBack = () => {
    setStep('role');
    setRole(null);
  };

  const handleSubmit = () => {
    console.log({ mode, role, ...formData });
    // Here you would typically send data to your backend
  };

  const isFormValid = mode === 'signin'
    ? formData.email && formData.password
    : formData.email && formData.password && formData.confirmPassword && formData.fullName && formData.password === formData.confirmPassword;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="fixed top-8 left-8 z-50">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 12px rgba(147, 112, 219, 0.6)); }
            50% { filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.9)); }
          }
          .logo-container {
            animation: float 3s ease-in-out infinite, glow 3s ease-in-out infinite;
          }
        `}</style>
        <div className="logo-container flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-xl tracking-tight">Smart</span>
            <span className="font-bold text-purple-300 text-xl tracking-tight -mt-1">Mart</span>
          </div>
        </div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Toggle */}
        <div className="flex gap-2 mb-8 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
          <button
            onClick={() => { setMode('signin'); setStep('role'); setRole(null); }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setStep('role'); setRole(null); }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Selection */}
        {step === 'role' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-4xl font-bold text-white mb-3">
              {mode === 'signin' ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              {mode === 'signin' ? 'Sign in to your account' : 'Create your account as a seller or buyer'}
            </p>

            {mode === 'signup' && (
              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect('seller')}
                  className="w-full group relative overflow-hidden bg-white/10 border border-white/30 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 bg-purple-500/30 rounded-lg group-hover:bg-purple-500/40 transition-colors">
                      <Store className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold mb-1">I'm a Seller</h3>
                      <p className="text-white/60 text-sm">Sell your products and grow your business</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-purple-300 ml-auto transition-colors" />
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('buyer')}
                  className="w-full group relative overflow-hidden bg-white/10 border border-white/30 hover:border-pink-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 bg-pink-500/30 rounded-lg group-hover:bg-pink-500/40 transition-colors">
                      <ShoppingBag className="w-6 h-6 text-pink-300" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold mb-1">I'm a Buyer</h3>
                      <p className="text-white/60 text-sm">Browse and purchase quality products</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-pink-300 ml-auto transition-colors" />
                  </div>
                </button>
              </div>
            )}

            {mode === 'signin' && (
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-12 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        {step === 'form' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              onClick={handleBack}
              className="mb-6 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold text-white mb-2">
              Create your account
            </h2>
            <p className="text-slate-400 mb-8">
              Signing up as a <span className="font-semibold text-blue-400">{role}</span>
            </p>

            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-12 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300"
                />
              </div>

              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-sm">Passwords do not match</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}