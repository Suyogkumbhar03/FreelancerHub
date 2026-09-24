import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Send,
  DollarSign,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  UploadCloud,
  Briefcase,
  Plus,
  Trash2,
  Check,
  LogOut
} from 'lucide-react';
import SubmitWorkModal from './SubmitWorkModal';
import { apiFetchMyProposals, apiFetchMyContracts } from '../api';

export default function FreelancerDashboard({
  user,
  token,
  projects = [],
  setActiveView,
  onOpenApplyModal,
  onOpenWithdrawModal,
  onLogout
}) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proposalTab, setProposalTab] = useState('All');
  const [selectedContractForSubmit, setSelectedContractForSubmit] = useState(null);

  // Editable Profile State
  const [profileTitle, setProfileTitle] = useState(user?.title || 'Web & App Developer');
  const [profileRate, setProfileRate] = useState(user?.hourlyRate || 50);
  const [profileBio, setProfileBio] = useState(user?.bio || 'I build easy-to-use websites and apps for clients worldwide.');
  const [profileSkills, setProfileSkills] = useState(user?.skills?.length ? user.skills : ['React', 'Node.js', 'Next.js', 'Web Development']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Fetch proposals and contracts for this freelancer
  const loadFreelancerData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [fetchedProps, fetchedContracts] = await Promise.all([
        apiFetchMyProposals(token),
        apiFetchMyContracts(token)
      ]);
      setProposals(fetchedProps || []);
      setContracts(fetchedContracts || []);
    } catch (err) {
      console.error('Error loading freelancer dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFreelancerData();
  }, [token]);

  const handleWorkSubmitted = (updatedContract) => {
    setContracts(prev =>
      prev.map(c => ((c._id === updatedContract._id || c.id === updatedContract._id) ? updatedContract : c))
    );
    loadFreelancerData();
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!profileSkills.includes(newSkillInput.trim())) {
      setProfileSkills([...profileSkills, newSkillInput.trim()]);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileSkills(profileSkills.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const activeContracts = contracts.filter(c => c.status === 'active' || c.status === 'work_submitted');
  const completedContracts = contracts.filter(c => c.status === 'completed' || c.status === 'paid');

  const inEscrowNum = activeContracts.reduce((sum, c) => {
    const val = Number(String(c.escrowProtected || c.totalValue || '0').replace(/[^0-9.]/g, '')) || 0;
    return sum + val;
  }, 0);

  const totalEarnedStr = user?.totalEarned || '$0.00';
  const isNewFreelancer = proposals.length === 0 && contracts.length === 0;

  const filteredProposals = proposals.filter(p => {
    if (proposalTab === 'All') return true;
    return p.status === proposalTab;
  });

  return (
    <div className="dashboard-page bg-slate">
      <div className="dashboard-container">
        {/* FREELANCER SIDEBAR */}
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
              className={`dash-nav-item ${activeNav === 'Contracts' ? 'active' : ''}`}
              onClick={() => setActiveNav('Contracts')}
            >
              <FileText size={18} />
              <span>My Active Jobs</span>
              {activeContracts.length > 0 && (
                <span className="sidebar-count-chip">{activeContracts.length}</span>
              )}
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Proposals' ? 'active' : ''}`}
              onClick={() => setActiveNav('Proposals')}
            >
              <Send size={18} />
              <span>Job Applications</span>
              {proposals.length > 0 && (
                <span className="sidebar-count-chip">{proposals.length}</span>
              )}
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Earnings' ? 'active' : ''}`}
              onClick={() => setActiveNav('Earnings')}
            >
              <DollarSign size={18} />
              <span>My Earnings & Wallet</span>
            </button>
            <button
              className={`dash-nav-item ${activeNav === 'Profile' ? 'active' : ''}`}
              onClick={() => setActiveNav('Profile')}
            >
              <UserCheck size={18} />
              <span>My Profile</span>
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
                <p className="verified-badge-text">✓ Freelancer</p>
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

        {/* FREELANCER MAIN BODY */}
        <main className="dashboard-main">
          {/* TAB 1: OVERVIEW */}
          {activeNav === 'Dashboard' && (
            <>
              {/* Welcome Header */}
              <div className="dash-welcome-card card-box">
                <div>
                  <div className="welcome-tag-row">
                    <span className="purple-dot-pill">● FREELANCER PORTAL</span>
                    <span className="meta-shield">• 🛡 Safe Payments Protected</span>
                  </div>
                  <h1 className="welcome-title">Welcome back, {user.name}! 🚀</h1>
                  <p className="welcome-sub">
                    {isNewFreelancer
                      ? 'Your account is ready! Browse available jobs below, send your price, and start working safely.'
                      : `You have ${activeContracts.length} job(s) in progress and ${proposals.length} job application(s) sent.`}
                  </p>
                </div>
                <div className="welcome-action-btns">
                  <button className="btn-secondary" onClick={() => setActiveView('browse-projects')}>
                    Browse All Jobs
                  </button>
                  <button className="btn-primary" onClick={onOpenWithdrawModal}>
                    <DollarSign size={16} />
                    <span>Withdraw Money ({totalEarnedStr})</span>
                  </button>
                </div>
              </div>

              {/* Top 4 Stat Cards */}
              <div className="stats-cards-grid">
                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">TOTAL EARNED</span>
                    <span className="stat-icon-wrap blue"><DollarSign size={16} /></span>
                  </div>
                  <h2 className="stat-value">{totalEarnedStr}</h2>
                  <div className="stat-sub-info">
                    <span className="text-green font-bold">100% Safe</span>
                    <span className="sub-detail">• Available in your wallet</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">MONEY HELD SAFELY</span>
                    <span className="stat-icon-wrap purple"><ShieldCheck size={16} /></span>
                  </div>
                  <h2 className="stat-value text-purple">${inEscrowNum.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                  <div className="stat-sub-info">
                    <span>{activeContracts.length} Job(s) in progress</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">ACTIVE JOBS</span>
                    <span className="stat-icon-wrap cyan"><FileText size={16} /></span>
                  </div>
                  <h2 className="stat-value">{activeContracts.length} Doing Work</h2>
                  <div className="stat-sub-info">
                    <span className="text-blue">{completedContracts.length} Completed</span>
                  </div>
                </div>

                <div className="stat-metric-card card-box">
                  <div className="stat-card-top">
                    <span className="stat-label">APPLICATIONS SENT</span>
                    <span className="stat-icon-wrap green"><Send size={16} /></span>
                  </div>
                  <h2 className="stat-value">{proposals.length} Sent</h2>
                  <div className="proposal-badges-row">
                    <span className="prop-badge review">
                      {proposals.filter(p => p.status === 'Pending Review').length} Waiting
                    </span>
                    <span className="prop-badge interview">
                      {proposals.filter(p => p.status === 'Accepted').length} Hired
                    </span>
                  </div>
                </div>
              </div>

              {/* 4-STEP HOW IT WORKS CARD */}
              <div className="workflow-stepper-card card-box">
                <div className="stepper-header">
                  <span className="live-tag">HOW IT WORKS</span>
                  <h3>4 Simple Steps to Get Work and Get Paid</h3>
                </div>
                <div className="lifecycle-steps-grid">
                  <div className={`lifecycle-step-item ${proposals.length === 0 ? 'current' : 'done'}`}>
                    <div className="step-num-bubble">1</div>
                    <div className="step-details">
                      <strong>1. Apply for Jobs</strong>
                      <p>Pick a job you like, enter your price, and message the client.</p>
                    </div>
                  </div>
                  <div className={`lifecycle-step-item ${proposals.length > 0 && activeContracts.length === 0 ? 'current' : (activeContracts.length > 0 ? 'done' : '')}`}>
                    <div className="step-num-bubble">2</div>
                    <div className="step-details">
                      <strong>2. Client Hires You</strong>
                      <p>The client accepts your application and safely deposits payment.</p>
                    </div>
                  </div>
                  <div className={`lifecycle-step-item ${activeContracts.some(c => c.status === 'active') ? 'current' : (activeContracts.some(c => c.status === 'work_submitted') || completedContracts.length > 0 ? 'done' : '')}`}>
                    <div className="step-num-bubble">3</div>
                    <div className="step-details">
                      <strong>3. Do the Work & Send It</strong>
                      <p>Complete the task and click 'Submit Work' to send it for review.</p>
                    </div>
                  </div>
                  <div className={`lifecycle-step-item ${completedContracts.length > 0 ? 'done' : ''}`}>
                    <div className="step-num-bubble">4</div>
                    <div className="step-details">
                      <strong>4. Get Paid Immediately</strong>
                      <p>The client checks your work, approves it, and pays your wallet.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVE JOBS IN PROGRESS */}
              {activeContracts.length > 0 && (
                <div className="deliverables-section" style={{ marginTop: '24px' }}>
                  <div className="section-title-row">
                    <h3><ShieldCheck size={20} className="text-blue" /> Current Work</h3>
                    <button className="view-all-link" onClick={() => setActiveNav('Contracts')}>
                      View all ({activeContracts.length}) →
                    </button>
                  </div>
                  <div className="deliverable-cards-list">
                    {activeContracts.map(contract => (
                      <div key={contract._id || contract.id} className="deliverable-card card-box">
                        <div className="deliv-card-header">
                          <div>
                            <div className="deliv-title-row">
                              <h3>{contract.title}</h3>
                              <span className="milestone-chip">Active Job</span>
                            </div>
                            <p className="deliv-client">Client: <strong>{typeof contract.client === 'object' ? (contract.client?.company || contract.client?.name || 'Verified Client') : (contract.client || 'Verified Client')}</strong> • Payment: <strong>{contract.totalValue || contract.amount}</strong></p>
                          </div>
                          <div className="escrow-locked-box">
                            <span className="escrow-lbl">PAYMENT PROTECTED</span>
                            <h4 className="escrow-val">{contract.escrowProtected || contract.totalValue || contract.amount}</h4>
                          </div>
                        </div>

                        {contract.status === 'work_submitted' ? (
                          <div className="submitted-banner card-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', padding: '16px', margin: '14px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 700, marginBottom: '6px' }}>
                              <CheckCircle2 size={18} />
                              <span>Work Submitted! Waiting for client to review and pay.</span>
                            </div>
                            {contract.deliverables?.link && (
                              <p style={{ fontSize: '0.85rem', color: '#065f46' }}>
                                Work Link: <a href={contract.deliverables.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>{contract.deliverables.link}</a>
                              </p>
                            )}
                            {contract.deliverables?.notes && (
                              <p style={{ fontSize: '0.85rem', color: '#374151', marginTop: '4px' }}>
                                Your Notes: <em>{contract.deliverables.notes}</em>
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="deliv-footer" style={{ marginTop: '16px' }}>
                            <div className="deliv-meta-left">
                              <span>⏰ {contract.dueDate || 'Due soon'}</span>
                              <span>• In Progress</span>
                            </div>
                            <button
                              className="btn-primary"
                              onClick={() => setSelectedContractForSubmit(contract)}
                            >
                              <UploadCloud size={16} />
                              <span>Submit Work to Client</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECOMMENDED JOBS TO APPLY */}
              <div className="recommended-projects-card card-box" style={{ marginTop: '24px' }}>
                <div className="section-title-row">
                  <div>
                    <span className="live-tag">JOBS FOR YOU</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>Recommended Jobs to Apply</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Choose any project and click Apply Now to send your offer.</p>
                  </div>
                  <button className="btn-secondary btn-sm" onClick={() => setActiveView('browse-projects')}>
                    See All Jobs →
                  </button>
                </div>

                <div className="dash-jobs-grid" style={{ marginTop: '16px' }}>
                  {projects.slice(0, 3).map(job => (
                    <div key={job._id || job.id} className="dash-job-card card-box">
                      <div className="job-card-header">
                        <span className="category-chip">{job.category}</span>
                        <span className="job-budget-badge">{job.budget}</span>
                      </div>
                      <h4 className="job-title-link" onClick={() => onOpenApplyModal(job)}>{job.title}</h4>
                      <p className="job-desc-snippet">{job.description?.slice(0, 100)}...</p>
                      <div className="job-tags-row">
                        {job.tags?.slice(0, 3).map(t => (
                          <span key={t} className="skill-chip-sm">{t}</span>
                        ))}
                      </div>
                      <div className="job-card-footer">
                        <span className="client-name-text">By: {job.client?.name || 'Verified Client'}</span>
                        <button
                          className="btn-primary btn-sm"
                          onClick={() => onOpenApplyModal(job)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ACTIVE JOBS */}
          {activeNav === 'Contracts' && (
            <div className="tab-contracts-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">MY ACTIVE WORK</span>
                  <h1 className="welcome-title">Active Jobs & Finished Work</h1>
                  <p className="welcome-sub">Work on your projects, send completed files to your client, and get paid.</p>
                </div>
                <button className="btn-primary" onClick={() => setActiveView('browse-projects')}>
                  Find More Jobs
                </button>
              </div>

              {contracts.length === 0 ? (
                <div className="card-box empty-state-box">
                  <Briefcase size={48} className="text-slate-400" />
                  <h3>No Active Jobs Yet</h3>
                  <p>When a client accepts your job application, your project and payment will appear here.</p>
                  <button className="btn-primary" style={{ marginTop: '12px' }} onClick={() => setActiveView('browse-projects')}>
                    Browse Available Jobs
                  </button>
                </div>
              ) : (
                <div className="deliverable-cards-list">
                  {contracts.map(contract => (
                    <div key={contract._id || contract.id} className="deliverable-card card-box" style={{ padding: '24px' }}>
                      <div className="deliv-card-header">
                        <div>
                          <div className="deliv-title-row">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{contract.title}</h3>
                            <span className="milestone-chip">Job</span>
                          </div>
                          <p className="deliv-client">Client: <strong>{typeof contract.client === 'object' ? (contract.client?.company || contract.client?.name || 'Verified Client') : (contract.client || 'Verified Client')}</strong> • Payment: <strong>{contract.totalValue || contract.amount}</strong></p>
                        </div>
                        <div className="escrow-locked-box">
                          <span className="escrow-lbl">PAYMENT PROTECTED</span>
                          <h4 className="escrow-val">{contract.escrowProtected || contract.totalValue || contract.amount}</h4>
                        </div>
                      </div>

                      <div style={{ margin: '14px 0' }}>
                        {contract.status === 'completed' || contract.status === 'paid' ? (
                          <div className="status-banner success" style={{ background: '#ecfdf5', color: '#047857', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                            <CheckCircle2 size={18} />
                            <span>Approved & Paid! Money has been sent to your wallet balance.</span>
                          </div>
                        ) : contract.status === 'work_submitted' ? (
                          <div className="status-banner pending" style={{ background: '#eff6ff', color: '#1d4ed8', padding: '12px 16px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                              <Clock size={18} />
                              <span>Work Sent to Client! Waiting for approval.</span>
                            </div>
                            {contract.deliverables?.link && (
                              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                                Work Link: <a href={contract.deliverables.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{contract.deliverables.link}</a>
                              </p>
                            )}
                            {contract.deliverables?.notes && (
                              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '2px' }}>
                                Your Notes: {contract.deliverables.notes}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="status-banner active" style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span>Status: <strong>In Progress • You are working on this</strong></span>
                              <span className="text-blue font-bold">In Progress</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="deliv-footer">
                        <div className="deliv-meta-left">
                          <span>⏰ {contract.dueDate || 'Due soon'}</span>
                        </div>
                        {contract.status === 'active' && (
                          <button
                            className="btn-primary"
                            onClick={() => setSelectedContractForSubmit(contract)}
                          >
                            <UploadCloud size={16} />
                            <span>Submit Work to Client</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MY APPLICATIONS */}
          {activeNav === 'Proposals' && (
            <div className="tab-proposals-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">APPLICATIONS</span>
                  <h1 className="welcome-title">My Job Applications</h1>
                  <p className="welcome-sub">Check the status of jobs you applied for.</p>
                </div>
                <button className="btn-primary" onClick={() => setActiveView('browse-projects')}>
                  Apply to More Jobs
                </button>
              </div>

              <div className="proposals-table-card card-box">
                <div className="tabs-row" style={{ marginBottom: '20px' }}>
                  {['All', 'Pending Review', 'Accepted', 'Rejected'].map(t => (
                    <button
                      key={t}
                      className={`tab-btn ${proposalTab === t ? 'active' : ''}`}
                      onClick={() => setProposalTab(t)}
                    >
                      {t === 'Pending Review' ? 'Under Review' : (t === 'Accepted' ? 'Hired' : (t === 'Rejected' ? 'Declined' : t))}
                    </button>
                  ))}
                </div>

                {filteredProposals.length === 0 ? (
                  <div className="empty-table-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Send size={40} className="text-slate-400" style={{ margin: '0 auto 12px' }} />
                    <p style={{ color: '#64748b' }}>No applications found in this section.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>JOB NAME</th>
                          <th>CLIENT</th>
                          <th>MY PRICE</th>
                          <th>TIMELINE</th>
                          <th>STATUS</th>
                          <th>DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProposals.map(prop => (
                          <tr key={prop._id || prop.id}>
                            <td><strong>{prop.role}</strong></td>
                            <td>{prop.clientName || 'Client'}</td>
                            <td><strong className="text-blue">{prop.bidAmount}</strong></td>
                            <td>{prop.estTime || '14 Days'}</td>
                            <td>
                              <span className={`status-pill pill-${(prop.status || 'pending').toLowerCase().replace(' ', '-')}`}>
                                {prop.status === 'Accepted' ? 'Hired ✓' : (prop.status === 'Pending Review' ? 'In Review' : prop.status)}
                              </span>
                            </td>
                            <td>{prop.submittedDate || 'Today'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: EARNINGS & WALLET */}
          {activeNav === 'Earnings' && (
            <div className="tab-earnings-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">WALLET</span>
                  <h1 className="welcome-title">My Earnings & Money</h1>
                  <p className="welcome-sub">View your earned balance and withdraw money to your bank account anytime.</p>
                </div>
                <button className="btn-primary" onClick={onOpenWithdrawModal}>
                  <DollarSign size={16} />
                  <span>Withdraw Money</span>
                </button>
              </div>

              <div className="stats-cards-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-metric-card card-box">
                  <span className="stat-label">AVAILABLE TO WITHDRAW</span>
                  <h2 className="stat-value text-blue" style={{ fontSize: '2rem' }}>{totalEarnedStr}</h2>
                  <p className="sub-detail">Instant withdrawal ready</p>
                </div>
                <div className="stat-metric-card card-box">
                  <span className="stat-label">MONEY HELD SAFELY</span>
                  <h2 className="stat-value text-purple" style={{ fontSize: '2rem' }}>${inEscrowNum.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                  <p className="sub-detail">For {activeContracts.length} job(s) in progress</p>
                </div>
                <div className="stat-metric-card card-box">
                  <span className="stat-label">TOTAL LIFETIME EARNINGS</span>
                  <h2 className="stat-value text-dark" style={{ fontSize: '2rem' }}>{totalEarnedStr}</h2>
                  <p className="sub-detail">All safe and paid</p>
                </div>
              </div>

              <div className="proposals-table-card card-box">
                <div className="table-header-row">
                  <h3>Payment History</h3>
                </div>
                <div className="table-responsive">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>DATE</th>
                        <th>JOB / CLIENT</th>
                        <th>AMOUNT</th>
                        <th>PAYMENT STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedContracts.length > 0 ? (
                        completedContracts.map(c => (
                          <tr key={c._id || c.id}>
                            <td>{c.paidAt ? new Date(c.paidAt).toLocaleDateString() : 'Recent'}</td>
                            <td>{c.title} • {c.client}</td>
                            <td><strong className="text-green">+{c.totalValue}</strong></td>
                            <td><span className="status-pill pill-offer-extended">Paid to Wallet ✓</span></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            No payments yet. Complete your first job to receive your payout!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeNav === 'Profile' && (
            <div className="tab-profile-section">
              <div className="dash-welcome-card card-box">
                <div>
                  <span className="live-tag">MY PROFILE</span>
                  <h1 className="welcome-title">Edit My Freelancer Profile</h1>
                  <p className="welcome-sub">Update your job title, hourly rate, skills, and intro so clients can find you.</p>
                </div>
                {profileSavedMsg && (
                  <span className="growth-text text-green" style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                    ✓ Changes Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="card-box" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user.name} <span className="verified-check">✓</span></h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Freelancer</p>
                  </div>
                </div>

                <div className="form-row" style={{ marginBottom: '16px' }}>
                  <div className="form-group flex-1">
                    <label>Job Title (What work do you do?) *</label>
                    <input
                      type="text"
                      value={profileTitle}
                      onChange={(e) => setProfileTitle(e.target.value)}
                      placeholder="e.g. Web Developer, Graphic Designer"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Hourly Rate ($ USD) *</label>
                    <input
                      type="number"
                      value={profileRate}
                      onChange={(e) => setProfileRate(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>About Me & Experience *</label>
                  <textarea
                    rows="4"
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder="Tell clients about your experience, past work, and how you can help them..."
                    required
                  ></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label>My Skills</label>
                  <div className="talent-skills-chips" style={{ margin: '8px 0 12px' }}>
                    {profileSkills.map(skill => (
                      <span key={skill} className="skill-chip-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {skill}
                        <Trash2 size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(skill)} />
                      </span>
                    ))}
                  </div>

                  <div className="input-icon-wrapper" style={{ maxWidth: '400px' }}>
                    <input
                      type="text"
                      placeholder="Add a skill (e.g. React, Logo Design) and press Enter..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(e); }}
                      style={{ paddingLeft: '14px' }}
                    />
                    <button type="button" className="btn-primary btn-sm" style={{ marginLeft: '8px' }} onClick={handleAddSkill}>
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <button type="submit" className="btn-primary">
                    <Check size={16} /> Save Profile
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

      {/* SUBMIT WORK MODAL */}
      {selectedContractForSubmit && (
        <SubmitWorkModal
          contract={selectedContractForSubmit}
          token={token}
          onClose={() => setSelectedContractForSubmit(null)}
          onWorkSubmitted={handleWorkSubmitted}
        />
      )}
    </div>
  );
}
