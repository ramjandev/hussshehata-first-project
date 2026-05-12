import React, { type ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return <h2 className={`text-sm text-black/60  ${className}`}>{children}</h2>;
};

export default Paragraph;
