import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import BrowseProjectsPage from './components/BrowseProjectsPage';
import FindTalentPage from './components/FindTalentPage';
import DashboardPage from './components/DashboardPage';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import PostJobModal from './components/PostJobModal';
import QuickApplyModal from './components/QuickApplyModal';
import WithdrawModal from './components/WithdrawModal';

import {
  apiFetchJobs,
  apiFetchTalent,
  apiLogin,
  apiRegister,
  apiDemoLogin,
  apiCreateJob,
  apiSubmitProposal
} from './api';

import {
  INITIAL_PROJECTS,
  INITIAL_TALENT,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('landing');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [freelancers, setFreelancers] = useState(INITIAL_TALENT);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('fh_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('fh_token') || null;
  });

  // Modal States
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login', role: 'freelancer' });
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [applyModalData, setApplyModalData] = useState({ isOpen: false, project: null });
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Fetch live jobs and talent on mount
  useEffect(() => {
    loadJobs();
    loadTalent();
  }, []);

  const loadJobs = async () => {
    try {
      const liveJobs = await apiFetchJobs();
      if (Array.isArray(liveJobs) && liveJobs.length > 0) {
        setProjects(liveJobs);
      }
    } catch (err) {
      console.log('Using default jobs list');
    }
  };

  const loadTalent = async () => {
    try {
      const liveTalent = await apiFetchTalent();
      if (Array.isArray(liveTalent) && liveTalent.length > 0) {
        setFreelancers(liveTalent);
      }
    } catch (err) {
      console.log('Using default talent list');
    }
  };

  // Auth Handlers
  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('fh_user', JSON.stringify(userData));
    localStorage.setItem('fh_token', userToken);
    setAuthModal({ isOpen: false, mode: 'login', role: userData.role || 'freelancer' });
    setDashboardRefreshKey(prev => prev + 1);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fh_user');
    localStorage.removeItem('fh_token');
    setActiveView('landing');
  };

  const openAuth = (mode = 'login', role = 'freelancer') => {
    setAuthModal({ isOpen: true, mode, role });
  };

  const handleDemoLogin = async (role) => {
    try {
      const res = await apiDemoLogin(role);
      handleAuthSuccess(res.user, res.token);
    } catch (err) {
      alert(`Demo login error: ${err.message}`);
    }
  };

  // Open Post Job Guard
  const handleOpenPostJob = () => {
    if (!user) {
      openAuth('login', 'client');
    } else if (user.role !== 'client') {
      alert('You are currently logged in as a Freelancer. Please switch to your Client account (e.g. Suyog) to post a job.');
      openAuth('login', 'client');
    } else {
      setShowPostJobModal(true);
    }
  };

  // Post Job Handler
  const handleCreateJob = async (jobData) => {
    if (!user) {
      openAuth('login', 'client');
      return;
    }
    if (user.role !== 'client') {
      alert('Only Clients can post jobs. Please switch to your Client account.');
      openAuth('login', 'client');
      return;
    }

    try {
      let created;
      if (token) {
        created = await apiCreateJob(jobData, token);
      } else {
        created = {
          ...jobData,
          _id: `proj-${Date.now()}`,
          client: {
            name: user.name || 'Verified Client',
            verified: true,
            rating: 5.0,
            spent: user.totalSpent || '$0 spent',
            location: user.location || 'India',
            avatar: user.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
          },
          budget: jobData.engagement === 'Hourly Rate' ? `$${jobData.budget} / hr` : `$${Number(jobData.budget).toLocaleString()}`,
          type: `${jobData.engagement} • Safe Payment`,
          proposalsCount: 0,
          deadline: '14 days remaining',
          badge: 'New Job',
          badgeType: 'creative',
          postedTime: 'Just now',
          status: 'open'
        };
      }

      // 1. Immediately update all projects state with new job at top
      setProjects(prev => [created, ...prev.filter(p => (p._id || p.id) !== (created._id || created.id))]);

      // 2. Re-fetch all jobs from backend to ensure full synchronization
      loadJobs();

      // 3. Trigger client dashboard refresh (updates myJobs count and lists)
      setDashboardRefreshKey(prev => prev + 1);

      setShowPostJobModal(false);
      alert('Your job has been posted successfully! It is now live in All Jobs and added to your Dashboard.');
      setActiveView('dashboard');
    } catch (err) {
      alert(`Could not post job: ${err.message}`);
      throw err;
    }
  };

  // Quick Apply Handler
  const handleApplyToJob = (project) => {
    if (!user) {
      openAuth('login', 'freelancer');
      return;
    }
    if (user.role === 'client') {
      alert('You are logged in as a Client. Only Freelancers can apply for jobs.');
      return;
    }
    setApplyModalData({ isOpen: true, project });
  };

  const handleSubmitProposal = async (proposalPayload) => {
    try {
      if (token) {
        await apiSubmitProposal(proposalPayload, token);
      }
      setApplyModalData({ isOpen: false, project: null });
      setDashboardRefreshKey(prev => prev + 1);
      alert('Application sent successfully! The client will review your offer.');
      setActiveView('dashboard');
    } catch (err) {
      alert(`Application error: ${err.message}`);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onOpenAuth={openAuth}
        onLogout={handleLogout}
        onOpenPostJob={handleOpenPostJob}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeView === 'landing' && (
          <LandingPage
            projects={projects}
            freelancers={freelancers}
            setActiveView={setActiveView}
            onOpenPostJob={handleOpenPostJob}
            onOpenApplyModal={handleApplyToJob}
            onOpenHireModal={() => handleOpenPostJob()}
            onOpenAuth={openAuth}
          />
        )}

        {activeView === 'browse-projects' && (
          <BrowseProjectsPage
            projects={projects}
            setProjects={setProjects}
            onOpenApplyModal={handleApplyToJob}
          />
        )}

        {activeView === 'find-talent' && (
          <FindTalentPage
            freelancers={freelancers}
            onOpenHireModal={() => handleOpenPostJob()}
            onOpenMessageDrawer={() => {}}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardPage
            user={user}
            token={token}
            projects={projects}
            setActiveView={setActiveView}
            onOpenAuth={openAuth}
            onOpenPostJob={handleOpenPostJob}
            onOpenApplyModal={handleApplyToJob}
            onOpenWithdrawModal={() => setShowWithdrawModal(true)}
            refreshKey={dashboardRefreshKey}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveView={setActiveView} />

      {/* Modals */}
      {authModal.isOpen && authModal.mode === 'login' && (
        <LoginModal
          initialRole={authModal.role}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
          onAuthSuccess={handleAuthSuccess}
          onLoginSuccess={handleAuthSuccess}
          onSwitchToRegister={(role) => setAuthModal({ isOpen: true, mode: 'register', role })}
          onDemoLogin={handleDemoLogin}
        />
      )}

      {authModal.isOpen && authModal.mode === 'register' && (
        <RegisterModal
          initialRole={authModal.role}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
          onAuthSuccess={handleAuthSuccess}
          onRegisterSuccess={handleAuthSuccess}
          onSwitchToLogin={(role) => setAuthModal({ isOpen: true, mode: 'login', role })}
        />
      )}

      {showPostJobModal && (
        <PostJobModal
          onClose={() => setShowPostJobModal(false)}
          onAddJob={handleCreateJob}
        />
      )}

      {applyModalData.isOpen && (
        <QuickApplyModal
          project={applyModalData.project}
          onClose={() => setApplyModalData({ isOpen: false, project: null })}
          onSubmitProposal={handleSubmitProposal}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          user={user}
          onClose={() => setShowWithdrawModal(false)}
          onSuccess={(amount) => {
            alert(`$${amount} transferred to your bank account successfully!`);
            setShowWithdrawModal(false);
          }}
        />
      )}
    </div>
  );
}
