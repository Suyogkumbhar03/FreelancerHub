import React, { useState } from 'react';
import { DollarSign, ShieldCheck, CheckCircle } from 'lucide-react';

export default function WithdrawModal({ availableAmount, onClose }) {
  const [amount, setAmount] = useState(availableAmount || 4820);
  const [method, setMethod] = useState('Stripe Direct Bank Transfer');

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(`Withdrawal Request of $${Number(amount).toLocaleString()}.00 via ${method} processed! Funds will arrive in 1-2 business days.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content withdraw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center gap-2">
            <DollarSign className="text-blue" size={24} />
            <h2>Withdraw Your Earnings</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="withdraw-avail-box card-box">
          <span>Money Ready to Withdraw:</span>
          <h2>${availableAmount}</h2>
        </div>

        <form onSubmit={handleWithdraw} className="modal-form">
          <div className="form-group">
            <label>Amount to Withdraw ($ USD)</label>
            <input
              type="number"
              max={availableAmount ? availableAmount.toString().replace(/[^0-9.]/g, '') : 10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>How would you like to receive your money?</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="Direct Bank Transfer">Direct Bank Transfer (1-2 days • No fee)</option>
              <option value="PayPal">PayPal</option>
              <option value="UPI / Wire Transfer">Bank Wire / UPI</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Withdraw Money</button>
          </div>
        </form>
      </div>
    </div>
  );
}
