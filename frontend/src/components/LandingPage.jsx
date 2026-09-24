import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, ArrowRight, Code, Layout, Cpu, Smartphone, TrendingUp, Cloud, Star, ChevronRight, Lock, DollarSign, Award } from 'lucide-react';
import { SPECIALIZATION_CATEGORIES, INITIAL_FREELANCERS, INITIAL_PROJECTS } from '../data/mockData';

export default function LandingPage({
  projects = [],
  freelancers = [],
  setActiveView,
  onOpenPostJob,
  onOpenApplyModal,
  onOpenHireModal,
  onOpenAuth
}) {
  const [heroSearch, setHeroSearch] = useState('');
  const [trackerProgress, setTrackerProgress] = useState(75);

  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 3) : INITIAL_PROJECTS.slice(0, 3);
  const displayTalent = freelancers && freelancers.length > 0 ? freelancers.slice(0, 3) : INITIAL_FREELANCERS.slice(0, 3);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setActiveView('find-talent');
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="cat-icon" size={24} />;
      case 'Layout': return <Layout className="cat-icon" size={24} />;
      case 'Cpu': return <Cpu className="cat-icon" size={24} />;
      case 'Smartphone': return <Smartphone className="cat-icon" size={24} />;
      case 'TrendingUp': return <TrendingUp className="cat-icon" size={24} />;
      case 'Cloud': return <Cloud className="cat-icon" size={24} />;
      default: return <Code className="cat-icon" size={24} />;
    }
  };

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container container">
          <div className="hero-top-pill">
            <span className="dot"></span>
            <span>0% Platform Fee on Your First Project</span>
            <ChevronRight size={14} />
          </div>

          <h1 className="hero-title">
            Find the Perfect Freelancer <span className="text-gradient">for Every Project</span>
          </h1>

          <p className="hero-subtitle">
            Hire talented freelancers or find great jobs. Payments are 100% safe, work is delivered on time, and everyone is protected.
          </p>

          {/* Search Box */}
          <form className="hero-search-box" onSubmit={handleHeroSearch}>
            <div className="search-input-wrap">
              <Search size={20} className="search-box-icon" />
              <input
                type="text"
                placeholder="Search skill, job title, or category e.g. React, Logo Design..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
            </div>
            <select className="search-select">
              <option value="all">All Categories</option>
              <option value="dev">Web & Software Dev</option>
              <option value="design">UI/UX & Design</option>
              <option value="ai">AI & Machine Learning</option>
            </select>
            <button type="submit" className="btn-primary hero-search-btn">
              <span>Find Freelancers</span>
            </button>
          </form>

          {/* Trending Tags */}
          <div className="hero-trending">
            <span className="trending-label">Popular:</span>
            <span className="trending-tag" onClick={() => setActiveView('find-talent')}>React.js</span>
            <span className="trending-tag" onClick={() => setActiveView('find-talent')}>Website Design</span>
            <span className="trending-tag" onClick={() => setActiveView('find-talent')}>Logo & Branding</span>
            <span className="trending-tag" onClick={() => setActiveView('find-talent')}>Python</span>
            <span className="trending-tag" onClick={() => setActiveView('find-talent')}>Mobile Apps</span>
          </div>

          {/* Metrics Counters */}
          <div className="hero-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-wrap blue">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3>15,420+</h3>
                <p>Completed Jobs</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap purple">
                <Award size={20} />
              </div>
              <div>
                <h3>48,200+</h3>
                <p>Expert Freelancers</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap cyan">
                <Star size={20} />
              </div>
              <div>
                <h3>98.4%</h3>
                <p>Happy Clients</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap green">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3>100%</h3>
                <p>Safe Payments Protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE TALENT BY SPECIALIZATION */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="sub-label">DISCOVERY ENGINE</span>
              <h2 className="section-heading">Browse Talent by Specialization</h2>
            </div>
            <button className="link-arrow-btn" onClick={() => setActiveView('find-talent')}>
              <span>Explore All 34 Disciplines</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="spec-grid">
            {SPECIALIZATION_CATEGORIES.map(cat => (
              <div key={cat.id} className="spec-card card-box" onClick={() => setActiveView('find-talent')}>
                <div className="spec-card-header">
                  <div className="cat-icon-container">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="vetted-pill">{cat.vettedCount}</span>
                </div>
                <h3 className="spec-title">{cat.title}</h3>
                <p className="spec-desc">{cat.description}</p>
                <div className="spec-footer">
                  <span className="spec-rate">{cat.avgRate}</span>
                  <span className="spec-response">{cat.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FUNDED PROJECTS */}
      <section className="section-padding bg-slate">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="sub-label">ACTION MARKETPLACE</span>
              <h2 className="section-heading">Featured Funded Projects</h2>
              <p className="section-subtext">All projects are backed with escrow deposit and verified client ID.</p>
            </div>
            <div className="btn-group">
              <button className="btn-secondary" onClick={() => setActiveView('browse-projects')}>All Open Contracts</button>
              <button className="btn-primary" onClick={() => setActiveView('browse-projects')}>For Hiring</button>
            </div>
          </div>

          <div className="projects-preview-grid">
            {displayProjects.map(proj => (
              <div key={proj._id || proj.id} className="preview-project-card card-box">
                <div className="proj-card-top">
                  <div className="badges-wrap">
                    <span className={`badge badge-${proj.badgeType || 'creative'}`}>{proj.badge || 'New Job'}</span>
                    <span className="badge badge-content">{proj.category}</span>
                  </div>
                  <span className="time-posted">{proj.postedTime || 'Recently'}</span>
                </div>

                <h3 className="proj-title">{proj.title}</h3>
                
                <div className="proj-client-mini">
                  <img src={proj.client?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'} alt={proj.client?.name || 'Client'} className="client-mini-avatar" />
                  <span>{proj.client?.name || 'Client'}</span>
                  <span className="verified-dot">✓</span>
                  <span className="client-spent">{proj.client?.spent || '$0 spent'}</span>
                </div>

                <p className="proj-snippet">{(proj.description || '').substring(0, 140)}...</p>

                <div className="proj-tags-wrap">
                  {(proj.tags || []).slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <div className="proj-card-footer">
                  <div>
                    <span className="type-label">{proj.engagement || 'Fixed-Price'}</span>
                    <h4 className="budget-val">{proj.budget}</h4>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => onOpenApplyModal(proj)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT: TOP 1% TALENT */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="sub-label">ELITE TALENT INDEX</span>
              <h2 className="section-heading">Spotlight: Top 1% Freelance Talent</h2>
              <p className="section-subtext">Pre-assessed on live technical code sandboxes and communication skills.</p>
            </div>
            <button className="link-arrow-btn" onClick={() => setActiveView('find-talent')}>
              <span>View All 3,800+ Talent</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="talent-spotlight-grid">
            {displayTalent.map(freelancer => (
              <div key={freelancer._id || freelancer.id} className="talent-spotlight-card card-box">
                <div className="talent-card-header">
                  <img src={freelancer.avatar} alt={freelancer.name} className="spotlight-avatar" />
                  <div>
                    <h3 className="spotlight-name">
                      {freelancer.name}
                      <span className="check-verified">✓</span>
                    </h3>
                    <p className="spotlight-role">{freelancer.role || freelancer.title}</p>
                    <div className="spotlight-meta">
                      <span className="star-rating">★ {freelancer.rating || 5.0}</span>
                      <span>{freelancer.reviews || freelancer.reviewsCount || 0} reviews</span>
                      <span className="success-badge">{freelancer.successScore || 100}% Success</span>
                    </div>
                  </div>
                </div>

                <p className="talent-bio">{freelancer.bio}</p>

                <div className="talent-skills-wrap">
                  {(freelancer.skills || []).map((skill, idx) => (
                    <span key={idx} className="skill-chip">{skill}</span>
                  ))}
                </div>

                <div className="talent-card-bottom">
                  <div>
                    <span className="rate-num">${freelancer.hourlyRate}</span>
                    <span className="rate-unit">/hr</span>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => onOpenHireModal(freelancer)}>
                    Hire Talent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT ON TRUST & SAFE PAYMENTS */}
      <section className="section-padding bg-slate border-top">
        <div className="container">
          <div className="text-center-heading">
            <span className="sub-label text-blue">PROTECTED PAYMENTS</span>
            <h2 className="section-heading">Built on Trust and Safe Payments</h2>
            <p className="section-subtext">Never worry about losing money or doing unpaid work. FreelanceHub protects both clients and freelancers with safe deposits.</p>
          </div>

          {/* 3 Steps Grid */}
          <div className="trust-steps-grid">
            <div className="trust-step-card card-box">
              <div className="step-number-bubble">1</div>
              <h3>1. Client Deposits Money Safely</h3>
              <p>The client posts the job and deposits the payment safely into our protected escrow before work begins.</p>
              <span className="trust-link">Safe Payment Guarantee →</span>
            </div>

            <div className="trust-step-card card-box">
              <div className="step-number-bubble">2</div>
              <h3>2. Freelancer Does the Work</h3>
              <p>The freelancer completes the task, stays in touch with the client, and sends their finished work link or files.</p>
              <span className="trust-link">Submit & Review Work →</span>
            </div>

            <div className="trust-step-card card-box">
              <div className="step-number-bubble">3</div>
              <h3>3. Client Approves & Pays</h3>
              <p>The client checks the completed work, clicks approve, and the money goes straight to the freelancer's wallet.</p>
              <span className="trust-link">Instant Payout →</span>
            </div>
          </div>

          {/* Interactive Payment Tracker Widget */}
          <div className="milestone-tracker-widget card-box">
            <div className="tracker-header">
              <div className="tracker-title-wrap">
                <ShieldCheck size={20} className="text-blue" />
                <h4>Interactive Payment & Work Tracker</h4>
              </div>
              <span className="live-demo-badge">Interactive Demo</span>
            </div>

            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${trackerProgress}%` }}></div>
            </div>

            <div className="tracker-values-grid">
              <div className="tracker-stat">
                <span className="tracker-stat-label">Paid to Freelancer</span>
                <span className="tracker-stat-val text-blue">${(7400 * (trackerProgress / 100)).toFixed(0)}</span>
              </div>
              <div className="tracker-stat">
                <span className="tracker-stat-label">Available in Wallet</span>
                <span className="tracker-stat-val text-purple">$1,200</span>
              </div>
              <div className="tracker-stat">
                <span className="tracker-stat-label">Held in Safe Deposit</span>
                <span className="tracker-stat-val text-dark">${(1350 * (1 - trackerProgress / 100)).toFixed(0)}</span>
              </div>
            </div>

            <div className="tracker-interactive-slider">
              <label>Slide to see how project progress works ({trackerProgress}%):</label>
              <input
                type="range"
                min="0"
                max="100"
                value={trackerProgress}
                onChange={(e) => setTrackerProgress(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center-heading">
            <span className="sub-label">CUSTOMER ENDORSEMENTS</span>
            <h2 className="section-heading">Trusted by High-Velocity Engineering & Design Leaders</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card card-box">
              <div className="stars">★★★★★</div>
              <p className="quote">
                "We sourced a staff-level Next.js and Tailwind engineer in under 48 hours. The milestone escrow feature gave us complete peace of mind for our Series A release."
              </p>
              <div className="reviewer">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" alt="Sarah Jenkins" />
                <div>
                  <strong>Sarah Jenkins</strong>
                  <p>VP of Engineering at MetricBase</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card card-box">
              <div className="stars">★★★★★</div>
              <p className="quote">
                "As an independent fullstack consultant, FreelanceHub has completely eliminated payment disputes. Contracts are locked in escrow before I write line 1."
              </p>
              <div className="reviewer">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Tariq Al-Mansoor" />
                <div>
                  <strong>Tariq Al-Mansoor</strong>
                  <p>Top Rated AI & Cloud Specialist</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card card-box">
              <div className="stars">★★★★★</div>
              <p className="quote">
                "The speed and quality of design talent on FreelanceHub surpassed Agencies by miles. We redesigned our entire SaaS design system in 3 weeks flat."
              </p>
              <div className="reviewer">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Aria Chen" />
                <div>
                  <strong>Aria Chen</strong>
                  <p>Co-Founder & CTO, HyperScale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL CTA BANNER */}
      <section className="dual-cta-section container">
        <div className="cta-card client-cta">
          <span className="cta-tag">FOR HIRING MANAGERS & LEADS</span>
          <h2>Hire Top Tier Independent Specialists</h2>
          <p>Post your project for free, receive vetted proposals within hours, and only release payments when you approve the deliverables.</p>
          <button className="btn-white-pill" onClick={onOpenPostJob}>
            Post a Project Now
          </button>
        </div>

        <div className="cta-card talent-cta">
          <span className="cta-tag">FOR INDEPENDENT CONTRACTORS</span>
          <h2>Monetize Your Skills with Guaranteed Escrow</h2>
          <p>Access enterprise clients with zero upfront fees, automated tax reporting, and guaranteed milestone payout.</p>
          <button className="btn-trans-pill" onClick={() => setActiveView('browse-projects')}>
            <span>Apply as Freelancer</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
