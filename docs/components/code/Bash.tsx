import copy from "copy-to-clipboard";
import Prism from "prismjs";
import cl from "classnames";
import { Files } from "@navikt/ds-icons";
import { Popover } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import "prismjs/components/prism-jsx.min";
import "./bash.css";

type PrismLanguages =
  | "extend"
  | "insertBefore"
  | "DFS"
  | "markup"
  | "html"
  | "mathml"
  | "svg"
  | "xml"
  | "ssml"
  | "atom"
  | "rss"
  | "css"
  | "clike"
  | "javascript"
  | "js"
  | "jsx";

export const copyCode = (content) => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

const Bash = ({
  code,
  terminal = false,
  copy = false,
  language = "html",
  ...props
}: {
  code: string;
  terminal?: boolean;
  copy?: boolean;
  language?: PrismLanguages;
}) => {
  const highlighted = terminal
    ? code
    : Prism.highlight(code, Prism.languages[language], language);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const handleCopy = () => {
    copyCode(code);
    setOpenPopover(true);
  };

  return (
    <div className={"bash__preWrapper"}>
      <pre className={"bash__pre"}>
        <code
          className={cl("bash__code", {
            bash__codeCopy: copy,
            bash__terminal: terminal,
          })}
          {...props}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        {copy && (
          <>
            <button
              ref={buttonRef}
              className={"bash__copyButton"}
              onClick={() => handleCopy()}
            >
              <Files />
            </button>
          </>
        )}
      </pre>
      <Popover
        role="alert"
        anchorEl={buttonRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        /* arrow={false} */
      >
        Kopiert!
      </Popover>
    </div>
  );
};

export default Bash;
