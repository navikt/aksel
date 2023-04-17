import { withErrorBoundary } from "@/error-boundary";
import cl from "clsx";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React from "react";
import CopyButton from "./CopyButton";
import { CodeSnippetT } from "@/types";

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
        <CopyButton content={code.code} />
        <Highlight
          code={code.code}
          language={language}
          {...defaultProps}
          theme={undefined}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-text-on-inverted relative m-0 overflow-x-auto overflow-y-auto rounded-lg bg-[#0f172a] p-4 pr-16 font-mono">
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
