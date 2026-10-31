import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Calendar, User, Bell, BookOpen, LogOut, ExternalLink } from 'lucide-react';

export const MemberDashboardPage: React.FC = () => {
  const { currentUser, resources, trainings, logout, navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'training' | 'profile'>('overview');

  if (!currentUser) {
    return (
      <div className="w-full bg-[#F6F8FA] py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#051449]">Member Sign In Required</h1>
          <p className="text-xs text-slate-600">
            Please log in or create an account to access the BTMT Community Member Dashboard.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigateTo('/login')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#051449] rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateTo('/community/join')}
              className="px-6 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = (resTitle: string, fileFormat: string) => {
    const content = `BTMT Community Member Resource:\nDocument: ${resTitle}\nLicensed to: ${currentUser.fullName} (${currentUser.email})\nBlissful Touch Media & Technology Standards`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${fileFormat.toLowerCase()}`;
    a.click();
    showToast(`Downloading verified file: ${resTitle}`, 'success');
  };

  return (
    <div className="w-full bg-[#F6F8FA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Community Member Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#051449]">
              Welcome, {currentUser.fullName}
            </h1>
            <div className="text-xs text-slate-500">
              {currentUser.brandName ? `Brand: ${currentUser.brandName} · ` : ''}
              Member since {currentUser.joinedDate}
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <button
              onClick={() => navigateTo('/community')}
              className="px-4 py-2 text-xs font-semibold text-[#051449] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Public Community Hub
            </button>
            <button
              onClick={() => {
                logout();
                navigateTo('/');
              }}
              className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto space-x-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'resources', label: `Resource Library (${resources.length})` },
            { id: 'training', label: `Training Sessions (${trainings.length})` },
            { id: 'profile', label: 'My Profile & Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#051449]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#051449]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Available Resources</div>
                <div className="text-2xl font-bold text-[#051449] font-mono">{resources.length}</div>
                <div className="text-[11px] text-emerald-700">Full Unrestricted Access</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Upcoming Trainings</div>
                <div className="text-2xl font-bold text-[#051449] font-mono">{trainings.length}</div>
                <div className="text-[11px] text-[#12A9DB]">Free Masterclass Seats</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Community Status</div>
                <div className="text-2xl font-bold text-[#051449]">Active Member</div>
                <div className="text-[11px] text-slate-500">Tier: Standard Free</div>
              </div>
            </div>

            {/* Latest Announcements */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#12A9DB]" />
                <h2 className="text-base font-bold text-[#051449]">
                  Member Notices & Updates
                </h2>
              </div>
              <div className="p-4 bg-[#F6F8FA] rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-[#051449]">
                  BTMT Q4 2026 Enterprise Grant & Incubation Advisory
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Startups within the BTMT community are invited to submit their technology prototypes
                  for review under our Objective 5 startup visibility pipeline. Consultation sessions
                  open mid-November.
                </p>
              </div>
            </div>

            {/* Quick Resource Access Strip */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#051449]">
                  Featured Member Downloads
                </h2>
                <button
                  onClick={() => setActiveTab('resources')}
                  className="text-xs font-semibold text-[#12A9DB] hover:underline"
                >
                  View All Files
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {resources.slice(0, 3).map((res) => (
                  <div key={res.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#051449]">{res.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {res.category} · {res.fileFormat} ({res.fileSize})
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(res.title, res.fileFormat)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#051449] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#051449] mb-4">
                All Available Learning Resources & Templates
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-xl border border-slate-200 bg-[#F6F8FA] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-[#12A9DB]">{res.category}</span>
                        <span className="font-mono">{res.fileFormat} · {res.fileSize}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#051449]">{res.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
                    </div>

                    <button
                      onClick={() => handleDownload(res.title, res.fileFormat)}
                      className="w-full py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File ({res.fileFormat})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRAINING */}
        {activeTab === 'training' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-bold text-[#051449]">
              Training Schedule & Webinar Access
            </h2>

            <div className="space-y-4">
              {trainings.map((trn) => (
                <div
                  key={trn.id}
                  className="p-6 rounded-xl border border-slate-200 bg-[#F6F8FA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      {trn.status} · {trn.format}
                    </div>
                    <h3 className="text-base font-bold text-[#051449]">{trn.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{trn.description}</p>
                    <div className="text-xs text-slate-500 font-mono pt-1">
                      Date: {trn.date} ({trn.time}) · Instructor: {trn.instructor}
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Attendance confirmed. A calendar invitation has been sent to your email.', 'success')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Confirm My Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MY PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-2xl space-y-6">
            <h2 className="text-lg font-bold text-[#051449]">Member Profile Information</h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 border-b border-slate-100 pb-3">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-semibold text-slate-900">{currentUser.fullName}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-100 pb-3">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-semibold text-slate-900">{currentUser.email}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-100 pb-3">
                <span className="text-slate-500">Organization / Brand:</span>
                <span className="font-semibold text-slate-900">{currentUser.brandName || 'Not specified'}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-100 pb-3">
                <span className="text-slate-500">Area of Interest:</span>
                <span className="font-semibold text-slate-900">{currentUser.areaOfInterest || 'General Tech & Media'}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-100 pb-3">
                <span className="text-slate-500">Account Type:</span>
                <span className="font-semibold text-[#12A9DB] uppercase">Standard Community Member (Free)</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => showToast('Profile settings up to date.', 'info')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] rounded-lg"
              >
                Save Preferences
              </button>

              <button
                onClick={() => {
                  logout();
                  navigateTo('/');
                }}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Sign Out of Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
