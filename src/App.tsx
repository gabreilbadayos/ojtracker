/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Briefcase, 
  User as UserIcon, 
  Menu, 
  Bell,
  CheckCircle,
  X
} from 'lucide-react';

import { User } from './types';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import InternshipScreen from './components/InternshipScreen';
import DirectoryScreen from './components/DirectoryScreen';
import ProfileScreen from './components/ProfileScreen';
import MoreScreen from './components/MoreScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);

  // Default login action
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    
    // Redirect coordinator/admin straight to Dashboard, student straight to OJT Internship monitor
    if (loggedInUser.role === 'Admin' || loggedInUser.role === 'Coordinator') {
      setActiveTab('Dashboard');
    } else {
      setActiveTab('Internship');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If no user is authenticated, render the single login form screen (Image 1)
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Determine dynamic headers depending on view (Matches Screenshots 2 & 3)
  const isInternshipView = activeTab === 'Internship';
  const headerTitle = isInternshipView ? 'OJT Monitoring' : 'CTU CCMSC Tracer';

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col w-full text-[#191c1e] antialiased select-none dark:bg-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      
      {/* 1. TOP INSTALMENT BAR WITH LOGO AND REACTION TRIGGERS */}
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm h-16 flex justify-between items-center px-4 border-b border-[#eceef0]/60 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#003399] flex items-center justify-center overflow-hidden border border-[#ffe16d]/50 shadow-sm flex-none">
            <img 
              alt="University seal emblem logo" 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYRWseK2vn3FU80VPExMnNFYXwPKWMGVqVON2REScMVEFkDhHINK_tz6MlkIRw--Ml04tUdFYIGtf-7MmPE658vEZRZN-3xZF-nVuytY9Gouivf7PBcwYfjWEFLP3ZPGppC5EeId6Xv9QzOn-zPLa8zQ7jgjd2o0wt2K8csQKcEgPuvZDbrx8KL9r47vOfEClSmEh8TARUSZzuXmEOQan0yXdZMvZe1nExgVL_0b4GEx0pb3r1x4dXFT7IWIQQbrwo9e83HlA3aEJA"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-[#002068] dark:text-white font-black text-sm md:text-base tracking-tight select-none">
              {headerTitle}
            </h1>
            <p className="text-[9px] text-[#737780] font-bold uppercase tracking-wider -mt-0.5 leading-none">
              Carmen Campus
            </p>
          </div>
        </div>

        {/* Global notification bell toggle */}
        <button 
          onClick={() => setShowNotificationOverlay(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#002068]/5 dark:hover:bg-white/5 transition-all text-[#002068] dark:text-[#799dd6] relative active:scale-90"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-white dark:border-slate-900" />
        </button>
      </header>

      {/* 2. CORE VIEWPORT CONTENT AND ROUTING */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 mb-6">
        
        {activeTab === 'Dashboard' && (
          <DashboardScreen onNavToTab={setActiveTab} />
        )}

        {activeTab === 'Internship' && (
          <InternshipScreen />
        )}

        {activeTab === 'Directory' && (
          <DirectoryScreen />
        )}

        {activeTab === 'Profile' && (
          <ProfileScreen user={user} onLogout={handleLogout} />
        )}

        {activeTab === 'More' && (
          <MoreScreen />
        )}

      </main>

      {/* 3. CORE SEGMENTED BOTTOM STICKY BAR MENU (Screenshots 2 & 3 navigation properties) */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-900 border-t border-[#eceef0] dark:border-slate-800 shadow-[0px_-4px_20px_rgba(0,51,153,0.03)] h-16 z-40 flex justify-around items-center px-2 pb-safe">
        {[
          { tabId: 'Dashboard', icon: LayoutDashboard, desc: 'Dashboard' },
          { tabId: 'Internship', icon: TrendingUp, desc: 'Internship' },
          { tabId: 'Directory', icon: Briefcase, desc: 'Directory' },
          { tabId: 'Profile', icon: UserIcon, desc: 'Profile' },
          { tabId: 'More', icon: Menu, desc: 'More' }
        ].map(({ tabId, icon: IconComponent, desc }) => {
          const isActive = activeTab === tabId;
          return (
            <button
              key={tabId}
              type="button"
              className={`flex flex-col items-center justify-center py-1.5 transition-all duration-200 active:scale-90 relative ${
                isActive 
                  ? 'bg-[#003366]/10 text-[#002068] dark:text-[#799dd6] rounded-xl px-4 font-bold shadow-sm' 
                  : 'text-[#43474f] dark:text-slate-400 hover:text-[#002068] dark:hover:text-[#799dd6]'
              }`}
              onClick={() => setActiveTab(tabId)}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[10px] mt-1 tracking-tight select-none leading-none">
                {desc}
              </span>
            </button>
          );
        })}
      </nav>

      {/* GLOBAL NOTIFICATION DRAWER / OVERLAY */}
      {showNotificationOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-[2.2rem] border border-[#eceef0] dark:border-slate-800 p-6 w-full max-w-sm shadow-2xl animate-scaleIn relative text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#002068] dark:text-white text-base">Campus Broadcasts</h3>
              <button 
                onClick={() => setShowNotificationOverlay(false)} 
                className="text-xs text-[#747780] hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {[
                { title: 'Logbook Verified', desc: 'Engr. Rossi approved your Week 11 progress book submission!', time: '1m ago', isSystem: false },
                { title: 'Holiday Announcement', desc: 'No OJT logging is required on upcoming campus technical observation days.', time: '2h ago', isSystem: true },
                { title: 'New Partner Partnership', desc: 'Accenture Philippines has introduced 15 additional internship vacancies!', time: '1d ago', isSystem: false }
              ].map((item, id) => (
                <div key={id} className="p-3.5 rounded-xl border border-[#eceef0] dark:border-slate-800 bg-[#f7f9fb] dark:bg-slate-800/50 text-xs">
                  <div className="flex justify-between items-start gap-1">
                    <p className="font-bold text-[#191c1d] dark:text-white">{item.title}</p>
                    <span className="text-[9px] text-[#737780] font-bold whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-[#43474f] dark:text-slate-400 mt-1 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowNotificationOverlay(false)}
              className="w-full mt-4 py-3 bg-[#002068] text-white font-bold rounded-xl text-xs hover:bg-[#00174e]"
            >
              Clear & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
