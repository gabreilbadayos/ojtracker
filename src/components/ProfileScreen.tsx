/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  LogOut, 
  Pencil,
  Check,
  X,
  PlusCircle,
  Award
} from 'lucide-react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  // Profile interactive states
  const [skills, setSkills] = useState([
    'UI/UX Design', 
    'React.js', 
    'Python', 
    'Node.js', 
    'Data Structures'
  ]);
  
  // Dynamic contact states
  const [emailText, setEmailText] = useState('elena.rod@ctu.edu.ph');
  const [phoneText, setPhoneText] = useState('+63 912 345 6789');
  const [addressText, setAddressText] = useState('Cebu City, Philippines');

  // Course states
  const [programName, setProgramName] = useState('BS in Computer Science');
  const [academicTerm, setAcademicTerm] = useState('4th Year, 1st Semester');
  const [progPercent, setProgPercent] = useState(85);

  // Edit states
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');
  const [isContactEditOpen, setIsContactEditOpen] = useState(false);
  const [isCourseEditOpen, setIsCourseEditOpen] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillText.trim() && !skills.includes(newSkillText.trim())) {
      setSkills(prev => [...prev, newSkillText.trim()]);
    }
    setNewSkillText('');
    setIsSkillsModalOpen(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  return (
    <div id="profile-screen" className="pb-12 w-full animate-fadeIn select-none">
      
      {/* 1. TOP INTERACTIVE PROFILE CARD WITH CORPORATE PORTRAIT */}
      <section className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] text-center relative overflow-hidden mb-6">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#fed65b]/5 rounded-bl-[100px]" />
        
        {/* Profile Avatar with Edit overlay badge */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <div className="w-full h-full rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
            {/* Professional studio portfolio portrait of professional woman matching Elena */}
            <img 
              alt="Elena Rodriguez PORTRAIT" 
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              referrerPolicy="no-referrer"
            />
          </div>
          <button 
            onClick={() => alert('Feature incoming! Click Edit in appropriate blocks below to revise details.')}
            className="absolute bottom-1 right-1 bg-[#002068] hover:bg-[#00174e] text-white p-2 rounded-full border-2 border-white shadow-sm transition-transform active:scale-90"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-[#191c1e] text-center font-sans">
          {user.fullName || 'Elena Rodriguez'}
        </h3>
        <p className="text-xs text-[#737780] font-bold text-center mt-1">
          ID: {user.idNumber || '2021-CCMSC-0452'}
        </p>
        
        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 font-bold text-[10px] px-3 py-1 rounded-full mt-3 leading-none border border-green-100 shadow-sm uppercase tracking-wider">
          <Check className="w-3 h-3 text-green-600" />
          <span>Active Student</span>
        </div>
      </section>

      {/* 2. COURSE DETAILS HIGHLIGHT WITH RE-EDIT TRIGGERS */}
      <section className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#002068] font-bold text-sm uppercase tracking-wide">
            Course Details
          </h4>
          <button 
            type="button" 
            onClick={() => setIsCourseEditOpen(true)}
            className="text-[#002068] hover:bg-slate-50 p-1.5 rounded-lg active:scale-95 transition-all text-xs font-bold"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#fed65b]/20 text-[#705d00] flex items-center justify-center">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Program</p>
              <p className="text-xs font-bold text-[#191c1d] mt-0.5">{programName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#fed65b]/20 text-[#705d00] flex items-center justify-center">
              <Calendar className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Academic Year</p>
              <p className="text-xs font-bold text-[#191c1d] mt-0.5">{academicTerm}</p>
            </div>
          </div>

          {/* Sizing indicators & Academic Progress slider */}
          <div className="pt-3 border-t border-[#f2f4f6]">
            <div className="flex justify-between items-center text-xs text-[#43474f] font-semibold mb-1.5">
              <span>Academic Progress</span>
              <span className="text-[#002068] font-bold">{progPercent}% Complete</span>
            </div>
            <div className="w-full bg-[#eceef0] h-2.5 rounded-full overflow-hidden">
              <div 
                style={{ width: `${progPercent}%` }} 
                className="bg-[#002068] h-full rounded-full transition-all duration-300" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS GRID WITH REMOVE CAPABILITY */}
      <section className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#002068] font-bold text-sm uppercase tracking-wide">
            Skills
          </h4>
          <button 
            type="button" 
            onClick={() => setIsSkillsModalOpen(true)}
            className="text-[#002068] hover:bg-slate-50 p-1 rounded-full active:scale-95 transition-all"
          >
            <PlusCircle className="w-5.5 h-5.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div 
              key={skill} 
              className="bg-[#d5e3ff] text-[#1f477b] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-[#b5c4ff] flex items-center gap-1 group hover:bg-[#fed65b] hover:text-[#705d00] transition-colors"
            >
              <span>{skill}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(skill)}
                className="text-[#1f477b]/50 group-hover:text-red-700 ml-1 leading-none text-xs hover:scale-110"
                title="Remove Skill"
              >
                ×
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-xs text-[#737780] italic py-2">No skills registered yet. Click (+) to populate.</p>
          )}
        </div>
      </section>

      {/* 4. CONTACTS HIGHLIGHTED METADATA VIEW */}
      <section className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,51,153,0.04)] border border-[#eceef0] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#002068] font-bold text-sm uppercase tracking-wide">
            Contact Information
          </h4>
          <button 
            type="button" 
            onClick={() => setIsContactEditOpen(true)}
            className="text-[#002068] hover:bg-slate-50 p-1.5 rounded-lg active:scale-95 transition-all text-xs font-bold"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#eceef0] text-[#002068] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Email</p>
              <p className="text-xs font-semibold text-[#191c1d] mt-0.5">{emailText}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#eceef0] text-[#002068] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Phone</p>
              <p className="text-xs font-semibold text-[#191c1d] mt-0.5">{phoneText}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#eceef0] text-[#002068] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-[#737780] font-bold uppercase tracking-wider">Address</p>
              <p className="text-xs font-semibold text-[#191c1d] mt-0.5">{addressText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECURE LOGOUT ACCOUNT ACTION BUTTON */}
      <button 
        type="button"
        id="logout-btn"
        className="w-full py-4 bg-white border border-red-200 text-red-600 font-bold rounded-2xl shadow-sm hover:shadow-red-100 hover:bg-red-50/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm mb-16"
        onClick={onLogout}
      >
        <LogOut className="w-4.5 h-4.5" />
        <span>Logout Account</span>
      </button>

      {/* DIALOG POPOVERS FOR INTERACTION */}

      {/* A. CONTACT DETAILS EDIT OVERLAY */}
      {isContactEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Edit Contact Information</h3>
              <button onClick={() => setIsContactEditOpen(false)} className="text-xs text-[#747780]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  value={phoneText}
                  onChange={(e) => setPhoneText(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide">
                  Address
                </label>
                <input 
                  type="text" 
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>
            </div>

            <button
              onClick={() => setIsContactEditOpen(false)}
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Save Profile Updates
            </button>
          </div>
        </div>
      )}

      {/* B. COURSE DETAILS EDIT OVERLAY */}
      {isCourseEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Edit Course Details</h3>
              <button onClick={() => setIsCourseEditOpen(false)} className="text-xs text-[#747780]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide">
                  Program Degree
                </label>
                <input 
                  type="text" 
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide">
                  Academic Term / Semester
                </label>
                <input 
                  type="text" 
                  value={academicTerm}
                  onChange={(e) => setAcademicTerm(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#43474f] mb-1 uppercase tracking-wide flex justify-between">
                  <span>Academic Percent</span>
                  <span>{progPercent}%</span>
                </label>
                <input 
                  type="range" 
                  min="0"
                  max="100"
                  value={progPercent}
                  onChange={(e) => setProgPercent(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={() => setIsCourseEditOpen(false)}
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Save Details
            </button>
          </div>
        </div>
      )}

      {/* C. ADD SKILL OPTION MODAL */}
      {isSkillsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <form 
            onSubmit={handleAddSkill}
            className="bg-white rounded-[2rem] border border-[#eceef0] shadow-2xl p-6 w-full max-w-sm animate-scaleIn space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#002068]">Register New Skill</h3>
              <button type="button" onClick={() => setIsSkillsModalOpen(false)} className="text-xs text-[#747780]">
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#43474f] uppercase mb-1">
                Skill Name (Tag)
              </label>
              <input 
                required
                type="text" 
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                placeholder="e.g. Next.js, Kotlin, TypeScript"
                className="w-full text-xs p-3.5 rounded-xl bg-[#f7f9fb] border border-[#c4c5d5] focus:outline-none focus:border-[#002068]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Add Skill Pill
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
