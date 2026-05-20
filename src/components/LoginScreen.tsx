/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  ShieldCheck, 
  IdCard, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  User as UserIcon, 
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Student');
  
  // Form states
  const [idNumber, setIdNumber] = useState('2021-CCMSC-0452');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Elena Rodriguez');
  const [email, setEmail] = useState('elena.rod@ctu.edu.ph');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [supportModal, setSupportModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     
     // Log in with correct names based on role chosen to make screens aligned:
     let resolvedName = fullName;
     let resolvedEmail = email;
     let resolvedId = idNumber || '2024-00123';

     if (authMode === 'login') {
       if (selectedRole === 'Student') {
         resolvedName = 'Elena Rodriguez';
         resolvedEmail = 'elena.rod@ctu.edu.ph';
         resolvedId = idNumber || '2021-CCMSC-0452';
       } else if (selectedRole === 'Admin') {
         resolvedName = 'Dr. Josephus Bacalso';
         resolvedEmail = 'admin.carmen@ctu.edu.ph';
         resolvedId = idNumber || 'ADM-2024-01';
       } else if (selectedRole === 'Coordinator') {
         resolvedName = 'Engr. Marco Rossi';
         resolvedEmail = 'marco.rossi@ctu.edu.ph';
         resolvedId = idNumber || 'CO-2024-88';
       } else {
         resolvedName = 'Juan Dela Cruz';
         resolvedEmail = 'juan.alumni@gmail.com';
         resolvedId = idNumber || '2019-ALUM-99';
       }
     }

     onLoginSuccess({
       idNumber: resolvedId,
       role: selectedRole,
       fullName: resolvedName,
       email: resolvedEmail
     });
  };

  return (
    <div id="login-container" className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden select-none bg-[#f7f9fb] w-full">
      {/* Subtle Ambient Glow Circles */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#002068]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#ffe16d]/10 blur-[120px] pointer-events-none" />

      {/* Main Authenticator Interface Layout */}
      <main className="w-full max-w-lg z-10 my-4">
        {/* Branding & Logo Details */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-5 relative">
            <img 
              alt="Cebu Technological University Seal" 
              className="w-full h-full object-contain drop-shadow-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdVGqqMYkKzF2qUIMt4Jg0N08D1BSicmRAPRAqmWFNv0_Q5dFU_JySnrPdkluCFQHtECP_6amTEsCn_caYH4xFQh_cNtwKGIdEGLvmDk2gYSawHYq2MvC35RxxtqAHRlAuS6xHyJwu97U6-CKpu_HHUVbBhjt4cFenIVEQDjKQlBXsuZYkdPaV8CKe-Fu7-IRHgfpcQ-LItyO2iolJTRPN_tQyWxHcLVdnv0K5-vYejAA0eOOpArnAy2P5OlZWcQKKIQ133e9z8NCy"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-2xl md:text-3.5xl font-bold tracking-tight text-[#002068] text-center font-sans">
            Welcome to CCMSC Tracer
          </h1>
          <p className="text-sm md:text-base text-[#444653] font-medium mt-1.5 text-center">
            Cebu Technological University - Carmen Campus
          </p>
        </div>

        {/* Center Card Container */}
        <div id="auth-card" className="bg-white/90 backdrop-blur-xl shadow-xl rounded-[2rem] border border-white/60 p-6 md:p-8">
          {/* LOGIN/REGISTER Segmented Toggle Pill */}
          <div className="flex p-1 bg-[#eceef0] rounded-full mb-6">
            <button 
              id="login-tab"
              type="button"
              className={`flex-1 py-2.5 rounded-full font-semibold text-xs transition-all ${
                authMode === 'login' 
                  ? 'bg-[#002068] text-white shadow-md' 
                  : 'text-[#444653] hover:bg-white/50'
              }`}
              onClick={() => {
                setAuthMode('login');
                if (idNumber === '') setIdNumber('2021-CCMSC-0452');
              }}
            >
              LOGIN
            </button>
            <button 
              id="register-tab"
              type="button"
              className={`flex-1 py-2.5 rounded-full font-semibold text-xs transition-all ${
                authMode === 'register' 
                  ? 'bg-[#002068] text-white shadow-md' 
                  : 'text-[#444653] hover:bg-white/50'
              }`}
              onClick={() => {
                setAuthMode('register');
                if (idNumber === '2021-CCMSC-0452') setIdNumber('');
              }}
            >
              REGISTER
            </button>
          </div>

          {/* ROLE SELECTOR GRID */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-[#444653] mb-3 uppercase tracking-wider">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { r: 'Student' as UserRole, desc: 'Student', icon: GraduationCap },
                { r: 'Alumni' as UserRole, desc: 'Alumni', icon: Award },
                { r: 'Coordinator' as UserRole, desc: 'Coordinator', icon: Users },
                { r: 'Admin' as UserRole, desc: 'Admin', icon: ShieldCheck }
              ].map(({ r, desc, icon: IconComponent }) => {
                const isActive = selectedRole === r;
                return (
                  <button
                    key={r}
                    id={`role-${r}`}
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-150 active:scale-95 group ${
                      isActive 
                        ? 'border-[#705d00] bg-[#ffe16d]/15 shadow-sm' 
                        : 'border-[#eceef0] hover:border-[#ffe16d]/40 hover:bg-[#ffe16d]/5'
                    }`}
                    onClick={() => setSelectedRole(r)}
                  >
                    <IconComponent className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#705d00]' : 'text-[#002068]'
                    }`} />
                    <span className={`text-[11px] font-semibold ${
                      isActive ? 'text-[#705d00]' : 'text-[#002068]'
                    }`}>
                      {desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC FORM COMPONENT */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {authMode === 'register' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="block text-xs font-bold text-[#444653] ml-1" htmlFor="full-name">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] w-5 h-5" />
                  <input 
                    required
                    id="full-name"
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Elena Rodriguez"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068] focus:ring-2 focus:ring-[#002068]/10 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#444653] ml-1" htmlFor="id-number">
                ID Number
              </label>
              <div className="relative">
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] w-5 h-5" />
                <input 
                  required
                  id="id-number"
                  type="text" 
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="e.g. 2024-00123"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068] focus:ring-2 focus:ring-[#002068]/10 transition-all text-sm font-medium placeholder-[#747684]/80"
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#444653] ml-1" htmlFor="email-register">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] w-5 h-5" />
                  <input 
                    required
                    id="email-register"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.rod@ctu.edu.ph"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068] focus:ring-2 focus:ring-[#002068]/10 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold text-[#444653]" htmlFor="password">
                  Password
                </label>
                <button 
                  type="button"
                  className="text-xs text-[#002068] font-semibold hover:underline bg-transparent"
                  onClick={() => alert(`Reset instructions sent to the administrator. If trouble persists, contact support.`)}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] w-5 h-5" />
                <input 
                  required
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068] focus:ring-2 focus:ring-[#002068]/10 transition-all text-sm font-medium"
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#747684] hover:text-[#002068] h-fit p-1 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 px-1 py-1">
              <input 
                id="remember" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#c4c5d5] text-[#002068] focus:ring-[#002068]"
              />
              <label htmlFor="remember" className="text-xs font-semibold text-[#444653] select-none cursor-pointer">
                Remember this device
              </label>
            </div>

            <button 
              id="submit-btn"
              type="submit" 
              className="w-full py-3.5 bg-[#002068] hover:bg-[#00174e] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-[#002068]/20 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {authMode === 'login' ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <UserPlus className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* FOOTER TROUBLESHOOT LINKS */}
          <div className="mt-6 pt-6 border-t border-[#eceef0] text-center">
            <p className="text-xs text-[#444653] leading-relaxed">
              Having trouble accessing your account? <br />
              <button 
                onClick={() => setSupportModal(true)}
                className="text-[#002068] font-bold hover:underline cursor-pointer bg-transparent mt-1"
              >
                Contact Campus Administrator
              </button>
            </p>
          </div>
        </div>

        {/* SYSTEM VERSION DISPLAY */}
        <div className="mt-6 text-center">
          <p className="text-[10px] font-bold text-[#747684] uppercase tracking-[0.2em] whitespace-nowrap">
            CTU-CCMSC OJT TRACER • V1.0.2
          </p>
        </div>
      </main>

      {/* SUPPORT MODAL DIALOG */}
      {supportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] p-6 max-w-sm w-full border border-[#eceef0] shadow-2xl animate-scaleIn">
            <h3 className="text-[#002068] font-bold text-lg mb-2">Campus Administration</h3>
            <p className="text-xs text-[#444653] mb-4 leading-relaxed">
              If you misplaced your academic ID or can't recover your tracer student account, reach our designated management helpdesk:
            </p>
            <div className="space-y-2 mb-6 text-xs text-[#191c1e] text-left">
              <div className="p-3 bg-[#f7f9fb] rounded-xl flex flex-col gap-1">
                <span className="font-bold text-[#002068]">CCMSC OJT Head Office:</span>
                <span>Dr. J. Bacalso (Director)</span>
                <span className="text-[#747684]">ccmsc.tracer@ctu.edu.ph</span>
              </div>
              <div className="p-3 bg-[#f7f9fb] rounded-xl flex flex-col gap-1">
                <span className="font-bold text-[#002068]">CTU Carmen Help Hotline:</span>
                <span>+63 32 434 8820 (Local 104)</span>
              </div>
            </div>
            <button 
              onClick={() => setSupportModal(false)}
              className="w-full py-2.5 bg-[#002068] text-white rounded-xl text-xs font-bold hover:bg-[#00174e] transition-colors"
            >
              Ok, got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
