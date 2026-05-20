/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  Award, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface DirectoryMember {
  id: string;
  name: string;
  role: 'Student' | 'Alumni' | 'Partner';
  details: string; // Course details or company role
  meta: string; // ID or company division
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Completed' | 'Partner Active';
}

export default function DirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Student' | 'Alumni' | 'Partner'>('All');
  const [selectedMember, setSelectedMember] = useState<DirectoryMember | null>(null);

  const directoryData: DirectoryMember[] = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      role: 'Student',
      details: 'BS in Computer Science (4th Year)',
      meta: 'ID: 2021-CCMSC-0452',
      email: 'elena.rod@ctu.edu.ph',
      phone: '+63 912 345 6789',
      address: 'Cebu City, Philippines',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      role: 'Student',
      details: 'BS in Computer Science (4th Year)',
      meta: 'ID: 2021-CCMSC-0081',
      email: 'maria.santos@ctu.edu.ph',
      phone: '+63 915 220 8831',
      address: 'Carmen, Cebu',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Juan Dela Cruz',
      role: 'Alumni',
      details: 'BS in Information Technology (Batch 2024)',
      meta: 'ID: 2020-CCMSC-0105',
      email: 'juan.dlc@gmail.com',
      phone: '+63 918 902 4455',
      address: 'Danaon, Cebu',
      status: 'Completed'
    },
    {
      id: '4',
      name: 'Althea Vergara',
      role: 'Student',
      details: 'BS in Information Technology (4th Year)',
      meta: 'ID: 2021-CCMSC-0988',
      email: 'althea.vergara@ctu.edu.ph',
      phone: '+63 922 400 1289',
      address: 'Catmon, Cebu',
      status: 'Active'
    },
    {
      id: '5',
      name: 'TechVanguard Solutions Inc.',
      role: 'Partner',
      details: 'Primary Software Development Partner',
      meta: 'Est. AY 2022',
      email: 'internship@techvanguard.solutions',
      phone: '+63 32 411 9000',
      address: 'IT Park, Cebu City, Philippines',
      status: 'Partner Active'
    },
    {
      id: '6',
      name: 'Accenture Philippines',
      role: 'Partner',
      details: 'Enterprise Tech Consultation Partner',
      meta: 'Est. AY 2023',
      email: 'ojt.affairs@accenture.com',
      phone: '+63 2 8410 8888',
      address: 'Robinsons Cybergate, Cebu City',
      status: 'Partner Active'
    }
  ];

  // Filtering implementation
  const filteredData = directoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'All' || item.role === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div id="directory-screen" className="pb-12 w-full animate-fadeIn select-none">
      
      {/* Search Header panel */}
      <section className="mb-5 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] w-5 h-5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, alumni, partners..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#c4c5d5] shadow-sm focus:outline-none focus:border-[#002068] text-sm font-medium"
          />
        </div>

        {/* Filter selection pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['All', 'Student', 'Alumni', 'Partner'] as const).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`flex-none px-4 py-2 rounded-full font-bold text-xs transition-all ${
                activeFilter === category
                  ? 'bg-[#002068] text-white shadow-sm'
                  : 'bg-white text-[#43474f] border border-[#eceef0] hover:bg-[#eceef0]/40'
              }`}
            >
              {category === 'All' ? 'All Roles' : category}
            </button>
          ))}
        </div>
      </section>

      {/* Directory matches list */}
      <section className="space-y-3.5">
        <div className="flex justify-between items-center px-1">
          <p className="text-xs font-bold text-[#737780] uppercase tracking-wider">
            Directory Listing ({filteredData.length})
          </p>
          <Filter className="w-4 h-4 text-[#737780]" />
        </div>

        <div className="space-y-2">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedMember(item)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#eceef0] shadow-sm hover:border-[#002068]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.role === 'Student'
                    ? 'bg-[#003366]/10 text-[#002068]'
                    : item.role === 'Alumni'
                      ? 'bg-[#fed65b]/20 text-[#705d00]'
                      : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {item.role === 'Student' && <GraduationCap className="w-5.5 h-5.5" />}
                  {item.role === 'Alumni' && <Award className="w-5.5 h-5.5" />}
                  {item.role === 'Partner' && <Building2 className="w-5.5 h-5.5" />}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#191c1d] truncate group-hover:text-[#002068]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#43474f] truncate mt-0.5">
                    {item.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-none pl-2">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Active'
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : item.status === 'Completed'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {item.status}
                </span>
                <ChevronRight className="w-4 h-4 text-[#737780] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-10 bg-white rounded-3xl p-6 border border-[#eceef0]">
              <p className="text-xs font-bold text-[#737780]">No directory listings matched your query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                className="mt-2 text-xs text-[#002068] font-bold underline cursor-pointer"
              >
                Clear searches
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DETAILED MEMBER PROFILE IN MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-w-full">
          <div className="bg-white rounded-[2.2rem] border border-[#eceef0] p-6 w-full max-w-sm shadow-2xl animate-scaleIn space-y-5 text-left relative">
            
            <div className="flex justify-between items-start">
              <span className={`text-[10px] font-bold px-3 py-1 bg-[#eceef0] rounded-full text-[#43474f] uppercase tracking-wider`}>
                {selectedMember.role}
              </span>
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-xs text-[#747780] font-bold hover:bg-slate-100 p-1 rounded-full cursor-pointer"
              >
                <XBtn />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
                selectedMember.role === 'Student' 
                  ? 'bg-blue-100 text-blue-800' 
                  : selectedMember.role === 'Alumni' 
                    ? 'bg-amber-100 text-[#705d00]' 
                    : 'bg-indigo-100 text-indigo-800'
              }`}>
                {selectedMember.role === 'Student' && <GraduationCap className="w-7 h-7" />}
                {selectedMember.role === 'Alumni' && <Award className="w-7 h-7" />}
                {selectedMember.role === 'Partner' && <Building2 className="w-7 h-7" />}
              </div>
              <h3 className="text-base font-bold text-[#002068]">{selectedMember.name}</h3>
              <p className="text-xs text-[#43474f] font-semibold">{selectedMember.details}</p>
              <span className="text-[10px] font-bold text-[#747684] block">{selectedMember.meta}</span>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#f2f4f6]">
              <a 
                href={`mailto:${selectedMember.email}`}
                className="flex items-center gap-3 p-3 bg-[#f7f9fb] hover:bg-[#eceef0] rounded-xl text-xs text-[#191c1e] font-semibold cursor-pointer border border-[#eceef0] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#002068]" />
                <span className="truncate flex-1">{selectedMember.email}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#737780]" />
              </a>

              <a 
                href={`tel:${selectedMember.phone}`}
                className="flex items-center gap-3 p-3 bg-[#f7f9fb] hover:bg-[#eceef0] rounded-xl text-xs text-[#191c1e] font-semibold cursor-pointer border border-[#eceef0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#002068]" />
                <span>{selectedMember.phone}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#737780]" />
              </a>

              <div className="flex items-center gap-3 p-3 bg-[#f7f9fb] rounded-xl text-xs text-[#191c1e] font-semibold border border-[#eceef0]">
                <MapPin className="w-4 h-4 text-[#002068] flex-none" />
                <span className="truncate">{selectedMember.address}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-3 bg-[#002068] text-white rounded-xl text-xs font-bold"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function XBtn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
