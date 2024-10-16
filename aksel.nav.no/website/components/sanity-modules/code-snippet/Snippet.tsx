import cl from "clsx";
import { Highlight, Language } from "prism-react-renderer";
import { ChevronRightIcon, TerminalIcon } from "@navikt/aksel-icons";
import { CopyButton, Label } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { CodeSnippetT } from "@/types";
import theme from "./theme";

type CodeSnippetProps = {
  node: CodeSnippetT;
};

const CodeSnippet = ({ node: { code, title } }: CodeSnippetProps) => {
  if (!code || !code.code) {
    return null;
  }

  let language = (code?.language as Language) ?? "bash";

  switch (code?.language) {
    case "js":
      language = "javascript";
      break;
    case "jsx":
      language = "tsx";
      break;
    case "scss":
      language = "css";
      break;
    case "less":
      language = "css";
      break;
    default:
      break;
  }

  const terminalStyling = (lang) => lang === "bash" || lang === "terminal";
  const Title = ({ input }) =>
    input === "bash" || input === "terminal" ? (
      <TerminalIcon title="terminal" fontSize="1.5rem" />
    ) : (
      <span>{input}</span>
    );

  return (
    <section
      aria-label="Kode"
      className="aksel-codesnippet relative mb-7 grid rounded-lg bg-surface-inverted last:mb-0"
    >
      <div className="relative flex text-medium leading-6 text-text-on-inverted">
        <div className="mt-2 flex flex-none items-center border-b border-b-gray-200 border-t-transparent px-4 py-1.5 text-gray-100">
          {!title ? (
            <Label as="span" className="uppercase">
              <Title input={language} />
            </Label>
          ) : (
            <Label as="span">{title}</Label>
          )}
        </div>
        <div className="mt-2 flex h-10 flex-auto rounded-tl bg-gray-100/10 shadow-inner" />

        <CopyButton
          data-theme="dark"
          size="small"
          copyText={code.code}
          className="absolute right-2 top-3"
        />
      </div>
      <Highlight code={code.code} language={language} theme={theme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="m-0 flex overflow-auto rounded-lg text-medium leading-6">
            <code className="max-h-80 min-w-full flex-none p-4 pb-0">
              {tokens.map((line, i) => (
                <span
                  key={i}
                  {...getLineProps({ line })}
                  className={cl(
                    "last-of-type:pb-4",
                    terminalStyling(language) ? "flex items-center" : "block",
                  )}
                >
                  {terminalStyling(language) && (
                    <ChevronRightIcon
                      aria-hidden
                      className="mr-2 h-5 w-auto flex-none overflow-visible text-pink-400"
                    />
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                  {`\n` /* Needed for copy-pasting in some browsers */}
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </section>
  );
};

export default function Component(props: CodeSnippetProps) {
  return (
    <ErrorBoundary boundaryName="Kodesnippet">
      <CodeSnippet {...props} />
    </ErrorBoundary>
  );
}
