import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Bookmark, Heart, ChevronDown, CheckCircle, Info, Filter, ArrowRight } from 'lucide-react';

export default function BrowseProjectsPage({ projects, setProjects, onOpenApplyModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [escrowOnly, setEscrowOnly] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [engagementType, setEngagementType] = useState('All');
  const [maxBudget, setMaxBudget] = useState(10000);
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [paymentVerifiedOnly, setPaymentVerifiedOnly] = useState(true);
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [sortBy, setSortBy] = useState('Newest First');

  // Category Checkbox Handlers
  const handleCategoryToggle = (catName) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setEscrowOnly(false);
    setSelectedCategories([]);
    setEngagementType('All');
    setMaxBudget(10000);
    setSelectedExperience('All');
    setPaymentVerifiedOnly(false);
  };

  const toggleBookmark = (id) => {
    setProjects(projects.map(p => ((p._id || p.id) === id ? { ...p, saved: !p.saved } : p)));
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = (p.title || '').toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        const matchesTag = (p.tags || []).some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // Escrow Only
      if (escrowOnly && !p.escrow) return false;

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;

      // Engagement
      if (engagementType !== 'All' && p.engagement !== engagementType) return false;

      // Budget Spectrum
      if (p.maxBudget > maxBudget) return false;

      // Experience Tier
      if (selectedExperience !== 'All' && p.experience !== selectedExperience) return false;

      // Saved tab
      if (activeTab === 'Saved (4)' && !p.saved) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Highest Budget') return b.maxBudget - a.maxBudget;
      if (sortBy === 'Most Proposals') return b.proposalsCount - a.proposalsCount;
      return 0; // Newest First default
    });
  }, [projects, searchQuery, escrowOnly, selectedCategories, engagementType, maxBudget, selectedExperience, activeTab, sortBy]);

  return (
    <div className="browse-projects-page bg-slate">
      {/* Top Banner */}
      <div className="sub-header-banner">
        <div className="container sub-header-flex">
          <div>
            <span className="live-tag">FIND FREELANCE WORK</span>
            <h1>Browse Available Jobs</h1>
            <p>Find great jobs posted by verified clients with safe and guaranteed payments.</p>
          </div>
          <div className="sub-header-stats-pill">
            <div className="stat-pill-item">
              <span className="pill-num">{projects.length}</span>
              <span className="pill-label">jobs available</span>
            </div>
            <span className="divider">•</span>
            <div className="stat-pill-item">
              <span className="pill-num text-blue">100%</span>
              <span className="pill-label">Safe Payments</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container layout-with-sidebar">
        {/* SIDEBAR FILTERS */}
        <aside className="filters-sidebar card-box">
          <div className="sidebar-header">
            <h3><Filter size={18} /> Filters</h3>
            <button className="reset-link" onClick={handleResetFilters}>Reset All</button>
          </div>

          {/* Search filter */}
          <div className="filter-group">
            <div className="search-input-inner">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search jobs, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Escrow Funded Toggle */}
          <div className="filter-group toggle-group">
            <div>
              <strong>Safe Payment Only</strong>
              <p className="sub-text">Money deposited before work starts</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={escrowOnly}
                onChange={(e) => setEscrowOnly(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Category Checkboxes */}
          <div className="filter-group">
            <div className="filter-title-row">
              <h4>CORE CATEGORY</h4>
              <span className="badge-count">Selected ({selectedCategories.length})</span>
            </div>
            <div className="checkbox-list">
              {[
                { name: 'Web & Software Dev', count: 842 },
                { name: 'AI & Machine Learning', count: 319 },
                { name: 'UI/UX & Product Design', count: 194 },
                { name: 'Mobile Engineering', count: 128 },
                { name: 'Growth & Technical Writing', count: 65 }
              ].map(cat => (
                <label key={cat.name} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryToggle(cat.name)}
                  />
                  <span>{cat.name}</span>
                  <span className="count-num">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Engagement Type */}
          <div className="filter-group">
            <h4>PAYMENT TYPE</h4>
            <div className="pill-btn-toggle">
              <button
                className={`toggle-pill ${engagementType === 'Fixed-Price' ? 'active' : ''}`}
                onClick={() => setEngagementType(engagementType === 'Fixed-Price' ? 'All' : 'Fixed-Price')}
              >
                Fixed-Price
              </button>
              <button
                className={`toggle-pill ${engagementType === 'Hourly Rate' ? 'active' : ''}`}
                onClick={() => setEngagementType(engagementType === 'Hourly Rate' ? 'All' : 'Hourly Rate')}
              >
                Hourly Rate
              </button>
            </div>
          </div>

          {/* Budget Spectrum Slider */}
          <div className="filter-group">
            <div className="filter-title-row">
              <h4>BUDGET RANGE</h4>
              <span className="range-val">$500 – ${maxBudget.toLocaleString()}+</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="budget-slider"
            />
            <div className="slider-labels">
              <span>$500</span>
              <span>$5,000</span>
              <span>$10,000+</span>
            </div>
          </div>

          {/* Experience Tier */}
          <div className="filter-group">
            <h4>EXPERIENCE LEVEL</h4>
            <div className="tier-pills-row">
              {['Entry', 'Intermediate', 'Expert'].map(tier => (
                <button
                  key={tier}
                  className={`tier-pill ${selectedExperience === tier ? 'active' : ''}`}
                  onClick={() => setSelectedExperience(selectedExperience === tier ? 'All' : tier)}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Client Reputation */}
          <div className="filter-group">
            <h4>CLIENT INFO</h4>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={paymentVerifiedOnly}
                  onChange={(e) => setPaymentVerifiedOnly(e.target.checked)}
                />
                <span>Payment Verified</span>
                <Info size={14} className="info-icon" />
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Hired Freelancers Before</span>
              </label>
            </div>
          </div>

          {/* Notice Box */}
          <div className="sidebar-notice-box">
            <ShieldCheck size={18} className="text-blue" />
            <p>Tip: Apply quickly after a job is posted to get noticed faster by the client.</p>
          </div>
        </aside>

        {/* MAIN PROJECTS CONTENT */}
        <main className="projects-main-content">
          {/* Top Tabs & Sort Bar */}
          <div className="projects-control-bar card-box">
            <div className="tabs-row">
              {['All Jobs', 'Most Recent', 'Saved (4)', 'Recommended'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="sort-dropdown-wrap">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="Newest First">Newest First</option>
                <option value="Highest Budget">Highest Budget</option>
                <option value="Most Proposals">Most Proposals</option>
              </select>
            </div>
          </div>

          {/* Jobs Listing Cards */}
          <div className="jobs-list">
            {filteredProjects.length === 0 ? (
              <div className="no-results-box card-box">
                <Search size={32} className="text-slate-400" />
                <h3>No open projects match your criteria</h3>
                <p>Try resetting filters or adjusting search keywords.</p>
                <button className="btn-secondary" onClick={handleResetFilters}>Reset Filters</button>
              </div>
            ) : (
              filteredProjects.map(job => (
                <div key={job._id || job.id} className="job-card card-box">
                  <div className="job-card-header">
                    <div className="job-badges">
                      <span className={`badge badge-${job.badgeType || 'creative'}`}>{job.badge || 'New Job'}</span>
                      <span className="badge badge-content">{job.category}</span>
                      <span className="posted-time">Posted {job.postedTime || 'Recently'}</span>
                    </div>
                    <div className="budget-price-tag">
                      <h3>{job.budget}</h3>
                      <span className="budget-sub">{job.type || `${job.engagement || 'Fixed-Price'} • Safe Payment`}</span>
                    </div>
                  </div>

                  <h2 className="job-card-title">{job.title}</h2>

                  <p className="job-card-desc">{job.description}</p>

                  <div className="job-tags-row">
                    {(job.tags || []).map((tag, idx) => (
                      <span key={idx} className="tag-pill">{tag}</span>
                    ))}
                  </div>

                  <div className="job-card-bottom">
                    <div className="client-info-col">
                      <img src={job.client?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'} alt={job.client?.name || 'Client'} className="client-avatar" />
                      <div>
                        <div className="client-name-row">
                          <strong>{job.client?.name || 'Verified Client'}</strong>
                          <span className="check-verified-sm">✓</span>
                        </div>
                        <div className="client-stats-row">
                          <span>★ {job.client?.rating || 5.0}</span>
                          <span>• {job.client?.spent || '$0 spent'}</span>
                          <span>• {job.client?.location || 'India'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="job-action-col">
                      <div className="job-meta-details">
                        <span>👥 {job.proposalsCount || 0} proposals</span>
                        <span>⏱ {job.deadline || '14 days remaining'}</span>
                      </div>
                      <div className="action-btns">
                        <button
                          className={`btn-bookmark ${job.saved ? 'saved' : ''}`}
                          onClick={() => toggleBookmark(job._id || job.id)}
                          title="Save Job"
                        >
                          <Bookmark size={18} fill={job.saved ? '#2563eb' : 'none'} color={job.saved ? '#2563eb' : '#64748b'} />
                        </button>
                        <button className="btn-primary" onClick={() => onOpenApplyModal(job)}>
                          Quick Apply →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="pagination-bar card-box">
            <span>Showing {filteredProjects.length} of {projects.length} open projects</span>

            <div className="per-page-select">
              <span>Per page:</span>
              <select defaultValue="25">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="page-numbers">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span>...</span>
              <button className="page-btn">71</button>
              <button className="page-btn next">&gt;</button>
            </div>
          </div>

          {/* Bottom Safe Payment Policy Card */}
          <div className="bottom-escrow-card card-box">
            <ShieldCheck size={28} className="text-blue" />
            <div className="escrow-card-text">
              <h4>100% Freelancer Payment Protection</h4>
              <p>Clients deposit money before work starts. Once you complete the job and client approves, payment is released right away.</p>
            </div>
            <a href="#how-it-works" className="escrow-link">Learn How It Works →</a>
          </div>
        </main>
      </div>
    </div>
  );
}
