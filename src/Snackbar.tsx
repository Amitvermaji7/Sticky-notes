import React from "react";

interface SnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  open: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, actionLabel, onAction, open, onClose }) => {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="snackbar">
      <span>{message}</span>
      {actionLabel && (
        <button className="snackbar-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Snackbar;