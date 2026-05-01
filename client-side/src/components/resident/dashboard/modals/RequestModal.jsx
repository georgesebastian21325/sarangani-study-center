import { CheckCircle2, Loader2, X } from 'lucide-react';
import { REQUEST_ITEM_LABELS, REQUEST_ITEMS } from '../data/constants';

export const RequestModal = ({
  open,
  date,
  request,
  setRequest,
  onClose,
  onSave,
  saving,
}) => {
  if (!open) return null;

  const toggle = (field) =>
    setRequest(date.toDateString(), { ...request, [field]: !request[field] });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(15,8,4,0.55)', backdropFilter: 'blur(3px)' }}
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
              className="od-garamond font-bold"
              style={{ color: '#5a0a1e', fontSize: '30px' }}
            >
              Special Requests
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-stone-100"
              style={{ color: '#9c856a' }}
            >
              <X size={22} />
            </button>
          </div>
          <p
            className="mb-6"
            style={{
              color: '#9c856a',
              fontFamily: "'Crimson Text', serif",
              fontSize: '18px',
            }}
          >
            {date?.toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-2">
            {REQUEST_ITEMS.map((item) => {
              const checked = request?.[item] || false;
              return (
                <label
                  key={item}
                  className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all"
                  style={{
                    border: checked
                      ? '1.5px solid #9e7c2e80'
                      : '1px solid #e8dece',
                    background: checked ? '#9e7c2e0a' : '#fff',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '20px',
                      color: '#3b1a0a',
                    }}
                  >
                    {REQUEST_ITEM_LABELS[item]}
                  </span>
                  <input
                    type="checkbox"
                    className="od-checkbox"
                    checked={checked}
                    onChange={() => toggle(item)}
                  />
                </label>
              );
            })}

            <div className="pt-2">
              <label
                className="block mb-1.5"
                style={{
                  fontSize: '13px',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9e7c2e',
                }}
              >
                Number of Guests
              </label>
              <input
                type="number"
                min="0"
                className="od-number-input"
                value={request?.guests || 0}
                onChange={(event) =>
                  setRequest(date.toDateString(), {
                    ...request,
                    guests: Number(event.target.value),
                  })
                }
              />
            </div>
          </div>

          <button
            className="od-btn-primary w-full mt-6 justify-center"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="od-spin" /> Saving…
              </>
            ) : (
              <>
                <CheckCircle2 size={16} /> Save Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
