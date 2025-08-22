import React from 'react';

interface RightColGridProps {
  children: React.ReactNode;
  className?: string;
}

function RightColGrid({ children, className }: RightColGridProps) {
  return (
    <section
      className={`md:col-start-6 md:col-end-13 col-start-1 col-end-13 rounded-tl-2xl rounded-bl-2xl overflow-hidden ${className ?? ''}`}
    >
      {children}
    </section>
  );
}

export default RightColGrid;
