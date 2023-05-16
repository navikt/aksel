import { withErrorBoundary } from "@/error-boundary";
import cl from "clsx";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React from "react";
import { CodeSnippetT } from "@/types";
import { CopyButton } from "@navikt/ds-react";
import style from "./index.module.css";

const CodeSnippet = ({
  node: { code },
  className,
  ...props
}: {
  node: CodeSnippetT;
  className?: string;
  style?: any;
}) => {
  if (!code || !code.code) {
    return null;
  }

  let language = (code?.language as Language) ?? "bash";

  switch (code?.language) {
    case "js":
      language = "javascript";
      break;
    case "html":
      language = "markup";
      break;
    case "terminal":
      language = "bash";
      break;
    default:
      break;
  }

  return (
    <>
      <div
        className={cl(
          className,
          "relative mb-8 grid max-h-96 overflow-x-auto rounded bg-[#0f172a]"
        )}
        {...props}
      >
        <CopyButton
          data-theme="dark"
          copyText={code.code}
          className={cl(style.copybutton, "absolute top-2 right-2 z-10")}
        />
        <Highlight
          code={code.code}
          language={language}
          {...defaultProps}
          theme={undefined}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-text-on-inverted relative m-0 mr-16 overflow-x-auto overflow-y-auto rounded-lg bg-[#0f172a] p-4 font-mono">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className="text-medium whitespace-pre break-words"
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
