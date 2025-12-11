"use client";

import { Highlight } from "prism-react-renderer";
import { useId, useRef } from "react";
import { ChevronDownUpIcon, ChevronUpDownIcon } from "@navikt/aksel-icons";
import { Button, CopyButton, HStack, Spacer, Tabs } from "@navikt/ds-react";
import { TabsList, TabsPanel, TabsTab } from "@navikt/ds-react/Tabs";
import styles from "./CodeBlock.module.css";
import {
  CodeBlockProvider,
  CodeBlockTabsT,
  useCodeBlock,
} from "./CodeBlock.provider";
import { AkselPrismTheme } from "./CodePrismTheme";

type CodeBlockT = {
  tabs: CodeBlockTabsT;
  showLineNumbers?: boolean;
  defaultWrap?: boolean;
};

function CodeBlock(props: CodeBlockT & React.HTMLAttributes<HTMLDivElement>) {
  const { tabs, showLineNumbers = true, defaultWrap, ...rest } = props;

  return (
    <CodeBlockProvider
      tabs={tabs}
      showLineNumbers={showLineNumbers}
      defaultWrap={defaultWrap}
    >
      <CodeBlockView {...rest} />
    </CodeBlockProvider>
  );
}

function CodeBlockView(props: React.HTMLAttributes<HTMLDivElement>) {
  const { useTabs, tabs, codeSnippet } = useCodeBlock();

  if (useTabs) {
    return (
      <section
        aria-label="Kode"
        data-axe-ignore
        data-block-margin="space-28"
        className={styles.codeBlock}
        {...props}
      >
        <Tabs defaultValue={tabs[0].value ?? ""} onChange={codeSnippet.update}>
          <CodeBlockHeader />
          {tabs?.map((tab) => (
            <CodeBlockEditor
              value={tab.value}
              key={tab.value}
              code={tab.code}
              extraCode={tab.extraCode}
              lang={tab.lang ?? "tsx"}
            />
          ))}
        </Tabs>
      </section>
    );
  }

  return (
    <section
      aria-label="Kode"
      data-axe-ignore
      data-block-margin="space-28"
      className={styles.codeBlock}
      {...props}
    >
      <CodeBlockHeader />
      {tabs?.map((tab) => (
        <CodeBlockEditor
          value={tab.value}
          key={tab.value}
          code={tab.code}
          extraCode={tab.extraCode}
          lang={tab.lang ?? "tsx"}
        />
      ))}
    </section>
  );
}

