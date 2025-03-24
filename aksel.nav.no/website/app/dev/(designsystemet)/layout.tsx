import { CodeBlock, CodeBlockEditor } from "@/app/_ui/code-block/CodeBlock";
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

const TEST_STRING_TWO = `import { Box, HGrid } from "@navikt/ds-react";

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
        <div className="max-w-4xl p-8">
          <CodeBlock
            tabs={[
              { text: "Index.tsx", value: "index" },
              { text: "index.css", value: "css" },
            ]}
          >
            <CodeBlockEditor></CodeBlockEditor>
          </CodeBlock>
          <CodeBlock tabs={[{ text: "Index.tsx", value: "index" }]} />
        </div>
      </div>
      <Footer />
    </div>
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
        <div className="max-w-4xl p-8">
          <CodeBlock
            tabs={[
              { text: "Index.tsx", value: "index" },
              { text: "index.css", value: "css" },
            ]}
          >
            <CodeBlockEditor value="index" code={TEST_STRING_ONE} />
            <CodeBlockEditor value="css" code={TEST_STRING_TWO} />
          </CodeBlock>
          <CodeBlock tabs={[{ text: "Index.tsx", value: "index" }]}>
            <CodeBlockEditor code={TEST_STRING_TWO} />
          </CodeBlock>
        </div>
      </div>
      <Footer />
    </div>
  );
}
