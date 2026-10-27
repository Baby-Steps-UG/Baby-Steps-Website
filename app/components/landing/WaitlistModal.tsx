import type { FormEvent } from "react";

interface WaitlistModalProps {
  isOpen: boolean;
  joined: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function WaitlistModal({ isOpen, joined, onClose, onSubmit }: WaitlistModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="waitlist-backdrop" onClick={onClose} role="presentation">
      <div
        aria-labelledby="waitlist-title"
        aria-modal="true"
        className="waitlist-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close waitlist dialog"
          className="waitlist-close"
          onClick={onClose}
          type="button"
        >
          x
        </button>
        <h3 className="waitlist-title" id="waitlist-title">
          Join the Baby Steps waitlist
        </h3>

        {joined ? (
          <p className="waitlist-success">
            You are on the list. We will email you as soon as Baby Steps is live.
          </p>
        ) : (
          <form className="waitlist-form" onSubmit={onSubmit}>
            <label className="waitlist-field">
              <span>Name</span>
              <input name="name" placeholder="Your name" required type="text" />
            </label>
            <label className="waitlist-field">
              <span>Email</span>
              <input name="email" placeholder="you@example.com" required type="email" />
            </label>
            <button className="waitlist-submit" type="submit">
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
