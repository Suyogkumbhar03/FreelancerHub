import React, { useState } from 'react';
import { UploadCloud, Link as LinkIcon, CheckCircle2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { apiSubmitContractWork } from '../api';

export default function SubmitWorkModal({ contract, token, onClose, onWorkSubmitted }) {
  const [deliverablesLink, setDeliverablesLink] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliverablesLink.trim() && !notes.trim()) {
      setError('Please provide a link or notes explaining your completed work.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updatedContract = await apiSubmitContractWork(
        contract._id || contract.id,
        { link: deliverablesLink.trim(), notes: notes.trim() },
        token
      );
      onWorkSubmitted(updatedContract);
      alert('Work submitted successfully! Your client will review it and release your payment.');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit work. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content submit-work-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">SUBMIT YOUR WORK</span>
            <h2>Send Completed Work to Client</h2>
            <p className="modal-sub-title">Job: <strong>{contract.title}</strong> • Payment: <strong>{contract.escrowProtected || contract.totalValue}</strong></p>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Link to Your Finished Work (GitHub, Google Drive, Figma, or Website) *</label>
            <div className="input-icon-wrapper">
              <LinkIcon size={18} className="input-icon" />
              <input
                type="url"
                placeholder="https://github.com/... or Google Drive link"
                value={deliverablesLink}
                onChange={(e) => setDeliverablesLink(e.target.value)}
                required
              />
            </div>
            <span className="field-hint">Paste the link where the client can view, test, or download your work.</span>
          </div>

          <div className="form-group">
            <label>Message / Notes for the Client *</label>
            <textarea
              rows="4"
              placeholder="Explain what you built and how the client can check it..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="escrow-notice-banner">
            <ShieldCheck size={20} className="text-blue" />
            <div>
              <strong>Safe Payment Guarantee</strong>
              <p>Your client ({contract.client || 'Client'}) has already deposited <strong>{contract.escrowProtected || contract.totalValue}</strong> safely. When they click approve, this payment is sent straight to your earnings.</p>
            </div>
          </div>

          <div className="modal-footer justify-between">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <UploadCloud size={16} />
              <span>{loading ? 'Sending Work...' : 'Send Work to Client'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
