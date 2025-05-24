import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const TooltipPortal = ({ children, x, y, onClose }: { children: React.ReactNode, x: number, y: number, onClose: () => void }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        top: y,
        left: x,
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        borderRadius: 6,
        padding: '8px 14px',
        fontSize: 14,
        zIndex: 9999,
        pointerEvents: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
        transform: 'translate(-50%, -100%)',
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default TooltipPortal; 