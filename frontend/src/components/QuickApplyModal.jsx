import React, { useState } from 'react';
import { Send, ShieldCheck, DollarSign, Clock, X } from 'lucide-react';

export default function QuickApplyModal({ project, onClose, onSubmitProposal }) {
  const defaultBid = project ? (project.minBudget || 2500) : 2500;
  const [bidAmount, setBidAmount] = useState(defaultBid);
  const [estTime, setEstTime] = useState('10 Days');
  const [coverLetter, setCoverLetter] = useState(
    'Hi! I have extensive experience in this area and can deliver clean, high-quality results for your project on time.'
  );

  const platformFee = Math.round(bidAmount * 0.05); // 5% fee
  const netPayout = bidAmount - platformFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProposal({
      jobId: project._id || project.id,
      role: project.title,
      clientName: project.client?.name || 'Client',
      bidAmount: `$${Number(bidAmount).toLocaleString()}.00`,
      estTime,
      coverLetter,
      submittedDate: 'Today',
      status: 'Pending Review'
    });
    onClose();
  };

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content apply-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">APPLY FOR THIS JOB</span>
            <h2>Send Your Offer to Client</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-project-summary card-box">
          <h3>{project.title}</h3>
          <div className="summary-meta">
            <span>Client: <strong>{project.client?.name || 'Verified Client'}</strong></span>
            <span>Client's Budget: <strong>{project.budget}</strong></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="fee-calculator-box card-box">
            <h4>Your Price & What You Will Earn</h4>
            <div className="calc-row">
              <label>What do you want to charge for this job ($ USD):</label>
              <div className="input-with-dollar">
                <span>$</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="calc-breakdown">
              <div className="calc-item">
                <span>Platform fee (5%):</span>
                <span className="text-red">-${platformFee.toLocaleString()}</span>
              </div>
              <div className="calc-item total-net">
                <strong>You will receive:</strong>
                <strong className="text-blue">${netPayout.toLocaleString()}.00</strong>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>How many days will you take to finish?</label>
            <input
              type="text"
              value={estTime}
              onChange={(e) => setEstTime(e.target.value)}
              placeholder="e.g. 7 Days, 2 Weeks"
              required
            />
          </div>

          <div className="form-group">
            <label>Message to the Client</label>
            <textarea
              rows="4"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the client how you will do this work and why you are a great choice..."
              required
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Send size={16} />
              <span>Send Application to Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
