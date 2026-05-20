/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  HelpCircle, 
  BookOpen, 
  Moon, 
  Sun, 
  Download, 
  MessageSquare,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function MoreScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'Handbook' | 'Guidelines'>('Handbook');

  // Sync mode with the document element to enable high fidelity theme change
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [darkMode]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSent(true);
    setSupportMessage('');
    setTimeout(() => {
      setSupportSent(false);
    }, 4000);
  };

  return (
    <div id="more-screen" className="pb-16 w-full animate-fadeIn select-none">
      
      {/* 1. COMPACT APP THEMING AND SETTINGS PANEL */}
      <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <h3 className="text-[#002068] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>App Preferences</span>
        </h3>

        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-xs font-bold text-[#191c1d]">Dark Mode Theme</p>
            <p className="text-[11px] text-[#737780] font-semibold mt-0.5">Adjust eye comfort for midnight browsing</p>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
              darkMode ? 'bg-[#fed65b] justify-end' : 'bg-[#eceef0] justify-start'
            }`}
          >
            <span className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${
              darkMode ? 'bg-white' : 'bg-white'
            }`}>
              {darkMode ? <Moon className="w-3.5 h-3.5 text-slate-800" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            </span>
          </button>
        </div>
      </section>

      {/* 2. UNIVERSITY REGISTRATION DOCUMENTS (OJT HANDBOOK) */}
      <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <h3 className="text-[#002068] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>OJT Guidelines & Resources</span>
        </h3>

        {/* Tab switches */}
        <div className="flex p-1 bg-[#f2f4f6] rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('Handbook')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              activeTab === 'Handbook' ? 'bg-[#002068] text-white shadow-sm' : 'text-[#737780] hover:bg-slate-50'
            }`}
          >
            CTU OJT Handbook
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Guidelines')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              activeTab === 'Guidelines' ? 'bg-[#002068] text-white shadow-sm' : 'text-[#737780] hover:bg-slate-50'
            }`}
          >
            Performance Evaluation
          </button>
        </div>

        {activeTab === 'Handbook' ? (
          <div className="space-y-3.5">
            <p className="text-xs text-[#43474f] leading-relaxed font-semibold">
              Review current policies, academic deliverables, and weekly log guidelines prescribed by CTU Carmen:
            </p>
            <div className="space-y-2 text-left">
              {[
                { name: 'CTU OJT Handbook 2026 Edition.pdf', bytes: '4.2 MB' },
                { name: 'Student Logbook Weekly Summary Template.docx', bytes: '124 KB' },
                { name: 'OJT Partner List 2026.xlsx', bytes: '890 KB' }
              ].map((doc, idx) => (
                <div 
                  key={idx}
                  onClick={() => alert(`Downloading document: ${doc.name}`)}
                  className="p-3 bg-[#f7f9fb] hover:bg-[#eceef0] rounded-xl border border-[#eceef0] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-[#191c1d] truncate">{doc.name}</p>
                    <span className="text-[10px] text-[#737780] font-bold block mt-0.5">{doc.bytes}</span>
                  </div>
                  <Download className="w-4 h-4 text-[#002068] flex-none" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            <p className="text-xs text-[#43474f] leading-relaxed font-semibold">
              Requirements for passing grading elements. Performance evaluation is calculated via:
            </p>
            <div className="p-4 bg-[#f7f9fb] rounded-xl text-xs text-[#191c1e] space-y-2">
              <div className="flex justify-between font-bold text-[#002068] border-b border-[#f2f4f6] pb-1">
                <span>Evaluation Criteria</span>
                <span>Grading Weight</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Employer Evaluation</span>
                <span>40%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>OJT Logbook Submission</span>
                <span>30%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Final Output Report</span>
                <span>20%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Coordinator Interview</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. INTERACTIVE HELPDESK FORM FOR STUDENT SUPPORT */}
      <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <h3 className="text-[#002068] font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>Help Center Form</span>
        </h3>

        {supportSent ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-xl space-y-2 text-center animate-scaleIn border border-green-100">
            <CheckCircle2 className="w-8 h-8 mx-auto text-green-600 mb-1" />
            <p className="text-xs font-bold">Inquiry Transmitted Successfully!</p>
            <p className="text-[10px] text-[#737780] font-semibold leading-relaxed">
              Dr. Bacalso and the campus OJT coordinators will review your ticket and reply with directions in 1-2 school days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSupportSubmit} className="space-y-3">
            <p className="text-xs text-[#43474f] leading-relaxed font-medium">
              Submit your concerns or request system assistance from OJT representatives.
            </p>
            <div>
              <textarea
                required
                rows={3}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="State your technical or reporting issue here..."
                className="w-full text-xs p-3.5 bg-[#f7f9fb] border border-[#c4c5d5] rounded-xl focus:outline-none focus:border-[#002068] focus:ring-1 focus:ring-[#002068]/10"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:bg-[#00174e]"
            >
              <span>Transmit Ticket Concern</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </section>

      {/* 4. INSTITUTION CONTACT DETAILS */}
      <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6 text-center">
        <Building className="w-8 h-8 text-[#002068] mx-auto mb-2" />
        <h4 className="text-xs font-bold text-[#002068] uppercase tracking-wider">CTU Carmen Campus</h4>
        <p className="text-[11px] text-[#43474f] font-semibold leading-relaxed max-w-xs mx-auto mt-2">
          San Agustin, Carmen, Cebu, 6005, Philippines
        </p>
        <div className="flex justify-center gap-4 mt-3 text-xs font-bold text-[#002068]">
          <a href="tel:+63324348820" className="flex items-center gap-1 hover:underline">
            <Phone className="w-3.5 h-3.5" />
            <span>Call Campus</span>
          </a>
          <a href="mailto:carmen@ctu.edu.ph" className="flex items-center gap-1 hover:underline">
            <Mail className="w-3.5 h-3.5" />
            <span>Email Office</span>
          </a>
        </div>
      </section>

    </div>
  );
}
