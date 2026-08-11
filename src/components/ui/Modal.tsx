import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

/** Shared modal shell that portals to body and locks scroll. */
export function Modal({ onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <div className={`m-auto w-full ${maxWidth}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
