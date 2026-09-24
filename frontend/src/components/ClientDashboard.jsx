import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileCheck,
  DollarSign,
  Building,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  ThumbsUp,
  XCircle,
  Check,
  LogOut,
  Eye
} from 'lucide-react';
import VerifyFreelancerModal from './VerifyFreelancerModal';
import {
  apiFetchMyJobs,
  apiFetchClientProposals,
  apiFetchMyContracts,
  apiAcceptProposal,
  apiRejectProposal,
  apiApproveContractPayment
} from '../api';

export default function ClientDashboard({
  user,
  token,
  onOpenPostJob,
  setActiveView,
  refreshKey,
  onLogout
}) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [myJobs, setMyJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [selectedProposalForVerify, setSelectedProposalForVerify] = useState(null);

  // Editable Company Profile State
  const [companyName, setCompanyName] = useState(user?.companyName || `${user.name} Tech Ventures`);
  const [contactName, setContactName] = useState(user.name || '');
  const [companyBio, setCompanyBio] = useState('We build quality products and hire verified freelance professionals.');
  const [profileSaved, setProfileSaved] = useState(false);

  const loadClientData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [fetchedJobs, fetchedProposals, fetchedContracts] = await Promise.all([
        apiFetchMyJobs(token),
        apiFetchClientProposals(token),
        apiFetchMyContracts(token)
      ]);
      setMyJobs(fetchedJobs || []);
      setProposals(fetchedProposals || []);
      setContracts(fetchedContracts || []);
    } catch (err) {
      console.error('Error loading client dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientData();
  }, [token, refreshKey]);

  // Handle Client Approving & Hiring a Freelancer
  const handleApproveProposal = async (proposalId) => {
    try {
      const result = await apiAcceptProposal(proposalId, token);
      setActionSuccessMsg(`Hired ${result.contract?.freelancerName || 'Specialist'}! Job has started and payment is safely deposited.`);
      setTimeout(() => setActionSuccessMsg(''), 4500);
      loadClientData();
    } catch (err) {
      alert(`Error hiring freelancer: ${err.message}`);
    }
  };

  // Handle Client Rejecting a Proposal
  const handleRejectProposal = async (proposalId) => {
    try {
      await apiRejectProposal(proposalId, token);
      loadClientData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle Client Releasing Payment after Reviewing Deliverables
  const handleApproveAndPay = async (contractId, freelancerName, amount) => {
    const confirmPayment = window.confirm(
      `Approve the work and send ${amount} to ${freelancerName}?`
    );
    if (!confirmPayment) return;

    try {
      const result = await apiApproveContractPayment(contractId, token);
      setActionSuccessMsg(`Payment of ${result.contract?.totalValue} successfully sent to ${freelancerName}! Job is marked finished.`);
      setTimeout(() => setActionSuccessMsg(''), 5000);
      loadClientData();
    } catch (err) {
      alert(`Payment error: ${err.message}`);
    }
  };

  const handleSaveCompanyProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const pendingReviewProposals = proposals.filter(p => p.status === 'Pending Review');
  const activeContracts = contracts.filter(c => c.status === 'active' || c.status === 'work_submitted');
  const submittedWorkContracts = contracts.filter(c => c.status === 'work_submitted');
  const completedContracts = contracts.filter(c => c.status === 'completed' || c.status === 'paid');

  const totalSpentStr = user?.totalSpent || '$0.00';

  return (
    <div className="dashboard-page bg-slate">
      <div className="dashboard-container">
        {/* CLIENT SIDEBAR */}
        <aside className="dashboard-sidebar card-box">
          <div className="dash-nav-list">
            <button
              className={`dash-nav-item ${activeNav === 'Dashboard' ? 'active' : ''}`}
              onClick={() => setActiveNav('Dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Jobs' ? 'active' : ''}`}
              onClick={() => setActiveNav('Jobs')}
            >
              <Briefcase size={18} />
              <span>My Posted Jobs</span>
              {myJobs.length > 0 && <span className="sidebar-count-chip">{myJobs.length}</span>}
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Proposals' ? 'active' : ''}`}
              onClick={() => setActiveNav('Proposals')}
            >
              <Users size={18} />
              <span>Review Applications</span>
              {pendingReviewProposals.length > 0 && (
                <span className="sidebar-count-chip highlight">{pendingReviewProposals.length}</span>
              )}
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Contracts' ? 'active' : ''}`}
              onClick={() => setActiveNav('Contracts')}
            >
              <FileCheck size={18} />
              <span>Jobs & Payments</span>
              {submittedWorkContracts.length > 0 && (
                <span className="sidebar-count-chip alert">{submittedWorkContracts.length}</span>
              )}
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Profile' ? 'active' : ''}`}
              onClick={() => setActiveNav('Profile')}
            >
              <Building size={18} />
              <span>Company Profile</span>
            </button>
            <button
              className="dash-nav-item signout-nav-item"
              style={{ color: '#ef4444', marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}
              onClick={onLogout}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="sidebar-user-mini" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={user.avatar} alt={user.name} className="user-mini-img" />
              <div>
                <strong>{user.name}</strong>
                <p className="verified-badge-text">✓ Client (Hiring)</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '6px', borderRadius: '6px' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#ef4444'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* CLIENT MAIN BODY */}
        <main className="dashboard-main">
          {actionSuccessMsg && (
            <div className="action-success-banner card-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#047857', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: CLIENT OVERVIEW */}
          {activeNav === 'Dashboard' && (
            <>
              {/* Welcome Header */}
              <div className="dash-welcome-card card-box">
                <div>
                  <div className="welcome-tag-row">
                    <span className="purple-dot-pill">● CLIENT PORTAL</span>
                    <span className="meta-shield">• {companyName}</span>
                  </div>
                  <h1 className="welcome-title">Welcome back, {user.name}! 💼</h1>
                  <p className="welcome-sub">
                    You have <strong>{pendingReviewProposals.length} freelancer application(s)</strong> waiting for your review, and <strong>{submittedWorkContracts.length} finished project(s) ready to check and pay</strong>.
                  </p>
                </div>
                <div className="welcome-action-btns">
                  <button className="btn-secondary" onClick={() => setActiveView('find-talent')}>
                    Find Freelancers
                  </button>
                  <button className="btn-primary" onClick={onOpenPostJob}>
                    <Plus size={16} />
                    <span>Post a New Job</span>
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="stats-cards-grid">
                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">TOTAL MONEY SPENT</span>
                    <span className="stat-icon-wrap blue"><DollarSign size={16} /></span>
                  </div>
                  <h2 className="stat-value">{totalSpentStr}</h2>
                  <div className="stat-sub-info">
                    <span className="text-green font-bold">100% Safe Payments</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">JOBS POSTED</span>
                    <span className="stat-icon-wrap purple"><Briefcase size={16} /></span>
                  </div>
                  <h2 className="stat-value">{myJobs.length} Jobs</h2>
                  <div className="stat-sub-info">
                    <span>{myJobs.filter(j => j.status === 'open').length} Open for Bids</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">APPLICATIONS RECEIVED</span>
                    <span className="stat-icon-wrap cyan"><Users size={16} /></span>
                  </div>
                  <h2 className="stat-value">{proposals.length} Applicants</h2>
                  <div className="stat-sub-info">
                    <span className="text-blue font-bold">{pendingReviewProposals.length} Waiting for Review</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">ACTIVE JOBS</span>
                    <span className="stat-icon-wrap green"><FileCheck size={16} /></span>
                  </div>
                  <h2 className="stat-value">{activeContracts.length} In Progress</h2>
                  <div className="stat-sub-info">
                    <span className="text-green">{completedContracts.length} Finished & Paid</span>
                  </div>
                </div>
              </div>

              {/* ACTION BANNER: FREELANCER SUBMITTED WORK */}
              {submittedWorkContracts.length > 0 && (
                <div className="alert-action-box card-box" style={{ background: '#fef3c7', borderColor: '#fde68a', padding: '24px', marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#92400e', marginBottom: '12px' }}>
                    <AlertCircle size={24} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                      Good News! Freelancer Submitted the Work
                    </h3>
                  </div>
                  <p style={{ color: '#78350f', fontSize: '0.95rem', marginBottom: '16px' }}>
                    The freelancer has completed the task. Please check the work link below, and click 'Approve Work & Pay' to send them their payment.
                  </p>

                  <div className="deliverable-cards-list">
                    {submittedWorkContracts.map(c => (
                      <div key={c._id || c.id} className="deliverable-card card-box" style={{ background: 'white', padding: '20px' }}>
                        <div className="deliv-card-header">
                          <div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{c.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                              Freelancer: <strong>{c.freelancerName || 'Specialist'}</strong> • Price: <strong className="text-green">{c.totalValue}</strong>
                            </p>
                          </div>
                          <span className="status-pill pill-offer-extended">Ready for Your Review</span>
                        </div>

                        {c.deliverables?.link && (
                          <div style={{ margin: '12px 0', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>WORK LINK / FILES:</span>
                            <p style={{ margin: '4px 0 0' }}>
                              <a href={c.deliverables.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
                                {c.deliverables.link} <ExternalLink size={14} style={{ display: 'inline' }} />
                              </a>
                            </p>
                          </div>
                        )}

                        {c.deliverables?.notes && (
                          <div style={{ margin: '8px 0', fontSize: '0.9rem', color: '#334155' }}>
                            <strong>Freelancer Notes:</strong> <em>{c.deliverables.notes}</em>
                          </div>
                        )}

                        <div className="deliv-footer" style={{ marginTop: '16px' }}>
                          <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.85rem' }}>✓ Payment is safe and ready to send</span>
                          <button
                            className="btn-primary"
                            style={{ background: '#059669' }}
                            onClick={() => handleApproveAndPay(c._id || c.id, c.freelancerName || 'Specialist', c.totalValue)}
                          >
                            <ShieldCheck size={16} />
                            <span>Approve Work & Pay ({c.totalValue})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECENT APPLICATIONS PREVIEW */}
              {pendingReviewProposals.length > 0 && (
                <div className="deliverables-section" style={{ marginTop: '24px' }}>
                  <div className="section-title-row">
                    <h3><Users size={20} className="text-blue" /> Recent Applications</h3>
                    <button className="view-all-link" onClick={() => setActiveNav('Proposals')}>
                      View all ({pendingReviewProposals.length}) →
                    </button>
                  </div>

                  <div className="deliverable-cards-list">
                    {pendingReviewProposals.slice(0, 3).map(prop => (
                      <div key={prop._id || prop.id} className="deliverable-card card-box">
                        <div className="deliv-card-header">
                          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                            <img
                              src={prop.freelancerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                              alt={prop.freelancerName}
                              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{prop.freelancerName || 'Specialist'}</h4>
                              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Applied for: <strong>{prop.role}</strong></p>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className="escrow-lbl">THEIR PRICE</span>
                            <h4 className="escrow-val text-blue">{prop.bidAmount}</h4>
                          </div>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: '#475569', margin: '12px 0', lineHeight: 1.5 }}>
                          "{prop.coverLetter}"
                        </p>

                        <div className="deliv-footer">
                          <div className="deliv-meta-left">
                            <span>⏱ Time: {prop.estTime || '14 Days'}</span>
                            <span>• Sent: {prop.submittedDate || 'Today'}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              className="btn-secondary btn-sm"
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderColor: '#93c5fd', color: '#1d4ed8' }}
                              onClick={() => setSelectedProposalForVerify(prop)}
                            >
                              <Eye size={14} />
                              <span>Verify Profile & Work</span>
                            </button>
                            <button
                              className="btn-secondary btn-sm"
                              onClick={() => handleRejectProposal(prop._id || prop.id)}
                            >
                              Decline
                            </button>
                            <button
                              className="btn-primary btn-sm"
                              onClick={() => handleApproveProposal(prop._id || prop.id)}
                            >
                              <ThumbsUp size={14} />
                              <span>Hire Freelancer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MY POSTED JOBS PREVIEW */}
              {myJobs.length > 0 && (
                <div className="deliverables-section" style={{ marginTop: '24px' }}>
                  <div className="section-title-row">
                    <h3><Briefcase size={20} className="text-purple" /> My Posted Jobs ({myJobs.length})</h3>
                    <button className="view-all-link" onClick={() => setActiveNav('Jobs')}>
                      View all jobs →
                    </button>
                  </div>

                  <div className="deliverable-cards-list">
                    {myJobs.slice(0, 3).map(job => (
                      <div key={job._id || job.id} className="deliverable-card card-box" style={{ padding: '20px' }}>
                        <div className="deliv-card-header">
                          <div>
                            <div className="deliv-title-row">
                              <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{job.title}</h4>
                              <span className="category-chip">{job.category}</span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Budget: <strong className="text-blue">{job.budget}</strong> • {job.type || job.engagement}</p>
                          </div>
                          <span className={`status-pill pill-${job.status === 'completed' ? 'offer-extended' : (job.status === 'in_progress' ? 'interviewing' : 'pending-review')}`}>
                            {job.status === 'in_progress' ? 'In Progress' : (job.status === 'completed' ? 'Completed' : 'Open for Bids')}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: '#475569', margin: '10px 0' }}>{job.description}</p>

                        <div className="deliv-footer">
                          <div className="deliv-meta-left">
                            <span>👥 {job.proposalsCount || 0} People Applied</span>
                            <span>• Posted: {job.postedTime || 'Recently'}</span>
                          </div>
                          <button
                            className="btn-secondary btn-sm"
                            onClick={() => setActiveNav('Jobs')}
                          >
                            Manage Job →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: POSTED JOBS */}
          {activeNav === 'Jobs' && (
            <div className="tab-contracts-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">MY JOBS</span>
                  <h1 className="welcome-title">My Posted Jobs</h1>
                  <p className="welcome-sub">Check your open jobs and see how many freelancers applied.</p>
                </div>
                <button className="btn-primary" onClick={onOpenPostJob}>
                  <Plus size={16} />
                  <span>Post Another Job</span>
                </button>
              </div>

              {myJobs.length === 0 ? (
                <div className="card-box empty-state-box">
                  <Briefcase size={48} className="text-slate-400" />
                  <h3>No Jobs Posted Yet</h3>
                  <p>Post your first job now to get applications from top freelancers.</p>
                  <button className="btn-primary" style={{ marginTop: '12px' }} onClick={onOpenPostJob}>
                    Post a Job Now
                  </button>
                </div>
              ) : (
                <div className="deliverable-cards-list">
                  {myJobs.map(job => (
                    <div key={job._id || job.id} className="deliverable-card card-box" style={{ padding: '24px' }}>
                      <div className="deliv-card-header">
                        <div>
                          <div className="deliv-title-row">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{job.title}</h3>
                            <span className="category-chip">{job.category}</span>
                          </div>
                          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Budget: <strong>{job.budget}</strong></p>
                        </div>
                        <span className={`status-pill pill-${job.status === 'completed' ? 'offer-extended' : (job.status === 'in_progress' ? 'interviewing' : 'pending-review')}`}>
                          {job.status === 'in_progress' ? 'In Progress' : (job.status === 'completed' ? 'Completed' : 'Open for Bids')}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.9rem', color: '#475569', margin: '12px 0' }}>{job.description}</p>

                      <div className="deliv-footer">
                        <div className="deliv-meta-left">
                          <span>👥 {job.proposalsCount || 0} People Applied</span>
                        </div>
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => setActiveNav('Proposals')}
                        >
                          View Applications →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROPOSALS REVIEW */}
          {activeNav === 'Proposals' && (
            <div className="tab-proposals-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">APPLICANTS</span>
                  <h1 className="welcome-title">Review Freelancer Applications</h1>
                  <p className="welcome-sub">Read messages and prices from freelancers, then click Hire to start the job.</p>
                </div>
                <button className="btn-primary" onClick={onOpenPostJob}>
                  Post Another Job
                </button>
              </div>

              {proposals.length === 0 ? (
                <div className="card-box empty-state-box">
                  <Users size={48} className="text-slate-400" />
                  <h3>No Applications Received Yet</h3>
                  <p>When freelancers apply for your jobs, their details and offers will appear here.</p>
                </div>
              ) : (
                <div className="deliverable-cards-list">
                  {proposals.map(prop => (
                    <div key={prop._id || prop.id} className="deliverable-card card-box" style={{ padding: '24px' }}>
                      <div className="deliv-card-header">
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                          <img
                            src={prop.freelancerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={prop.freelancerName}
                            style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{prop.freelancerName || 'Specialist'}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                              Title: <strong>{prop.freelancerTitle || 'Specialist'}</strong> • For Job: <strong>{prop.role}</strong>
                            </p>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="escrow-lbl">THEIR PRICE</span>
                          <h4 className="escrow-val text-blue" style={{ fontSize: '1.4rem' }}>{prop.bidAmount}</h4>
                        </div>
                      </div>

                      <div style={{ margin: '14px 0', padding: '14px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>FREELANCER MESSAGE:</span>
                        <p style={{ fontSize: '0.95rem', color: '#334155', marginTop: '6px', lineHeight: 1.6 }}>{prop.coverLetter}</p>
                      </div>

                      <div className="deliv-footer">
                        <div className="deliv-meta-left">
                          <span>⏱ Estimated Time: <strong>{prop.estTime || '14 Days'}</strong></span>
                        </div>

                        {prop.status === 'Pending Review' ? (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              className="btn-secondary"
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderColor: '#93c5fd', color: '#1d4ed8' }}
                              onClick={() => setSelectedProposalForVerify(prop)}
                            >
                              <Eye size={16} />
                              <span>Verify Profile & Work</span>
                            </button>
                            <button
                              className="btn-secondary"
                              onClick={() => handleRejectProposal(prop._id || prop.id)}
                            >
                              Decline
                            </button>
                            <button
                              className="btn-primary"
                              onClick={() => handleApproveProposal(prop._id || prop.id)}
                            >
                              <ThumbsUp size={16} />
                              <span>Hire Freelancer</span>
                            </button>
                          </div>
                        ) : prop.status === 'Accepted' ? (
                          <span className="growth-text text-green font-bold">✓ Hired & Working</span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>Declined</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTRACTS & PAYMENTS */}
          {activeNav === 'Contracts' && (
            <div className="tab-contracts-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">JOBS & PAYMENTS</span>
                  <h1 className="welcome-title">Active Jobs & Payments</h1>
                  <p className="welcome-sub">Check work in progress and approve payments when tasks are finished.</p>
                </div>
              </div>

              {contracts.length === 0 ? (
                <div className="card-box empty-state-box">
                  <FileCheck size={48} className="text-slate-400" />
                  <h3>No Active Jobs</h3>
                  <p>When you hire a freelancer, their job and payment details will appear here.</p>
                </div>
              ) : (
                <div className="deliverable-cards-list">
                  {contracts.map(c => (
                    <div key={c._id || c.id} className="deliverable-card card-box" style={{ padding: '24px' }}>
                      <div className="deliv-card-header">
                        <div>
                          <div className="deliv-title-row">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{c.title}</h3>
                          </div>
                          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                            Freelancer: <strong>{c.freelancerName || 'Specialist'}</strong> • Total Price: <strong className="text-blue">{c.totalValue}</strong>
                          </p>
                        </div>
                        <span className={`status-pill pill-${c.status === 'completed' ? 'offer-extended' : (c.status === 'work_submitted' ? 'interviewing' : 'pending-review')}`}>
                          {c.status === 'work_submitted' ? 'Work Ready for Review' : (c.status === 'completed' ? 'Finished & Paid' : 'In Progress')}
                        </span>
                      </div>

                      {c.status === 'work_submitted' && (
                        <div className="submitted-banner card-box" style={{ background: '#fef3c7', borderColor: '#fde68a', padding: '16px', margin: '14px 0' }}>
                          <h4 style={{ color: '#92400e', marginBottom: '8px' }}>Freelancer Submitted Finished Work</h4>
                          {c.deliverables?.link && (
                            <p style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                              Work Link: <a href={c.deliverables.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>{c.deliverables.link}</a>
                            </p>
                          )}
                          {c.deliverables?.notes && (
                            <p style={{ fontSize: '0.85rem', color: '#451a03' }}>
                              <strong>Notes:</strong> {c.deliverables.notes}
                            </p>
                          )}
                        </div>
                      )}

                      {c.status === 'completed' && (
                        <div className="status-banner success" style={{ background: '#ecfdf5', color: '#047857', padding: '12px 16px', borderRadius: '8px', margin: '12px 0', fontWeight: 700 }}>
                          ✓ Payment of {c.totalValue} was sent to the freelancer on {c.paidAt ? new Date(c.paidAt).toLocaleDateString() : 'Recent'}.
                        </div>
                      )}

                      <div className="deliv-footer" style={{ marginTop: '16px' }}>
                        <div className="deliv-meta-left">
                          <span>Status: <strong>{c.status === 'completed' ? 'Paid' : (c.status === 'work_submitted' ? 'Ready to Review' : 'Working')}</strong></span>
                        </div>

                        {c.status === 'work_submitted' && (
                          <button
                            className="btn-primary"
                            style={{ background: '#059669' }}
                            onClick={() => handleApproveAndPay(c._id || c.id, c.freelancerName || 'Specialist', c.totalValue)}
                          >
                            <ShieldCheck size={16} />
                            <span>Approve Work & Pay ({c.totalValue})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: COMPANY PROFILE */}
          {activeNav === 'Profile' && (
            <div className="tab-profile-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">COMPANY DETAILS</span>
                  <h1 className="welcome-title">Edit Company Profile</h1>
                  <p className="welcome-sub">Manage your company name and contact info.</p>
                </div>
                {profileSaved && (
                  <span className="growth-text text-green" style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                    ✓ Changes Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveCompanyProfile} className="card-box" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{companyName} <span className="verified-check">✓</span></h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Client: {user.name} • {user.email}</p>
                  </div>
                </div>

                <div className="form-row" style={{ marginBottom: '16px' }}>
                  <div className="form-group flex-1">
                    <label>Company or Business Name *</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>About Company</label>
                  <textarea
                    rows="3"
                    value={companyBio}
                    onChange={(e) => setCompanyBio(e.target.value)}
                  ></textarea>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <button type="submit" className="btn-primary">
                    <Check size={16} /> Save Company Details
                  </button>
                </div>
              </form>

              {/* DEDICATED SIGN OUT SECTION IN PROFILE */}
              <div className="card-box" style={{ marginTop: '24px', padding: '24px', background: '#fff1f2', borderColor: '#fecdd3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h4 style={{ color: '#9f1239', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 4px' }}>Sign Out of Your Account</h4>
                  <p style={{ color: '#be123c', fontSize: '0.85rem', margin: 0 }}>End your active session securely on this device.</p>
                </div>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ color: '#e11d48', borderColor: '#fda4af', background: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
                  onClick={onLogout}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* VERIFY FREELANCER PROFILE & PAST WORK MODAL */}
      {selectedProposalForVerify && (
        <VerifyFreelancerModal
          proposal={selectedProposalForVerify}
          onClose={() => setSelectedProposalForVerify(null)}
          onAccept={(proposalId) => handleApproveProposal(proposalId)}
          onReject={(proposalId) => handleRejectProposal(proposalId)}
        />
      )}
    </div>
  );
}
