import { Loader2, ChevronRight } from 'lucide-react';

export function SubmitButton({ loading, handleSubmit }) {
  return (
    <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
      {loading ? (
        <>
          <Loader2 size={15} className="od-spin" /> Signing in…
        </>
      ) : (
        <>
          Sign In <ChevronRight size={15} />
        </>
      )}
    </button>
  );
}
