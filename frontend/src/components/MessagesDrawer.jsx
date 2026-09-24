import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

export default function MessagesDrawer({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'Apex Branch', text: 'Hi Alex, we viewed your proposal for Next.js migration!', time: '10:42 AM' },
    { sender: 'You', text: 'Great! I am ready to start as soon as milestone 1 is funded.', time: '10:45 AM' },
    { sender: 'Apex Branch', text: 'Milestone 1 funded ($1,250.00). Looking forward to the deliverables.', time: '11:00 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input, time: 'Just now' }]);
    setInput('');
  };

  return (
    <div className="popover-panel messages-drawer">
      <div className="popover-header">
        <h4>Messages • Apex Branch</h4>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="messages-body">
        {messages.map((m, idx) => (
          <div key={idx} className={`msg-bubble ${m.sender === 'You' ? 'msg-outgoing' : 'msg-incoming'}`}>
            <span className="msg-sender">{m.sender}</span>
            <p className="msg-text">{m.text}</p>
            <span className="msg-time">{m.time}</span>
          </div>
        ))}
      </div>
      <form className="messages-input-bar" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary btn-sm"><Send size={14} /></button>
      </form>
    </div>
  );
}
