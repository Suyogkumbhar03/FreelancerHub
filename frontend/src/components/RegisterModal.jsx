import React, { useState } from 'react';
import { UserCheck, Lock, Mail, User, Briefcase, Building, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { apiRegister } from '../api';

export default function RegisterModal({
  initialRole = 'freelancer',
  onClose,
  onSwitchToLogin,
  onAuthSuccess,
  onRegisterSuccess
}) {
  const handleSuccess = onAuthSuccess || onRegisterSuccess;
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRegister({
        name,
        email,
        password,
        role,
        companyName: role === 'client' ? companyName : undefined,
        title: role === 'freelancer' ? title : undefined
      });
      if (typeof handleSuccess === 'function') {
        handleSuccess(data.user, data.token);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Could not create account. Please try with a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">FREE SIGN UP</span>
            <h2>Create Your Account</h2>
            <p className="modal-sub-title">Join to work on projects or hire great talent safely.</p>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Role Selector */}
        <div className="auth-role-tabs card-box" style={{ marginBottom: '18px' }}>
          <button
            type="button"
            className={`role-tab-btn ${role === 'freelancer' ? 'active' : ''}`}
            onClick={() => setRole('freelancer')}
          >
            <Briefcase size={20} />
            <div>
              <strong>I am a Freelancer</strong>
              <p>I want to work and earn money</p>
            </div>
          </button>

          <button
            type="button"
            className={`role-tab-btn ${role === 'client' ? 'active' : ''}`}
            onClick={() => setRole('client')}
          >
            <UserCheck size={20} />
            <div>
              <strong>I am a Client</strong>
              <p>I want to hire freelancers</p>
            </div>
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Your Full Name *</label>
            <div className="input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder={role === 'freelancer' ? 'e.g. Pratik Sharma' : 'e.g. Suyog Kumbhar'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {role === 'client' && (
            <div className="form-group">
              <label>Company or Business Name *</label>
              <div className="input-icon-wrapper">
                <Building size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Suyog Tech Ventures"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {role === 'freelancer' && (
            <div className="form-group">
              <label>Your Main Skill or Title *</label>
              <div className="input-icon-wrapper">
                <Briefcase size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Web Developer, Graphic Designer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address *</label>
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
            <p>100% free registration. Your details and payments are always safe.</p>
          </div>

          <div className="modal-footer justify-between">
            <button
              type="button"
              className="toggle-auth-link"
              onClick={() => onSwitchToLogin(role)}
            >
              Already have an account? <strong>Log In Here</strong>
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              <span>{loading ? 'Creating Account...' : `Sign Up as ${role === 'freelancer' ? 'Freelancer' : 'Client'}`}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
