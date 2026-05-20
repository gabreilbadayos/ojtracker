/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Student' | 'Alumni' | 'Coordinator' | 'Admin';

export interface User {
  idNumber: string;
  role: UserRole;
  fullName: string;
  email: string;
}

export interface AttendanceEntry {
  id: string;
  date: string;
  timeRange: string;
  hours: number;
  status: 'Approved' | 'Reviewing' | 'Sick Leave' | 'Absent';
}

export interface WeeklyReport {
  weekNumber: number;
  status: 'Approved' | 'Reviewing' | 'Not Submitted';
  submittedDate?: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  role: 'Student' | 'Alumni';
  program: string;
  year?: string;
  company?: string;
  email: string;
  phone: string;
  status: string;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'upload_file' | 'business' | 'alert' | 'system';
}
