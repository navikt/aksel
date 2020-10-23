import React from "react";
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
  const highlighted = Prism.highlight(children, Prism.languages.jsx);
  return (
    <figure role="figure" aria-label="Kode-eksempel">
      <pre className="language-">
        <code
          className={classnames(className)}
          {...props}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        ></code>
      </pre>
    </figure>
  );
};

export default Code;
