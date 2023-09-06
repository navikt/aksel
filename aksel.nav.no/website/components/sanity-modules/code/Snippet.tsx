import { withErrorBoundary } from "@/error-boundary";
import cl from "clsx";
import { Highlight, Language } from "prism-react-renderer";
import React from "react";
import { CodeSnippetT } from "@/types";
import { CopyButton, Label } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import dracula from "./theme";

const CodeSnippet = ({ node: { code, title } }: { node: CodeSnippetT }) => {
  if (!code || !code.code) {
    return null;
  }

  let language = (code?.language as Language) ?? "bash";

  switch (code?.language) {
    case "js":
      language = "javascript";
      break;
    case "bash":
      language = "terminal";
      break;
    default:
      break;
  }

  return (
    <section
      aria-label="Kode"
      className="aksel-codesnippet relative mb-7 grid rounded-lg bg-[#282a36] last:mb-0"
    >
      <div className="text-text-on-inverted text-medium relative flex leading-6">
        <div className="mt-2 flex flex-none items-center border-b border-b-gray-200 border-t-transparent px-4 py-1.5 text-gray-100">
          {!title ? (
            <Label as="span" className="uppercase">
              {language}
            </Label>
          ) : (
            <Label as="span">{title}</Label>
          )}
        </div>
        <div className="mt-2 flex h-10 flex-auto rounded-tl bg-[#44475a] shadow-inner" />

        <CopyButton
          data-theme="dark"
          size="small"
          copyText={code.code}
          className="absolute right-2 top-3"
        />
      </div>
      <Highlight code={code.code} language={language} theme={dracula}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="text-medium m-0 flex overflow-auto rounded-lg leading-6">
            <code className="max-h-96 min-w-full flex-none p-4 pb-4">
              {tokens.map((line, i) => (
                <span
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className={cl(
                    "last-of-type:pb-4",
                    language === "terminal" ? "flex items-center" : "block"
                  )}
                >
                  {language === "terminal" && (
                    <ChevronRightIcon
                      aria-hidden
                      className="mr-2 h-5 w-auto flex-none overflow-visible text-pink-400"
                    />
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
    </section>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
