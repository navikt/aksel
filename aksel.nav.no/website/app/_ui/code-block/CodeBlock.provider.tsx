"use client";

import { createContext, useContext, useState } from "react";

// https://github.com/FormidableLabs/prism-react-renderer/blob/e1c83a468b05df7f452b3ad7e4ae5ab874574d4e/packages/generate-prism-languages/index.ts#L9-L23
export const languages = [
  "markup",
  "jsx",
  "tsx",
  "rust",
  "graphql",
  "yaml",
  "go",
  "markdown",
  "python",
  "json",
] as const;

type CodeBlockTabsT = {
  text: string;
  value: string;
  code: string;
  extraCode?: string;
  lang: (typeof languages)[number];
}[];

type CodeBlockContextT = {
  codeSnippet: {
    current: string | null;
    update: (value: string, isExpanded?: boolean) => void;
  };
  wrapCode: {
    current: boolean;
    toggle: () => void;
  };
  expanded: {
    current: boolean;
    toggle: () => void;
  };
  tabs: CodeBlockTabsT;
  useTabs: boolean;
  showLineNumbers: boolean;
};

const CodeBlockContext = createContext<CodeBlockContextT | null>(null);

function CodeBlockProvider({
  children,
  tabs,
  showLineNumbers,
  defaultWrap = true,
}: {
  children: React.ReactNode;
  tabs: CodeBlockTabsT;
  showLineNumbers: boolean;
  defaultWrap?: boolean;
}) {
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string | null>(
    tabs?.[0]?.code ?? null,
  );
  const [wrapCode, setWrapCode] = useState(defaultWrap);
  const [expanded, setExpanded] = useState(false);

  const updateCodeSnippet = (value: string, isExpanded?: boolean) => {
    const localExpanded = isExpanded ?? expanded;

    const currentTab = tabs.find((tab) => tab.value === value);
    if (currentTab) {
      let code = currentTab.code;
      if (localExpanded && currentTab.extraCode) {
        code = currentTab.extraCode;
      }
      setCurrentCodeSnippet(code);
    }
  };

  return (
    <CodeBlockContext.Provider
      value={{
        useTabs: tabs && tabs.length > 1,
        tabs,
        showLineNumbers,
        codeSnippet: {
          current: currentCodeSnippet,
          update: updateCodeSnippet,
        },
        wrapCode: {
          current: wrapCode,
          toggle: () => setWrapCode((prev) => !prev),
        },
        expanded: {
          current: expanded,
          toggle: () => setExpanded((prev) => !prev),
        },
      }}
    >
      {children}
    </CodeBlockContext.Provider>
  );
}

function useCodeBlock() {
  const context = useContext(CodeBlockContext);

  if (!context) {
    throw new Error("useCodeBlock must be used within a CodeBlockProvider");
  }
  return context;
}

export { CodeBlockProvider, useCodeBlock };
export type { CodeBlockTabsT };
