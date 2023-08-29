import { withErrorBoundary } from "@/error-boundary";
import cl from "clsx";
import { Highlight, Language } from "prism-react-renderer";
import React from "react";
import { CodeSnippetT } from "@/types";
import { CopyButton } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import dracula from "./theme";

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
          "bg-deepblue-900 shadow-small relative mb-7 grid rounded-lg"
        )}
        {...props}
      >
        <div className="bg-deepblue-900 absolute right-4 top-[6px] z-10 rounded-lg p-1 group-[.aksel-artikkel]/aksel:hidden">
          <CopyButton data-theme="dark" size="small" copyText={code.code} />
        </div>
        <Highlight code={code.code} language={language} theme={dracula}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-medium m-0 flex rounded-lg">
              <code className="max-h-96 min-w-full flex-none overflow-auto p-4 leading-6">
                {tokens.map((line, i) => (
                  <span
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className={cl(
                      language === "bash" ? "flex items-center" : "block"
                    )}
                  >
                    {language === "bash" && (
                      <ChevronRightIcon className="mr-2 h-5 w-auto flex-none overflow-visible text-pink-400" />
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
