import React from 'react';
import { Check, Bell, ShieldCheck, MessageCircle } from 'lucide-react';

export default function NotificationsPopover({ notifications, setNotifications, onClose }) {
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="popover-panel notifications-popover">
      <div className="popover-header">
        <h4>Notifications</h4>
        <button className="mark-read-btn" onClick={markAllRead}>Mark all as read</button>
      </div>
      <div className="popover-list">
        {notifications.map(item => (
          <div key={item.id} className={`notif-item ${item.unread ? 'unread' : ''}`}>
            <div className="notif-icon">
              {item.title.includes('Escrow') || item.title.includes('Approved') ? (
                <ShieldCheck size={16} className="text-green" />
              ) : (
                <MessageCircle size={16} className="text-blue" />
              )}
            </div>
            <div className="notif-body">
              <p className="notif-title">{item.title}</p>
              <p className="notif-msg">{item.message}</p>
              <span className="notif-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
