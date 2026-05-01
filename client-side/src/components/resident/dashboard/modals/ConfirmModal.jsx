import { AlertCircle, Calendar, CheckCircle2, Loader2, X } from 'lucide-react';
import { MEAL_COLORS } from '../../../global/dashboard/data/mealConstants';
import { getModifiedDates } from '../data/helpers';

export const ConfirmModal = ({
  open,
  onClose,
  mealSelections,
  requestData,
  onSubmit,
  submitting,
  submitError,
}) => {
  if (!open) return null;

  const modifiedDates = getModifiedDates(mealSelections, requestData);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[60] p-4"
      style={{ background: 'rgba(15,8,4,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-2xl flex flex-col shadow-2xl"
        style={{
          background: '#faf7f0',
          border: '1px solid #e8dece',
          borderRadius: '10px',
          maxHeight: '82vh',
        }}
      >
        <div
          className="p-6 flex justify-between items-center"
          style={{
            borderBottom: '1px solid #e8dece',
            background: '#fff',
            borderRadius: '10px 10px 0 0',
          }}
        >
          <div>
            <h2
              className="od-garamond font-bold"
              style={{ color: '#5a0a1e', fontSize: '30px' }}
            >
              Review Your Selection
            </h2>
            <p
              className="mt-0.5"
              style={{
                color: '#9c856a',
                fontFamily: "'Crimson Text', serif",
                fontSize: '17px',
              }}
            >
              {modifiedDates.length} day{modifiedDates.length !== 1 ? 's' : ''}{' '}
              scheduled
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 transition-colors"
            style={{ color: '#9c856a' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {modifiedDates.length === 0 ? (
            <div className="text-center py-14 flex flex-col items-center gap-3">
              <Calendar size={36} style={{ color: '#d4b896' }} />
              <p
                className="italic"
                style={{
                  color: '#9c856a',
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '19px',
                }}
              >
                No meals selected yet. Click on a date to get started.
              </p>
            </div>
          ) : (
            modifiedDates.map((dateKey) => (
              <ConfirmDateCard
                key={dateKey}
                dateKey={dateKey}
                meals={mealSelections[dateKey] || []}
                request={requestData[dateKey]}
              />
            ))
          )}
        </div>

        {submitError && (
          <div
            className="mx-6 mb-0 p-3 rounded-lg flex items-center gap-2"
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontFamily: "'Crimson Text', serif",
              fontSize: '17px',
            }}
          >
            <AlertCircle size={17} className="flex-shrink-0" />
            {submitError}
          </div>
        )}

        <div
          className="p-6 flex gap-3"
          style={{
            borderTop: '1px solid #e8dece',
            background: '#f7f4ee',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <button
            className="od-btn-ghost flex-1"
            onClick={onClose}
            disabled={submitting}
          >
            Back to Edit
          </button>
          <button
            className="od-btn-primary flex-1 justify-center"
            disabled={modifiedDates.length === 0 || submitting}
            onClick={onSubmit}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="od-spin" />
                Submitting…
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                Confirm & Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmDateCard = ({ dateKey, meals, request }) => {
  const hasRequest =
    request &&
    (request.viand || request.sandwich || request.eggs || request.guests > 0);

  return (
    <div
      className="p-4 flex flex-col md:flex-row md:justify-between gap-3"
      style={{
        background: '#fff',
        border: '1px solid #e8dece',
        borderRadius: '8px',
      }}
    >
      <div>
        <h3
          className="font-bold flex items-center gap-2 mb-2"
          style={{ color: '#5a0a1e', fontSize: '17px' }}
        >
          <Calendar size={16} style={{ flexShrink: 0 }} />
          {dateKey}
        </h3>
        {meals.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {meals.map((meal) => (
              <span
                key={meal}
                className="od-chip"
                style={{
                  background: `${MEAL_COLORS[meal]}18`,
                  color: MEAL_COLORS[meal],
                  border: `1px solid ${MEAL_COLORS[meal]}40`,
                }}
              >
                {meal}
              </span>
            ))}
          </div>
        )}
      </div>

      {hasRequest && (
        <div
          className="text-xs pt-2 md:pt-0 md:pl-4 flex-shrink-0"
          style={{ borderTop: '1px solid #f0ebe3', color: '#7a6355' }}
        >
          <span
            className="uppercase tracking-wider font-bold block mb-1.5"
            style={{
              fontSize: '11px',
              color: '#9e7c2e',
              fontFamily: "'Cinzel', serif",
            }}
          >
            Special Requests
          </span>
          <ul
            className="space-y-0.5 list-disc list-inside"
            style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px' }}
          >
            {request.viand && <li>Extra Viand</li>}
            {request.sandwich && <li>Sandwich</li>}
            {request.eggs && <li>Eggs</li>}
            {request.guests > 0 && <li>Guests: {request.guests}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
