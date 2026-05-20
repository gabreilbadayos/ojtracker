/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Plus, 
  Info,
  CalendarDays,
  X,
  FileText
} from 'lucide-react';
import { AttendanceEntry, WeeklyReport } from '../types';

export default function InternshipScreen() {
  // OJT hours progress states
  const [completedHours, setCompletedHours] = useState(360);
  const totalHoursRequired = 480;
  
  // Interactive logs checklist
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceEntry[]>([
    { id: '1', date: 'Oct 24, 2023', timeRange: '8:00 AM - 5:00 PM', hours: 8, status: 'Approved' },
    { id: '2', date: 'Oct 23, 2023', timeRange: '8:15 AM - 5:15 PM', hours: 8, status: 'Approved' },
    { id: '3', date: 'Oct 22, 2023', timeRange: 'Sick Leave', hours: 0, status: 'Sick Leave' },
    { id: '4', date: 'Oct 21, 2023', timeRange: '8:00 AM - 5:00 PM', hours: 8, status: 'Approved' }
  ]);

  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>([
    { weekNumber: 11, status: 'Approved' },
    { weekNumber: 12, status: 'Reviewing' }
  ]);

  // Log hours modal trigger
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logDateInput, setLogDateInput] = useState('2026-05-20');
  const [logTimeIn, setLogTimeIn] = useState('08:00');
  const [logTimeOut, setLogTimeOut] = useState('17:00');
  const [logHours, setLogHours] = useState(8);
  const [isSickLeave, setIsSickLeave] = useState(false);
  const [isSubmitReportOpen, setIsSubmitReportOpen] = useState(false);
  const [newReportWeek, setNewReportWeek] = useState(13);

  // SVG parameters for hour progress circle
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(completedHours / totalHoursRequired, 1.0);
  const strokeDashoffset = circumference - ratio * circumference;
  const percentageCompleted = Math.round(ratio * 100);

  const handleLogHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedDate = new Date(logDateInput).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newEntry: AttendanceEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      timeRange: isSickLeave ? 'Sick Leave' : `${formatTime12h(logTimeIn)} - ${formatTime12h(logTimeOut)}`,
      hours: isSickLeave ? 0 : logHours,
      status: 'Reviewing'
    };

    setAttendanceLogs(prev => [newEntry, ...prev]);
    if (!isSickLeave) {
      setCompletedHours(prev => Math.min(prev + logHours, totalHoursRequired));
    }
    
    setIsLogOpen(false);
    // Reset parameters
    setIsSickLeave(false);
  };

  const handleAddNewWeekReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: WeeklyReport = {
      weekNumber: newReportWeek,
      status: 'Reviewing'
    };
    setWeeklyReports(prev => [...prev, newReport]);
    setIsSubmitReportOpen(false);
    setNewReportWeek(prev => prev + 1);
  };

  const formatTime12h = (timeStr: string) => {
    if (!timeStr) return '';
    const [hStr, mStr] = timeStr.split(':');
    const h = parseInt(hStr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${mStr} ${ampm}`;
  };

  return (
    <div id="internship-screen" className="pb-10 w-full animate-fadeIn select-none relative">
      
      {/* 1. TOP CORPORATE ASSIGNMENT OVERVIEW */}
      <section className="mb-5 bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0]">
        <div className="flex justify-between items-start gap-2 mb-4">
          <div>
            <h3 className="text-[#002068] font-bold text-base tracking-tight truncate">
              TechVanguard Solutions Inc.
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#43474f] font-semibold mt-1">
              <User className="w-3.5 h-3.5 text-[#002068]" />
              <span>Supervisor: Engr. Marco Rossi</span>
            </div>
          </div>
          <span className="flex-none bg-[#fed65b] text-[#705d00] font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 leading-none shadow-sm">
            <span>★</span>
            <span>On Track</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#f2f4f6]">
          <div>
            <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Role</p>
            <p className="text-sm font-bold text-[#191c1d] mt-0.5">Software Intern</p>
          </div>
          <div>
            <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Term</p>
            <p className="text-sm font-bold text-[#191c1d] mt-0.5">AY 2023-2024</p>
          </div>
        </div>
      </section>

      {/* 2. CIRCULAR TIME-TRACKING PROGRESS BOARD */}
      <section className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6 flex flex-col items-center">
        <h4 className="text-[10px] font-bold text-[#737780] uppercase tracking-[0.16em] mb-5">
          Internship Progress
        </h4>

        <div className="relative w-44 h-44 flex items-center justify-center mb-5">
          {/* background ring spacer */}
          <svg className="absolute transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#eceef0"
              strokeWidth={strokeWidth}
            />
            {/* progress line indicator */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#002068"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>

          {/* Core centered digits */}
          <div className="text-center z-10">
            <p className="text-3.5xl font-extrabold text-[#002068] tracking-tight leading-none font-sans">
              {completedHours}
            </p>
            <p className="text-xs font-bold text-[#747684] mt-1 uppercase tracking-widest">
              / {totalHoursRequired} Hrs
            </p>
          </div>
        </div>

        <p className="text-xs text-[#43474f] font-semibold text-center leading-relaxed max-w-xs">
          You have completed <span className="text-[#002068] font-bold">{percentageCompleted}%</span> of your total required hours.
        </p>
      </section>

      {/* 3. WEEKLY REPORTS CONTAINER */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm md:text-base font-bold text-[#191c1e] tracking-tight">
            Weekly Reports
          </h3>
          <button 
            type="button" 
            onClick={() => setIsSubmitReportOpen(true)}
            className="text-xs font-bold text-[#002068] hover:underline"
          >
            Submit Report
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {weeklyReports.map((week) => (
            <div 
              key={week.weekNumber} 
              className={`p-4 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center h-24 transition-all duration-150 relative overflow-hidden bg-white ${
                week.status === 'Approved' ? 'border-green-100 hover:border-green-300' : 'border-yellow-100 hover:border-yellow-300'
              }`}
            >
              {week.status === 'Approved' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600 mb-1" />
                  <p className="text-[10px] font-bold text-[#737780] uppercase tracking-wider">Week {week.weekNumber}</p>
                  <p className="text-xs font-bold text-green-700 mt-0.5">Approved</p>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-yellow-600 mb-1" />
                  <p className="text-[10px] font-bold text-[#737780] uppercase tracking-wider">Week {week.weekNumber}</p>
                  <p className="text-xs font-bold text-yellow-700 mt-0.5">Reviewing</p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. RECENT ATTENDANCE CHECKS */}
      <section className="space-y-3 pb-20">
        <h3 className="text-sm md:text-base font-bold text-[#191c1d] tracking-tight">
          Recent Attendance
        </h3>

        <div id="attendance-list" className="space-y-2 bg-white rounded-2xl p-4 border border-[#eceef0] shadow-sm">
          {attendanceLogs.map((log) => {
            const isSick = log.status === 'Sick Leave';
            return (
              <div 
                key={log.id} 
                className="flex items-center justify-between border-b border-[#f2f4f6]"
              >
                <div className="flex items-center gap-3.5 py-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSick ? 'bg-red-50 text-red-600' : 'bg-[#002068]/5 text-[#002068]'
                  }`}>
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#191c1d]">
                      {log.date}
                    </p>
                    <p className={`text-[11px] font-bold mt-0.5 ${
                      isSick ? 'text-red-600' : 'text-[#737780]'
                    }`}>
                      {log.timeRange}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xs font-bold leading-none ${
                    isSick ? 'text-red-600' : 'text-[#002068]'
                  }`}>
                    {isSick ? '0h' : `${log.hours}h`}
                  </p>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    log.status === 'Approved' 
                      ? 'bg-green-50 text-green-700 border border-green-100' 
                      : log.status === 'Reviewing'
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FLOATING ACTION BUTTON (ADD LOG) */}
      <button 
        onClick={() => setIsLogOpen(true)}
        type="button"
        id="add-log-fab"
        className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-[#002068] hover:bg-[#00174e] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* MODAL DIALOGS */}
      
      {/* A. LOG HOURS MODAL */}
      {isLogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <form 
            onSubmit={handleLogHoursSubmit}
            className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Log Internship Attendance</h3>
              <button 
                type="button" 
                onClick={() => setIsLogOpen(false)}
                className="text-[#747780] hover:text-[#002068] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 py-1 bg-red-50 hover:bg-red-100/60 p-2.5 rounded-xl border border-red-100">
                <input 
                  type="checkbox" 
                  id="sick-leave-check"
                  checked={isSickLeave}
                  onChange={(e) => setIsSickLeave(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-400 border-red-300"
                />
                <label htmlFor="sick-leave-check" className="text-xs font-bold text-red-700 select-none cursor-pointer">
                  Declare this day as Sick Leave / Emergency Leave
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Calendar Date
                </label>
                <input 
                  required
                  type="date"
                  value={logDateInput}
                  onChange={(e) => setLogDateInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068]"
                />
              </div>

              {!isSickLeave && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                        Time In
                      </label>
                      <input 
                        type="time" 
                        value={logTimeIn}
                        onChange={(e) => setLogTimeIn(e.target.value)}
                        className="w-full text-xs p-3 bg-[#f7f9fb] rounded-xl border border-[#c4c5d5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                        Time Out
                      </label>
                      <input 
                        type="time" 
                        value={logTimeOut}
                        onChange={(e) => setLogTimeOut(e.target.value)}
                        className="w-full text-xs p-3 bg-[#f7f9fb] rounded-xl border border-[#c4c5d5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                      Computed Hours
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="16"
                      value={logHours}
                      onChange={(e) => setLogHours(parseInt(e.target.value, 10))}
                      className="w-full text-xs p-3 bg-[#f7f9fb] rounded-xl border border-[#c4c5d5]"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#002068] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#00174e] transition-colors cursor-pointer"
            >
              Submit Attendance Log
            </button>
          </form>
        </div>
      )}

      {/* B. SUBMIT WEEKLY REPORT MODAL */}
      {isSubmitReportOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <form 
            onSubmit={handleAddNewWeekReport}
            className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Submit Weekly Report</h3>
              <button 
                type="button" 
                onClick={() => setIsSubmitReportOpen(false)}
                className="text-xs text-[#747780]"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Select Week Number
                </label>
                <input 
                  type="number"
                  min="1"
                  max="52"
                  value={newReportWeek}
                  onChange={(e) => setNewReportWeek(parseInt(e.target.value, 10))}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-wider mb-1">
                  Upload PDF Log / Work Document
                </label>
                <div className="border-2 border-dashed border-[#c4c5d5] rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <FileText className="w-8 h-8 text-[#002068] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#191c1e]">Drag and drop Week Logbook PDF</p>
                  <p className="text-[9px] text-[#737780] mt-0.5">Maximum size: 10MB</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Submit Weekly Report For Approval
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
