import { useState } from 'react';
import { AlertCircle, Bell, Loader2, X } from 'lucide-react';

export const RemindModal = ({ open, onClose, onSend, sending }) => {
  const [message, setMessage] = useState('');
  if (!open) return null;

  const defaultMsg =
    'Kindly submit your meal log for today before the deadline. Thank you!';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(15,8,4,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-md shadow-2xl"
        style={{
          background: '#faf7f0',
          border: '1px solid #e8dece',
          borderRadius: '10px',
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2
              className="od-garamond text-2xl font-bold"
              style={{ color: '#5a0a1e' }}
            >
              Blast Reminders
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-stone-100"
              style={{ color: '#9c856a' }}
            >
              <X size={20} />
            </button>
          </div>
          <p
            className="text-sm mb-5"
            style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}
          >
            Send a reminder to all residents who have not yet submitted their
            meal log.
          </p>

          <div className="mb-4">
            <label
              className="block mb-1.5"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9e7c2e',
              }}
            >
              Message
            </label>
            <textarea
              rows={3}
              placeholder={defaultMsg}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #e8dece',
                borderRadius: '6px',
                padding: '10px 14px',
                fontFamily: "'Crimson Text', serif",
                fontSize: '16px',
                color: '#3b1a0a',
                background: '#faf7f0',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>

          <div
            className="p-3 rounded-lg mb-4 flex items-start gap-2"
            style={{ background: '#fff8e6', border: '1px solid #e8c96e40' }}
          >
            <AlertCircle
              size={14}
              className="flex-shrink-0 mt-0.5"
              style={{ color: '#9e7c2e' }}
            />
            <p
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: '13px',
                color: '#7a6040',
              }}
            >
              This will notify <strong>3 residents</strong> who have pending
              meal logs today.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="od-btn-ghost flex-1"
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button
              className="od-btn-primary flex-1 justify-center"
              onClick={() => onSend(message || defaultMsg)}
              disabled={sending}
            >
              {sending ? (
                <>
                  <Loader2 size={14} className="od-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Bell size={14} />
                  Send Reminder
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

