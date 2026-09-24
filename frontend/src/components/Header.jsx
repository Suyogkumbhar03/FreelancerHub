import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Plus, LogOut, User, Sparkles } from 'lucide-react';
import NotificationsPopover from './NotificationsPopover';
import MessagesDrawer from './MessagesDrawer';

export default function Header({
  activeView,
  setActiveView,
  user,
  onOpenAuth,
  onLogout,
  onOpenPostJob,
  notifications,
  setNotifications
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('browse-projects');
    }
  };

  const handleDashboardClick = () => {
    if (!user) {
      onOpenAuth('login', 'freelancer');
    } else {
      setActiveView('dashboard');
    }
  };

  return (
    <header className="header-bar">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-left">
          <div className="logo-brand" onClick={() => setActiveView('landing')}>
            <div className="logo-icon">
              <span className="logo-f">F</span>
            </div>
            <span className="logo-text">FreelanceHub</span>
          </div>

          {/* Search bar */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search projects, skills, talent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
          </form>
        </div>

        {/* Center / Right Nav Links */}
        <nav className="header-nav">
          <button
            className={`nav-link ${activeView === 'browse-projects' ? 'active' : ''}`}
            onClick={() => setActiveView('browse-projects')}
          >
            Find Work
          </button>
          <button
            className={`nav-link ${activeView === 'find-talent' ? 'active' : ''}`}
            onClick={() => setActiveView('find-talent')}
          >
            Find Talent
          </button>
          <button
            className={`nav-link ${activeView === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveView('landing')}
          >
            Enterprise
          </button>
          <button
            className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={handleDashboardClick}
          >
            {user?.role === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="header-right">
          {/* Notifications Icon */}
          <div className="popover-wrapper">
            <button
              className="icon-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfileMenu(false);
              }}
              title="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            {showNotifications && (
              <NotificationsPopover
                notifications={notifications}
                setNotifications={setNotifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Messages Icon */}
          <div className="popover-wrapper">
            <button
              className="icon-btn"
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              title="Messages"
            >
              <MessageSquare size={20} />
            </button>
            {showMessages && (
              <MessagesDrawer onClose={() => setShowMessages(false)} />
            )}
          </div>

          {/* Post a Job button (Client or Guest) */}
          <button className="btn-primary post-job-btn" onClick={onOpenPostJob}>
            <Plus size={16} />
            <span>Post a Job</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="popover-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`header-role-badge ${user.role === 'client' ? 'client' : 'freelancer'}`}>
                {user.role === 'client' ? 'Client' : 'Freelancer'}
              </span>

              <div
                className="user-profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              </div>

              {showProfileMenu && (
                <div className="popover-panel profile-menu-popover">
                  <div className="profile-menu-header">
                    <strong>{user.name}</strong>
                    <span className={`role-badge-pill role-${user.role}`}>
                      {user.role === 'freelancer' ? 'Verified Freelancer' : 'Verified Client'}
                    </span>
                    <p className="user-email-text">{user.email}</p>
                    {user.role === 'client' && user.companyName && (
                      <p style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>{user.companyName}</p>
                    )}
                    {user.role === 'freelancer' && user.totalEarned && (
                      <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Earned: {user.totalEarned}</p>
                    )}
                  </div>
                  <div className="profile-menu-links">
                    <button onClick={() => { setActiveView('dashboard'); setShowProfileMenu(false); }}>
                      <User size={16} /> {user.role === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}
                    </button>
                    <button onClick={() => { onOpenAuth('login', user.role === 'client' ? 'freelancer' : 'client'); setShowProfileMenu(false); }}>
                      <Sparkles size={16} /> Switch Account Role
                    </button>
                    <button className="text-red" onClick={() => { onLogout(); setShowProfileMenu(false); }}>
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns-row">
              <button className="btn-secondary btn-sm" onClick={() => onOpenAuth('login', 'freelancer')}>
                Log In
              </button>
              <button className="btn-primary btn-sm" onClick={() => onOpenAuth('register', 'client')}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
