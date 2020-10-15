import React, { useEffect } from "react";
import Prism from "prismjs";
import classnames from "classnames";
// import 'prismjs/themes/prism-okaidia.css';

import "./styles.less";

const Codeblock = ({ children, className = "", ...rest }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <figure role="figure" aria-label="Kode-eksempel">
      <pre className={classnames(className, "language-")} {...rest}>
        <code className={classnames(className, "language-")}>{children}</code>
      </pre>
    </figure>
  );
};

export const InlineCode = (props) => (
  <code className="inline">{props.children}</code>
);

export const Bash = (props) => <code className="bash">{props.children}</code>;

export default Codeblock;
