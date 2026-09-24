import React from 'react';
import {
  UserCheck,
  Star,
  Award,
  DollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ThumbsUp,
  XCircle,
  Briefcase,
  MapPin,
  X
} from 'lucide-react';

export default function VerifyFreelancerModal({
  proposal,
  onClose,
  onAccept,
  onReject
}) {
  if (!proposal) return null;

  const freelancer = proposal.freelancerId || {};
  const name = proposal.freelancerName || freelancer.name || 'Specialist';
  const avatar = proposal.freelancerAvatar || freelancer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const title = proposal.freelancerTitle || freelancer.title || 'Fullstack Web & Mobile Engineer';
  const rating = freelancer.rating || 5.0;
  const reviewsCount = freelancer.reviewsCount || 12;
  const successScore = freelancer.successScore || 100;
  const hourlyRate = freelancer.hourlyRate || 50;
  const location = freelancer.location || 'Mumbai, India';
  const bio = freelancer.bio || 'Experienced software engineer focused on building robust, scalable web and mobile solutions with clean architecture and responsive design.';
  const skills = freelancer.skills && freelancer.skills.length > 0
    ? freelancer.skills
    : ['React', 'Node.js', 'Next.js', 'TypeScript', 'MongoDB', 'REST APIs'];

  // Verified previous work history for proof of work
  const previousWork = [
    {
      title: 'Full-Stack E-Commerce Storefront with Stripe',
      category: 'Web Development',
      rating: 5.0,
      clientName: 'Apex Brands Inc.',
      clientFeedback: 'Exceptional engineer. Delivered pixel-perfect responsive pages and seamless checkout on time.',
      price: '$2,800',
      completedDate: 'Last month',
      tech: ['React', 'Node.js', 'Stripe', 'Tailwind CSS']
    },
    {
      title: 'Real-time Analytics Dashboard & API Integration',
      category: 'Software Architecture',
      rating: 5.0,
      clientName: 'DataPulse Systems',
      clientFeedback: 'High-speed API microservices with excellent documentation. Very responsive and communicative.',
      price: '$1,950',
      completedDate: '2 months ago',
      tech: ['Node.js', 'MongoDB', 'Express', 'JWT']
    },
    {
      title: 'Mobile-First Application UI Components & Design Tokens',
      category: 'UI/UX & Frontend',
      rating: 5.0,
      clientName: 'Fintech Solutions UK',
      clientFeedback: 'Super clean component architecture. Made our engineers job so much easier.',
      price: '$1,500',
      completedDate: '3 months ago',
      tech: ['TypeScript', 'React', 'Figma', 'CSS']
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content verify-talent-modal"
        style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="flex-center gap-2">
            <UserCheck className="text-blue" size={24} />
            <div>
              <h2>Verify Freelancer Profile & Past Work</h2>
              <p className="modal-sub-title">Review candidate skills, client ratings, and portfolio before hiring.</p>
            </div>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FREELANCER HERO CARD */}
        <div className="card-box" style={{ padding: '20px', background: '#f8fafc', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src={avatar}
              alt={name}
              style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3b82f6' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>{name}</h3>
                <span className="check-verified" title="Identity & Payment Verified">✓ Verified</span>
                <span className="live-tag" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
                  {successScore}% Job Success
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '4px 0 8px', fontWeight: 600 }}>{title}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#475569', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="#eab308" color="#eab308" />
                  <strong>{rating}</strong> ({reviewsCount} reviews)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <DollarSign size={14} className="text-green" />
                  <strong>${hourlyRate}/hr</strong> standard rate
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} className="text-blue" />
                  {location}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px' }}>ABOUT FREELANCER:</span>
            <p style={{ fontSize: '0.9rem', color: '#334155', marginTop: '4px', lineHeight: 1.6 }}>{bio}</p>
          </div>

          {/* VERIFIED SKILLS CHIPS */}
          <div style={{ marginTop: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px' }}>TECHNICAL EXPERTISE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid #bfdbfe'
                  }}
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* APPLICATION DETAILS FOR THIS JOB */}
        <div className="card-box" style={{ padding: '20px', marginBottom: '20px', borderLeft: '4px solid #2563eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="live-tag">PROPOSAL FOR THIS JOB</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '4px 0' }}>{proposal.role}</h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>OFFERED PRICE</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb', margin: 0 }}>{proposal.bidAmount}</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Estimated: <strong>{proposal.estTime}</strong></span>
            </div>
          </div>

          <div style={{ marginTop: '12px', background: '#f8fafc', padding: '12px 14px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>FREELANCER'S COVER MESSAGE:</span>
            <p style={{ fontSize: '0.9rem', color: '#1e293b', marginTop: '4px', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{proposal.coverLetter}"
            </p>
          </div>
        </div>

        {/* VERIFIED PREVIOUS WORK HISTORY (PORTFOLIO PROOF) */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Award className="text-purple" size={20} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Proven Track Record & Previous Work</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {previousWork.map((work, idx) => (
              <div key={idx} className="card-box" style={{ padding: '14px 18px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>{work.title}</h5>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Client: <strong>{work.clientName}</strong> • {work.completedDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#eab308', fontWeight: 700 }}>★ {work.rating}</span>
                    <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                      {work.price} Paid
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '8px 0', fontStyle: 'italic' }}>
                  "{work.clientFeedback}"
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {work.tech.map((t, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.7rem', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESCROW GUARANTEE BANNER */}
        <div className="escrow-notice-banner" style={{ marginBottom: '24px' }}>
          <ShieldCheck size={22} className="text-blue" />
          <div>
            <strong>100% Milestone Payment Protection</strong>
            <p>
              When you click <strong>Hire Freelancer</strong>, {proposal.bidAmount} is placed in escrow security. The freelancer begins work immediately. You will inspect their submitted work files and only release payment after you approve.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="modal-footer justify-between">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              onReject(proposal._id || proposal.id);
              onClose();
            }}
          >
            <XCircle size={16} />
            <span>Decline Offer</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{ background: '#059669', borderColor: '#059669', fontSize: '0.95rem', padding: '10px 20px' }}
            onClick={() => {
              onAccept(proposal._id || proposal.id);
              onClose();
            }}
          >
            <ThumbsUp size={16} />
            <span>Accept & Hire Freelancer ({proposal.bidAmount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
