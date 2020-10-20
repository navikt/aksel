import React, { useEffect } from "react";
import classnames from "classnames";
import Prism from "prismjs";

export interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineCode = ({ children, className, ...props }: CodeProps) => (
  <code className={classnames(className, "inline")} {...props}>
    {children}
  </code>
);

export const Bash = ({ children, className, ...props }: CodeProps) => (
  <code className={classnames(className, "bash")} {...props}>
    {children}
  </code>
);

const Code = ({ children, className, ...props }: CodeProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <figure role="figure" aria-label="Kode-eksempel">
      <pre>
        <code className={classnames(className, "language-")} {...props}>
          {children}
        </code>
      </pre>
    </figure>
  );
};

export default Code;
