import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ setActiveView }) {
  return (
    <footer className="main-footer">
      <div className="footer-top container">
        {/* Brand info */}
        <div className="footer-brand">
          <div className="logo-brand">
            <div className="logo-icon">
              <span className="logo-f">F</span>
            </div>
            <span className="logo-text">FreelanceHub</span>
          </div>
          <p className="footer-desc">
            A friendly and safe place to find freelance work or hire skilled professionals with protected payments.
          </p>

          <div className="escrow-pill-box">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>Safe Payments</strong>
              <p>Money is held safely until client reviews and approves your work</p>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="footer-columns">
          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              <li><a href="#dev" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>Web Development</a></li>
              <li><a href="#ai" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>AI & Tech</a></li>
              <li><a href="#design" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>Design & Logo</a></li>
              <li><a href="#writing" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>Writing & Translation</a></li>
              <li><a href="#marketing" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>Marketing & Sales</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#find" onClick={(e) => { e.preventDefault(); setActiveView('find-talent'); }}>Find Freelancers</a></li>
              <li><a href="#jobs" onClick={(e) => { e.preventDefault(); setActiveView('browse-projects'); }}>Browse Jobs</a></li>
              <li><a href="#how" onClick={(e) => { e.preventDefault(); setActiveView('landing'); }}>How It Works</a></li>
              <li><a href="#post" onClick={(e) => { e.preventDefault(); setActiveView('browse-projects'); }}>Post a Job</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Help & Trust</h5>
            <ul>
              <li><a href="#safety">Payment Safety Guarantee</a></li>
              <li><a href="#help">Help & FAQ</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2026 FreelanceHub. All rights reserved. Safe and guaranteed payments for everyone.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
