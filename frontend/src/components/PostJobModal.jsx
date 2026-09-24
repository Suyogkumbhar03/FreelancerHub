import React, { useState } from 'react';
import { Plus, X, ShieldCheck, Loader2 } from 'lucide-react';

export default function PostJobModal({ onClose, onAddJob }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web & Software Dev');
  const [budget, setBudget] = useState('2500');
  const [engagement, setEngagement] = useState('Fixed-Price');
  const [experience, setExperience] = useState('Intermediate');
  const [tags, setTags] = useState('React, Node.js, Web Development');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setError('');
    setLoading(true);

    const jobData = {
      title: title.trim(),
      category,
      budget: Number(budget) || 2000,
      engagement,
      experience,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      description: description.trim()
    };

    try {
      await onAddJob(jobData);
      onClose();
    } catch (err) {
      setError(err.message || 'Could not post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content post-job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center gap-2">
            <Plus className="text-blue" size={24} />
            <h2>Post a New Job</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        {error && (
          <div className="auth-error-banner" style={{ margin: '14px 24px 0', background: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              placeholder="e.g. Build an E-Commerce Website with React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Web & Software Dev">Web & Software Dev</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                <option value="Mobile Engineering">Mobile Engineering</option>
                <option value="Growth & Technical Writing">Writing & Marketing</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Payment Type</label>
              <select value={engagement} onChange={(e) => setEngagement(e.target.value)}>
                <option value="Fixed-Price">Fixed Price (One-time payment)</option>
                <option value="Hourly Rate">Hourly Rate (Pay per hour)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Your Budget ($ USD) *</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <div className="form-group flex-1">
              <label>Experience Level Needed</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="Entry">Beginner Level</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Expert">Expert Level</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Skills Needed (separate with commas)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. React, Logo Design, WordPress"
            />
          </div>

          <div className="form-group">
            <label>Job Description & Details *</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what needs to be done, requirements, and anything the freelancer should know..."
              required
            ></textarea>
          </div>

          <div className="escrow-notice-banner">
            <ShieldCheck size={20} className="text-blue" />
            <p>Safe Payment: Your money is held safely and only sent to the freelancer after you review and approve their finished work.</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Posting Job...' : 'Post Job for Freelancers'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
