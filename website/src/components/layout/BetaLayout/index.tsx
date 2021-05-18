import { MDXProvider } from "@mdx-js/react";
import { Title, BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Codeblock, { InlineCode } from "../../code/Code";
import Example from "../../example/Example";
import { Header } from "./Header";
import "./layout.css";
import { Sidebar } from "./Sidebar";
import "./theme.css";

const BetaLayout = (props) => {
  const [darkmode, setDarkmode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.getElementById("gatsby-focus-wrapper").focus();
  }, [sidebarOpen]);

  return (
    <>
      <Helmet
        title={props.pageContext?.frontmatter?.title}
        titleTemplate="%s - NAV Designsystem"
      >
        <html lang="no" />
        {props.pageContext?.frontmatter?.ingress && (
          <meta
            name="description"
            content={props.pageContext?.frontmatter?.ingress}
          />
        )}
      </Helmet>

      <div
        className={cl("ds-page-wrapper", {
          "ds-lightmode": !darkmode,
          "ds-darkmode": darkmode,
        })}
      >
        <Header
          onOpenSidebar={(e) => setSidebarOpen(e)}
          open={sidebarOpen}
          onClick={() => setDarkmode(!darkmode)}
        />
        <Sidebar
          open={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <main className="ds-content--wrapper" id="hovedinnhold">
          <div className="ds-content">
            <MDXProvider
              components={{
                code: (props) => <Codeblock {...props} />,
                inlineCode: (props) => <InlineCode {...props} />,
                Example,
                h1: (props) => <Title {...props} level={1} size="2xl" />,
                h2: (props) => <Title {...props} level={2} size="xl" />,
                h3: (props) => <Title {...props} level={3} size="l" />,
                h4: (props) => <Title {...props} level={4} size="m" />,
                h5: (props) => <Title {...props} level={5} size="s" />,
                p: (props) => <BodyLong {...props} />,
              }}
            >
              {props.children}
            </MDXProvider>
          </div>
        </main>
      </div>
    </>
  );
};

export default BetaLayout;
