import React from 'react';
import { Lock } from 'lucide-react';
import FreelancerDashboard from './FreelancerDashboard';
import ClientDashboard from './ClientDashboard';

export default function DashboardPage({
  user,
  token,
  projects = [],
  setActiveView,
  onOpenAuth,
  onOpenPostJob,
  onOpenApplyModal,
  onOpenWithdrawModal,
  refreshKey,
  onLogout
}) {
  // If user is not logged in, enforce Protected Route Authentication Lock Screen
  if (!user) {
    return (
      <div className="dashboard-page bg-slate">
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="card-box" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px 32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Please Log In to Continue</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
              Please log in or create an account to view your jobs, work applications, and earnings.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => onOpenAuth('register', 'freelancer')}>
                Create Account
              </button>
              <button className="btn-primary" onClick={() => onOpenAuth('login', 'freelancer')}>
                Log In Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Client Dashboard
  if (user.role === 'client') {
    return (
      <ClientDashboard
        user={user}
        token={token}
        onOpenPostJob={onOpenPostJob}
        setActiveView={setActiveView}
        refreshKey={refreshKey}
        onLogout={onLogout}
      />
    );
  }

  // Freelancer Dashboard (Default)
  return (
    <FreelancerDashboard
      user={user}
      token={token}
      projects={projects}
      setActiveView={setActiveView}
      onOpenApplyModal={onOpenApplyModal}
      onOpenWithdrawModal={onOpenWithdrawModal}
      onLogout={onLogout}
    />
  );
}
