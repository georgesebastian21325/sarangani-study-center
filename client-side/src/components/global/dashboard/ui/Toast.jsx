import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export const Toast = ({ toasts }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto ${
          toast.exiting ? 'toast-exit' : 'toast-enter'
        } ${
          toast.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : toast.type === 'error'
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}
        style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px' }}
      >
        {toast.type === 'success' ? (
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
        ) : toast.type === 'error' ? (
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
        ) : (
          <Loader2 size={16} className="text-amber-500 flex-shrink-0 od-spin" />
        )}
        {toast.message}
      </div>
    ))}
  </div>
);

