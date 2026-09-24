import React, { useState } from 'react';
import { ShieldCheck, Award, DollarSign, CheckCircle } from 'lucide-react';

export default function HireTalentModal({ talent, onClose }) {
  const [projectTitle, setProjectTitle] = useState('Custom Enterprise Project');
  const [escrowDeposit, setEscrowDeposit] = useState((talent?.hourlyRate || 85) * 40); // 40h estimate
  const [milestonesCount, setMilestonesCount] = useState(2);

  const handleSendOffer = (e) => {
    e.preventDefault();
    alert(`Direct Offer & Escrow Request Sent to ${talent.name}! $${escrowDeposit.toLocaleString()} successfully allocated to escrow.`);
    onClose();
  };

  if (!talent) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content hire-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">DIRECT JOB OFFER</span>
            <h2>Hire {talent.name}</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="talent-hire-profile card-box">
          <img src={talent.avatar} alt={talent.name} className="hire-avatar" />
          <div>
            <h3>{talent.name} <span className="verified-check">✓</span></h3>
            <p className="role">{talent.role}</p>
            <p className="rate">${talent.hourlyRate}/hr • {talent.successScore}% Happy Clients</p>
          </div>
        </div>

        <form onSubmit={handleSendOffer} className="modal-form">
          <div className="form-group">
            <label>Job Title or Name</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Project Budget / Deposit ($ USD)</label>
              <input
                type="number"
                value={escrowDeposit}
                onChange={(e) => setEscrowDeposit(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group flex-1">
              <label>Payment Schedule</label>
              <select value={milestonesCount} onChange={(e) => setMilestonesCount(Number(e.target.value))}>
                <option value={1}>Pay when entire job is completed</option>
                <option value={2}>Pay in 2 parts (halfway & finish)</option>
                <option value={3}>Pay in 3 parts</option>
              </select>
            </div>
          </div>

          <div className="escrow-notice-banner">
            <ShieldCheck size={20} className="text-blue" />
            <p>Safe Payment: Your money is held safely by FreelanceHub. Payment is only sent to the freelancer after you review and approve their completed work.</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Deposit Safely & Send Job Offer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