function CodeBlockEditor(props: {
  value: string;
  code: string;
  extraCode?: string;
  lang: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { value, code, extraCode, lang } = props;
  const { expanded, codeSnippet, useTabs, showLineNumbers, wrapCode } =
    useCodeBlock();

  const showExpander = !!extraCode || code.split("\n").length > 16;
  const showOverflow = !!extraCode || expanded.current;
  const visibleCode = (expanded.current ? (extraCode ?? code) : code).trim();

  const Wrapper = useTabs ? TabsPanel : "div";

  const handleExpandUpdate = () => {
    codeSnippet.update(value, !expanded.current);
    expanded.toggle();

    if (expanded.current) {
      /* Scroll to the top of the code block when collapsed */
      queueMicrotask(() => {
        wrapperRef.current?.scrollIntoView({
          block: "center",
        });
      });
    }
  };

  return (
    <Wrapper value={value} ref={wrapperRef}>
      <Highlight
        code={visibleCode}
        language={getLanguage(lang)}
        theme={AkselPrismTheme}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className={styles.codeBlockPre}
            data-line-numbers={showLineNumbers}
            data-wrap={wrapCode.current}
            data-overflow={showOverflow}
          >
            <code>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                const lineText = line.map((t) => t.content).join("");
                const lineMark = getLineMark(lang, lineText);

                return (
                  <div
                    key={i}
                    {...lineProps}
                    style={{ ...lineProps.style, "--line": `"${i + 1}"` }}
                    className={styles.codeBlockLine}
                    data-line-mark={lineMark}
                  >
                    {line.map((token, key) => {
                      let content = token.content;
                      if (key === 0 && lineMark) {
                        content = content.replace(/^[+->]/, "");
                      }
                      const tokenProps = { ...getTokenProps({ token }) };
                      return (
                        <span
                          key={key}
                          {...tokenProps}
                          style={{
                            ...tokenProps.style,
                            color:
                              lineMark === "add"
                                ? "var(--ax-text-success)"
                                : lineMark === "remove"
                                  ? "var(--ax-text-danger)"
                                  : tokenProps.style?.color,
                          }}
                        >
                          {content}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
      {showExpander && (
        <button
          className={styles.codeBlockExpander}
          onClick={handleExpandUpdate}
        >
          {expanded.current ? (
            <>
              <span>Vis mindre kode</span>
              <ChevronDownUpIcon aria-hidden="true" />
            </>
          ) : (
            <>
              <span>Vis all kode</span>
              <ChevronUpDownIcon aria-hidden="true" />
            </>
          )}
        </button>
      )}
    </Wrapper>
  );
}

function CodeBlockHeader() {
  const { tabs } = useCodeBlock();

  if (!tabs || tabs.length === 0) {
    return null;
  }

  if (tabs.length > 1) {
    return (
      <div className={styles.codeBlockHeader}>
        <TabsList className={styles.codeBlockTabList}>
          {tabs.map((tab) => (
            <TabsTab key={tab.value} value={tab.value} label={tab.text} />
          ))}
        </TabsList>
        <ActionButtons />
      </div>
    );
  }

  return (
    <div className={styles.codeBlockHeader}>
      <div className={styles.codeBlockHeaderItem}>{tabs[0]?.text}</div>
      <Spacer />
      <ActionButtons />
    </div>
  );
}

function ActionButtons() {
  const { codeSnippet, wrapCode } = useCodeBlock();

  const titleId = useId();

  return (
    <HStack gap="space-4" align="center" wrap={false}>
      <Button
        size="small"
        variant="tertiary-neutral"
        onClick={wrapCode.toggle}
        icon={
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby={titleId}
          >
            <title id={titleId}>
              {wrapCode.current ? "Deaktiver linjeskift" : "Aktiver linjeskift"}
            </title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.0303 20.0303C20.3232 19.7374 20.3232 19.2626 20.0303 18.9697C19.7374 18.6768 19.2626 18.6768 18.9697 18.9697L16.4697 21.4697C16.1768 21.7626 16.1768 22.2374 16.4697 22.5303L18.9697 25.0303C19.2626 25.3232 19.7374 25.3232 20.0303 25.0303C20.3232 24.7374 20.3232 24.2626 20.0303 23.9697L18.8107 22.75L22 22.75C24.0711 22.75 25.75 21.0711 25.75 19C25.75 16.9289 24.0711 15.25 22 15.25L7 15.25C6.58578 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58578 16.75 7 16.75L22 16.75C23.2426 16.75 24.25 17.7574 24.25 19C24.25 20.2426 23.2426 21.25 22 21.25L18.8107 21.25L20.0303 20.0303ZM7 9.25C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75L25 10.75C25.4142 10.75 25.75 10.4142 25.75 10C25.75 9.58579 25.4142 9.25 25 9.25L7 9.25ZM7 21.25C6.58578 21.25 6.25 21.5858 6.25 22C6.25 22.4142 6.58578 22.75 7 22.75L14 22.75C14.4142 22.75 14.75 22.4142 14.75 22C14.75 21.5858 14.4142 21.25 14 21.25L7 21.25Z"
              fill="currentColor"
            />
          </svg>
        }
      />
      {codeSnippet.current && (
        <CopyButton copyText={codeSnippet.current} size="small" />
      )}
    </HStack>
  );
}

function getLanguage(lang: string) {
  let language = lang;
  switch (lang) {
    case "js":
      language = "jsx";
      break;
    case "scss":
      language = "css";
      break;
    case "less":
      language = "css";
      break;
    case "diff":
      language = "diff";
      break;
    default:
      break;
  }

  return language;
}

function getLineMark(lang: string, lineText: string) {
  const trimmed = lineText.trimStart();

  /* Ignore empty lines or lines with only the marker */
  if (trimmed.length <= 1) return undefined;

  /* Highlight works for any language */
  if (trimmed.startsWith(">")) return "highlight";

  /* Add/remove only applies to diff language */
  if (lang !== "diff") return undefined;
  if (trimmed.startsWith("+")) return "add";
  if (trimmed.startsWith("-")) return "remove";

  return undefined;
}

export { CodeBlock };
