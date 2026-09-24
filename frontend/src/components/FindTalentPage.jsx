import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, CheckCircle2, Star, MessageSquare, Briefcase, Filter, ChevronDown, Award } from 'lucide-react';

export default function FindTalentPage({ freelancers, onOpenHireModal, onOpenMessageDrawer }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Talent');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [maxHourlyRate, setMaxHourlyRate] = useState(150);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [minJSS, setMinJSS] = useState(0);

  const handleSpecToggle = (specName) => {
    if (selectedSpecializations.includes(specName)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== specName));
    } else {
      setSelectedSpecializations([...selectedSpecializations, specName]);
    }
  };

  const handleTierToggle = (tierName) => {
    if (selectedTiers.includes(tierName)) {
      setSelectedTiers(selectedTiers.filter(t => t !== tierName));
    } else {
      setSelectedTiers([...selectedTiers, tierName]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('All Talent');
    setSelectedSpecializations([]);
    setMaxHourlyRate(150);
    setSelectedTiers([]);
    setMinJSS(0);
  };

  const filteredTalent = useMemo(() => {
    return freelancers.filter(f => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesRole = f.role.toLowerCase().includes(q);
        const matchesBio = f.bio.toLowerCase().includes(q);
        const matchesSkill = f.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesRole && !matchesBio && !matchesSkill) return false;
      }

      // Quick Tabs
      if (activeTab === 'Expert Vetted' && f.tier !== 'Expert Vetted') return false;
      if (activeTab === 'Top Rated Plus' && f.tier !== 'Top Rated Plus') return false;

      // Specializations
      if (selectedSpecializations.length > 0 && !selectedSpecializations.includes(f.specialization)) return false;

      // Hourly Rate
      if (f.hourlyRate > maxHourlyRate) return false;

      // Tier
      if (selectedTiers.length > 0 && !selectedTiers.includes(f.tier)) return false;

      // Job Success Score
      if (f.successScore < minJSS) return false;

      return true;
    });
  }, [freelancers, searchQuery, activeTab, selectedSpecializations, maxHourlyRate, selectedTiers, minJSS]);

  return (
    <div className="find-talent-page bg-slate">
      {/* Top Sub-Header */}
      <div className="sub-header-banner">
        <div className="container sub-header-flex">
          <div>
            <span className="live-tag">SKILLED TALENT</span>
            <h1>Find & Hire Freelancers</h1>
            <p>Connect with skilled developers, designers, and writers ready to help build your projects with safe and guaranteed payments.</p>
          </div>
          <div className="sub-header-stats-pill">
            <div className="stat-pill-item">
              <span className="pill-num">3,840+</span>
              <span className="pill-label">Freelancers</span>
            </div>
            <span className="divider">•</span>
            <div className="stat-pill-item">
              <span className="pill-num text-blue">99.2%</span>
              <span className="pill-label">Happy Clients</span>
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

          {/* Specialization Checkboxes */}
          <div className="filter-group">
            <h4>Specialization</h4>
            <div className="checkbox-list">
              {[
                { name: 'Software Architecture', count: '1.2k' },
                { name: 'Product & UI/UX', count: '840' },
                { name: 'AI & Machine Learning', count: '420' },
                { name: 'DevOps & Cloud Infra', count: '320' },
                { name: 'Technical Writing & DevRel', count: '160' }
              ].map(spec => (
                <label key={spec.name} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedSpecializations.includes(spec.name)}
                    onChange={() => handleSpecToggle(spec.name)}
                  />
                  <span>{spec.name}</span>
                  <span className="count-num">{spec.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hourly Rate Slider */}
          <div className="filter-group">
            <div className="filter-title-row">
              <h4>Hourly Rate</h4>
              <span className="range-val">$20 – ${maxHourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={maxHourlyRate}
              onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
              className="budget-slider"
            />
            <div className="slider-labels">
              <span>$20/hr</span>
              <span>$85/hr</span>
              <span>$150+/hr</span>
            </div>
          </div>

          {/* Talent Tier */}
          <div className="filter-group">
            <h4>Talent Tier</h4>
            <div className="checkbox-list">
              {[
                { name: 'Top Rated Plus', badgeClass: 'badge-top-rated-plus' },
                { name: 'Expert Vetted', badgeClass: 'badge-expert-vetted' },
                { name: 'Top Rated', badgeClass: 'badge-top-rated' }
              ].map(tier => (
                <label key={tier.name} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedTiers.includes(tier.name)}
                    onChange={() => handleTierToggle(tier.name)}
                  />
                  <span>{tier.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Success Score */}
          <div className="filter-group">
            <h4>Job Success Score</h4>
            <div className="radio-list">
              <label className="radio-item">
                <input
                  type="radio"
                  name="jss"
                  checked={minJSS === 90}
                  onChange={() => setMinJSS(90)}
                />
                <span>90% & above (Any)</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="jss"
                  checked={minJSS === 98}
                  onChange={() => setMinJSS(98)}
                />
                <span>98%+ Stellar Track Record</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="jss"
                  checked={minJSS === 80}
                  onChange={() => setMinJSS(80)}
                />
                <span>80% & above</span>
              </label>
            </div>
          </div>

          {/* English Proficiency */}
          <div className="filter-group">
            <h4>English Proficiency</h4>
            <select defaultValue="Native" className="filter-select">
              <option value="Native">Native or Bilingual (C2)</option>
              <option value="Fluent">Fluent (C1)</option>
            </select>
          </div>

          {/* Timezone Alignment */}
          <div className="filter-group">
            <h4>Timezone Alignment</h4>
            <select defaultValue="Any" className="filter-select">
              <option value="Any">Any Timezone (Global 24h)</option>
              <option value="US">US Timezones (PST/EST)</option>
              <option value="EU">European Timezones (CET/GMT)</option>
            </select>
          </div>
        </aside>

        {/* MAIN TALENT GRID */}
        <main className="talent-main-content">
          {/* Top Search Bar & Tabs */}
          <div className="talent-control-bar card-box">
            <div className="talent-search-row">
              <div className="search-input-inner flex-1">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by skill, title, or name (e.g. Pratik, React, Logo Design)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="tab-pills-wrap">
                {['All Talent', 'Top Rated', 'Available Now'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-pill-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count & Sort Header */}
          <div className="talent-results-meta">
            <span>Showing <strong>{filteredTalent.length} skilled freelancers</strong></span>
            <div className="sort-by-row">
              <span>Sort by:</span>
              <select defaultValue="Highest Rated" className="sort-select-sm">
                <option value="Highest Rated">Highest Rated</option>
                <option value="Lowest Rate">Lowest Hourly Rate</option>
              </select>
            </div>
          </div>

          {/* Grid of Talent Cards */}
          <div className="talent-cards-grid">
            {filteredTalent.map(talent => (
              <div key={talent.id} className="talent-card card-box">
                <div className="talent-card-header">
                  <div className="avatar-wrap">
                    <img src={talent.avatar} alt={talent.name} className="talent-avatar-lg" />
                    <span className="online-dot" title="Available Now"></span>
                  </div>

                  <div className="talent-header-info">
                    <div className="name-rate-row">
                      <h3 className="talent-name">
                        {talent.name}
                        <span className="verified-check">✓</span>
                      </h3>
                      <div className="rate-success-block">
                        <span className="hourly-rate">${talent.hourlyRate}<small>/hr</small></span>
                        <span className="jss-badge">{talent.successScore}% Success</span>
                      </div>
                    </div>

                    <p className="talent-role">{talent.role}</p>

                    <div className="talent-badges-row">
                      <span className={`badge badge-${talent.tierBadge}`}>{talent.tier}</span>
                      <span className="location-text">• {talent.location}</span>
                    </div>

                    <div className="talent-stats-row">
                      <span>★ <strong>{talent.rating}</strong> ({talent.reviews} reviews)</span>
                      <span>• <strong>{talent.totalEarned}</strong> Total Earned</span>
                      <span>• <strong>{talent.hoursLogged}</strong></span>
                    </div>
                  </div>
                </div>

                <p className="talent-bio-text">{talent.bio}</p>

                <div className="talent-skills-chips">
                  {talent.skills.map((skill, idx) => (
                    <span key={idx} className="skill-chip-blue">{skill}</span>
                  ))}
                </div>

                <div className="talent-card-actions">
                  <button className="btn-primary" onClick={() => onOpenHireModal(talent)}>
                    Hire Now
                  </button>
                  <button className="btn-secondary" onClick={() => onOpenMessageDrawer(talent)}>
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-bar card-box mt-6">
            <span>1 – {filteredTalent.length} of 3,842 freelancers</span>
            <div className="page-numbers">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span>...</span>
              <button className="page-btn">64</button>
              <button className="page-btn next">Next</button>
            </div>
          </div>

          {/* Enterprise Squad Matching Banner */}
          <div className="enterprise-squad-banner">
            <div className="squad-banner-left">
              <span className="banner-tag">⚡ Enterprise Squad Matching</span>
              <h2>Need custom dedicated staffing?</h2>
              <p>Let our AI matchmaker and specialized talent partners assemble your pre-vetted distributed engineering or product squad in under 48 hours.</p>
            </div>
            <div className="squad-banner-right">
              <button className="btn-white-pill" onClick={() => alert('Enterprise Squad Request Received! An account strategist will contact you shortly.')}>
                Request Squad Match
              </button>
              <button className="btn-trans-pill">
                Explore Enterprise
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
