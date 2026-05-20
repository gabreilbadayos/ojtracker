/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ClipboardList, 
  Eye, 
  Download,
  Upload,
  Building2,
  Trash2,
  Plus
} from 'lucide-react';

interface DashboardScreenProps {
  onNavToTab: (tab: string) => void;
}

export default function DashboardScreen({ onNavToTab }: DashboardScreenProps) {
  // Interactive student review data state to simulate real "Take Action" workflows
  const [pendingStudents, setPendingStudents] = useState([
    { id: '1', name: 'Maria Santos', department: 'CS Department', log: 'Week 11 Progress Logbook', hours: '40 hrs', file: 'log_w11_santos.pdf' },
    { id: '2', name: 'John Doe', department: 'CS Department', log: 'TechVanguard Weekly Review', hours: '40 hrs', file: 'feedback_doe.pdf' },
    { id: '3', name: 'Althea Vergara', department: 'IT Department', log: 'Accenture Internship Logbook', hours: '35 hrs', file: 'log_w11_vergara.pdf' }
  ]);
  const [activeInternsCount, setActiveInternsCount] = useState(1248);
  const [completedOjtCount, setCompletedOjtCount] = useState(3892);
  const [isLogbookModalOpen, setIsLogbookModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Quick Action form parameters
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogDept, setNewLogDept] = useState('CS Department');
  const [newLogAuthor, setNewLogAuthor] = useState('');

  const [recentActivities, setRecentActivities] = useState([
    { id: '1', title: 'New Logbook Entry', meta: 'Maria Santos • CS Department', time: '2m ago', type: 'upload' },
    { id: '2', title: 'Company Partnership', meta: 'Accenture Philippines', time: '1h ago', type: 'partnership' },
    { id: '3', title: 'OJT Briefing Uploaded', meta: 'Coordinator Rossi', time: '5h ago', type: 'system' }
  ]);

  const handleApproveLog = (studentId: string, studentName: string, dept: string) => {
    // Decrement pending, increase completed and prepend recent activity
    setPendingStudents(prev => prev.filter(s => s.id !== studentId));
    setActiveInternsCount(prev => prev + 1);
    setCompletedOjtCount(prev => prev + 1);
    
    const newActivity = {
      id: Date.now().toString(),
      title: 'Approved Logbook Entry',
      meta: `${studentName} • ${dept}`,
      time: 'Just now',
      type: 'upload'
    };
    setRecentActivities(prev => [newActivity, ...prev]);
  };

  const handleAddNewLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle || !newLogAuthor) return;

    const newActivity = {
      id: Date.now().toString(),
      title: newLogTitle,
      meta: `${newLogAuthor} • ${newLogDept}`,
      time: 'Just now',
      type: 'upload'
    };
    setRecentActivities(prev => [newActivity, ...prev]);
    setIsLogbookModalOpen(false);
    setNewLogTitle('');
    setNewLogAuthor('');
  };

  return (
    <div id="dashboard-screen" className="pb-10 w-full animate-fadeIn select-none">
      {/* Title Header with Badging */}
      <section className="mb-5">
        <p className="text-[10px] font-bold text-[#002068] uppercase tracking-widest">
          Administrator Dashboard
        </p>
        <h2 className="text-2.5xl font-bold text-[#191c1e] mt-0.5 tracking-tight font-sans">
          OJT Overview
        </h2>
      </section>

      {/* STATS PROGRESS GRID BLOCK */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        {/* Dynamic Card for Active Interns */}
        <div className="bg-white p-4 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] flex flex-col justify-between h-32 relative group hover:border-[#ffe16d]/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#002068]/5 rounded-xl text-[#002068]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
              +12%
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#444653] uppercase tracking-wider">
              Active Interns
            </p>
            <p className="text-2.5xl font-bold text-[#002068] leading-none mt-1">
              {activeInternsCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Dynamic Card for Completed OJT */}
        <div className="bg-white p-4 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] flex flex-col justify-between h-32 relative group hover:border-[#ffe16d]/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#705d00]/5 rounded-xl text-[#705d00]">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#444653] uppercase tracking-wider">
              Completed OJT
            </p>
            <p className="text-2.5xl font-bold text-[#705d00] leading-none mt-1">
              {completedOjtCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action-Oriented Pending Requirements banner */}
        <div className="col-span-2 bg-[#002068] text-white p-5 rounded-2xl shadow-md relative overflow-hidden group">
          {/* Circular abstract overlay decoration */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl transition-transform duration-500 group-hover:scale-110" />
          
          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#a7c8ff] uppercase tracking-widest">
                Pending Requirements
              </p>
              <p className="text-xl md:text-2.5xl font-bold tracking-tight">
                {pendingStudents.length > 0 ? `${pendingStudents.length + 153} Students` : '153 Students'}
              </p>
              <button 
                onClick={() => setIsWorkflowOpen(true)}
                className="mt-3 text-xs font-bold flex items-center gap-1.5 bg-white text-[#002068] px-4 py-2 rounded-full cursor-pointer hover:bg-[#ffe088] transition-colors active:scale-95 duration-100"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <AlertCircle className="w-14 h-14 text-white/15 animate-pulse" />
          </div>
        </div>
      </section>

      {/* QUICK ACTION CONTROLS */}
      <section className="space-y-3 mb-6">
        <h3 className="text-base font-bold text-[#191c1e] tracking-tight">
          Quick Actions
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            type="button"
            onClick={() => setIsLogbookModalOpen(true)}
            className="flex-none flex items-center gap-2 bg-white hover:border-[#002068] border border-[#eceef0] px-5 py-3 rounded-2xl active:bg-[#f7f9fb] transition-all cursor-pointer shadow-sm"
          >
            <ClipboardList className="w-4 h-4 text-[#002068]" />
            <span className="text-xs font-bold text-[#191c1e] whitespace-nowrap">Update Logbook</span>
          </button>
          
          <button 
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="flex-none flex items-center gap-2 bg-white hover:border-[#002068] border border-[#eceef0] px-5 py-3 rounded-2xl active:bg-[#f7f9fb] transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4 text-[#002068]" />
            <span className="text-xs font-bold text-[#191c1e] whitespace-nowrap">View Notifications</span>
          </button>

          <button 
            type="button"
            onClick={() => setIsReportsModalOpen(true)}
            className="flex-none flex items-center gap-2 bg-white hover:border-[#002068] border border-[#eceef0] px-5 py-3 rounded-2xl active:bg-[#f7f9fb] transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-[#002068]" />
            <span className="text-xs font-bold text-[#191c1e] whitespace-nowrap">Reports</span>
          </button>
        </div>
      </section>

      {/* PROGRESS GRAPH - HIGH CONTRAST */}
      <section className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-base font-bold text-[#191c1e] tracking-tight">
              Employment Rate
            </h3>
            <p className="text-[11px] text-[#43474f] font-medium">
              After OJT Completion
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#002068] leading-none">
              84%
            </p>
            <p className="text-[10px] font-bold text-green-600 mt-1">
              ▲ 4.2%
            </p>
          </div>
        </div>

        {/* Animated Bar Chart Placeholder */}
        <div className="h-40 w-full flex items-end justify-between gap-1.5 px-0.5 pt-4">
          {[
            { day: 'MON', pct: '40%', high: false },
            { day: 'TUE', pct: '65%', high: false },
            { day: 'WED', pct: '55%', high: false },
            { day: 'THU', pct: '85%', high: false },
            { day: 'FRI', pct: '70%', high: false },
            { day: 'SAT', pct: '95%', high: true }, // Highlighter saturated Saturday
            { day: 'SUN', pct: '80%', high: false }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
              <div className="w-full relative bg-[#eceef0] rounded-t-md h-32 flex items-end">
                <div 
                  style={{ height: bar.pct }} 
                  className={`w-full rounded-t-md transition-all duration-1000 ease-out group-hover:opacity-80 ${
                    bar.high ? 'bg-[#fed65b]' : 'bg-[#002068]'
                  }`} 
                />
              </div>
              <span className="text-[9px] font-bold text-[#747780] mt-2 tracking-wide">
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT LOG ENTRIES */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-[#191c1e] tracking-tight">
            Recent Activity
          </h3>
          <button 
            onClick={() => onNavToTab('Internship')}
            className="text-xs font-bold text-[#002068] hover:underline"
          >
            See All
          </button>
        </div>

        <div className="space-y-2">
          {recentActivities.map((act) => (
            <div 
              key={act.id} 
              className="flex items-center gap-3.5 bg-white p-3 rounded-2xl shadow-sm border border-[#eceef0] hover:border-[#002068]/20 transition-all"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                act.type === 'upload' 
                  ? 'bg-[#fed65b]/20 text-[#705d00]' 
                  : act.type === 'partnership'
                    ? 'bg-[#003366]/10 text-[#003366]'
                    : 'bg-[#eceef0] text-[#747780]'
              }`}>
                {act.type === 'upload' ? (
                  <Upload className="w-5 h-5" />
                ) : act.type === 'partnership' ? (
                  <Building2 className="w-5 h-5" />
                ) : (
                  <ClipboardList className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#191c1d] truncate">
                  {act.title}
                </p>
                <p className="text-[11px] text-[#43474f] font-medium truncate">
                  {act.meta}
                </p>
              </div>

              <p className="text-[10px] text-[#737780] font-bold whitespace-nowrap">
                {act.time}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACTION MODALS & DIALOGS */}
      
      {/* 1. WORKFLOW APPROVAL MODAL (TAKE ACTION) */}
      {isWorkflowOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-md animate-scaleIn max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#002068]">Pending Review Portal</h3>
              <button 
                onClick={() => setIsWorkflowOpen(false)}
                className="text-xs text-[#747780] font-bold px-2 py-1 bg-[#eceef0] rounded-full hover:bg-[#eceef0]/80"
              >
                Close
              </button>
            </div>
            
            <p className="text-xs text-[#43474f] mb-4 leading-relaxed font-semibold">
              The following students uploaded logbooks requiring coordinator approval. Approve to verify hours:
            </p>

            {pendingStudents.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs font-bold text-green-600">All pending review items completed!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingStudents.map(student => (
                  <div key={student.id} className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#eceef0] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-[#191c1d]">{student.name}</h4>
                        <p className="text-[10px] text-[#737780] font-semibold">{student.department}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#002068] bg-[#002068]/5 px-2 py-0.5 rounded-full">
                        {student.hours}
                      </span>
                    </div>
                    <p className="text-xs text-[#444653] font-medium italic">
                      {student.log}
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleApproveLog(student.id, student.name, student.department)}
                        className="flex-1 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Approve Log
                      </button>
                      <button
                        onClick={() => setPendingStudents(prev => prev.filter(s => s.id !== student.id))}
                        className="px-2 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. UPDATE LOGBOOK MODAL */}
      {isLogbookModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full animate-fadeIn">
          <form 
            onSubmit={handleAddNewLog}
            className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Post New Log Announcement</h3>
              <button 
                type="button"
                onClick={() => setIsLogbookModalOpen(false)}
                className="text-[11px] text-[#747780] font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Announcement / Log Title
                </label>
                <input 
                  required
                  type="text" 
                  value={newLogTitle}
                  onChange={(e) => setNewLogTitle(e.target.value)}
                  placeholder="e.g. Midterm Evaluation Submission"
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Sender Author
                </label>
                <input 
                  required
                  type="text" 
                  value={newLogAuthor}
                  onChange={(e) => setNewLogAuthor(e.target.value)}
                  placeholder="e.g. Engr. Marco Rossi"
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Department Category
                </label>
                <select 
                  value={newLogDept}
                  onChange={(e) => setNewLogDept(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068]"
                >
                  <option value="CS Department">CS Department</option>
                  <option value="IT Department">IT Department</option>
                  <option value="Tech Department">Technology Department</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#002068] hover:bg-[#00174e] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-primary/25 cursor-pointer"
            >
              Post Activity Announcement
            </button>
          </form>
        </div>
      )}

      {/* 3. REPORTS GENERATOR MODAL */}
      {isReportsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-[#705d00] mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-[#002068]">Generate OJT Reports</h3>
            <p className="text-xs text-[#43474f] leading-relaxed">
              Compile the cumulative OJT and Employment tracking statistics for academic evaluation:
            </p>
            <div className="space-y-2 text-left">
              {[
                'CTU Carmen Internship Report 2026.xlsx',
                'Active Student Logbook Summaries.docx',
                'Employment Statistics Q2.pdf'
              ].map((report, idx) => (
                <button
                  key={idx}
                  onClick={() => alert(`Initiating secure local download compilation: ${report}`)}
                  className="w-full text-left p-3 bg-[#f7f9fb] rounded-xl text-xs font-bold text-[#191c1e] hover:bg-[#eceef0] border border-[#eceef0] flex items-center justify-between"
                >
                  <span>{report}</span>
                  <Download className="w-4 h-4 text-[#002068]" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsReportsModalOpen(false)}
              className="w-full py-2.5 bg-[#43474f] text-white rounded-xl text-xs font-bold hover:bg-[#191c1e]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 4. NOTIFICATIONS SIDE POPUP */}
      {isNotificationOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn text-left space-y-4">
            <h3 className="text-base font-bold text-[#002068]">Recent Notifications</h3>
            <div className="space-y-2">
              {[
                { message: 'System Update: CTU Tracer v1.0.2 is live', t: '5h ago' },
                { message: 'Academic Partner: Accenture added 5 slots', t: '1d ago' },
                { message: 'Student Alert: Elena Rodriguez submitted Week 11 Report', t: '2d ago' }
              ].map((notif, idx) => (
                <div key={idx} className="p-3 bg-[#f7f9fb] rounded-xl border border-[#eceef0] text-xs">
                  <p className="font-semibold text-[#191c1e]">{notif.message}</p>
                  <span className="text-[10px] text-[#737780] font-bold mt-1 block">{notif.t}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="w-full py-2.5 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
