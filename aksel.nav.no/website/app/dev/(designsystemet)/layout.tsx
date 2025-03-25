import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { Sidebar } from "@/app/_ui/sidebar/Sidebar";
import styles from "./_ui/Designsystemet.module.css";

const TEST_STRING_ONE = `import { Box, HGrid } from "@navikt/ds-react";

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

const TEST_STRING_DIFF = `import { Box, HGrid } from "@navikt/ds-react";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.websitePage}>
      <Header />

-      <div className={styles.pageLayout}>
+      <div className={styles.pageLayout}>
        <Sidebar />
        {/* {children} */}
        <div className="max-w-4xl p-8">
          <CodeBlock
-            tabs={[
-              { text: "Index.tsx", value: "index" },
-              { text: "index.css", value: "css" },
-            ]}
          >
+            <CodeBlockEditor></CodeBlockEditor>
          </CodeBlock>
          <CodeBlock tabs={[{ text: "Index.tsx", value: "index" }]} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
`;

const TEST_STRING_TWO = `import { Box, HGrid } from "@navikt/ds-react";

const Example = () => {

  return (
      <Box background="surface-alt-3-subtle">
        <div />
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div />
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div />
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div />
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </Box>
  );
}
`;

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.websitePage}>
      <Header />

      <div className={styles.pageLayout}>
        <Sidebar />
        {/* {children} */}
        <div className="max-w-4xl space-y-4 p-8">
          <CodeBlock
            tabs={[
              { text: "Index.tsx", value: "index", code: TEST_STRING_ONE },
              { text: "index.css", value: "css", code: TEST_STRING_TWO },
              {
                text: "test.css",
                value: "test",
                code: TEST_STRING_ONE,
                extraCode: TEST_STRING_TWO,
              },
            ]}
          />
          <CodeBlock
            showLineNumbers={false}
            tabs={[
              { text: "Index.tsx", value: "index", code: TEST_STRING_ONE },
            ]}
          />
          <CodeBlock
            showLineNumbers={false}
            tabs={[{ text: "Diff", value: "diff", code: TEST_STRING_DIFF }]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
