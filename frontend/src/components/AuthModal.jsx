import React, { useState } from 'react';
import { UserCheck, Lock, Mail, User, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import { apiLogin, apiRegister } from '../api';

export default function AuthModal({ initialMode = 'login', initialRole = 'freelancer', onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isRegister) {
        data = await apiRegister(name, email, password, role);
      } else {
        data = await apiLogin(email, password);
      }

      onAuthSuccess(data.user, data.token);
      alert(`${isRegister ? 'Account Created' : 'Welcome Back'}! Logged in as ${data.user.name} (${data.user.role === 'freelancer' ? 'Freelancer' : 'Client'}).`);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">SECURE ACCOUNT ACCESS</span>
            <h2>{isRegister ? 'Create FreelanceHub Account' : 'Welcome Back to FreelanceHub'}</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Role Selector Tabs (Find Work vs Find Talent) */}
        <div className="auth-role-tabs card-box">
          <button
            type="button"
            className={`role-tab-btn ${role === 'freelancer' ? 'active' : ''}`}
            onClick={() => setRole('freelancer')}
          >
            <Briefcase size={18} />
            <div>
              <strong>I am a Freelancer</strong>
              <p>Looking for Work & Proposals</p>
            </div>
          </button>

          <button
            type="button"
            className={`role-tab-btn ${role === 'client' ? 'active' : ''}`}
            onClick={() => setRole('client')}
          >
            <UserCheck size={18} />
            <div>
              <strong>I am a Client / Lead</strong>
              <p>Looking to Hire Vetted Talent</p>
            </div>
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {isRegister && (
            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-icon-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Work Email Address *</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="escrow-notice-banner">
            <ShieldCheck size={18} className="text-blue" />
            <p>Protected by 100% Escrow Shield and JWT Authentication.</p>
          </div>

          <div className="modal-footer justify-between">
            <button
              type="button"
              className="toggle-auth-link"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Already have an account? Log In' : "Don't have an account? Register"}
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Log In Now'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
