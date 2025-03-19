"use client";

import cl from "clsx";
import { Highlight, themes } from "prism-react-renderer";
import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";

/* @ts-expect-error Import is valid, workspace just can't resolve it */
import { Tabs, TabsList, TabsPanel, TabsTab } from "@navikt/ds-react/Tabs";
import styles from "./CodeBlock.module.css";

const TEST_STRING = `import { Box, HGrid } from "@navikt/ds-react";

const Example = () => {

  return (
      <Box background="surface-alt-3-subtle">
        <div />
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </Box>
  );
}
`;

function CodeBlock() {
  const showLineNumbers = true;

  return (
    <div className="dark">
      <Highlight code={TEST_STRING} language="tsx" theme={themes.jettwaveDark}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cl(
              styles.codeBlockPre,
              showLineNumbers && styles.codeBlockWithLineNumbers,
            )}
          >
            <code>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={styles.codeBlockLine}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <Tabs defaultValue="logg">
        <TabsList>
          <TabsTab
            value="logg"
            label="Logg"
            icon={<ClockDashedIcon aria-hidden />}
          />
          <TabsTab
            value="inbox"
            label="Inbox"
            icon={<InboxDownIcon aria-hidden />}
          />
          <TabsTab
            value="sendt"
            label="Sendt"
            icon={<PaperplaneIcon aria-hidden />}
          />
        </TabsList>
        <TabsPanel value="logg" className="h-24 w-full bg-gray-50 p-4">
          Logg-tab
        </TabsPanel>
        <TabsPanel value="inbox" className="h-24 w-full bg-gray-50 p-4">
          Inbox-tab
        </TabsPanel>
        <TabsPanel value="sendt" className="h-24 w-full bg-gray-50 p-4">
          Sendt-tab
        </TabsPanel>
      </Tabs>
    </div>
  );
}

export { CodeBlock };
