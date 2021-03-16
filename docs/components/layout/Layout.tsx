import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Mdx from "./MdxProvider";
import Toc from "../toc/Toc";
import { Grid, Cell, ContentContainer } from "@navikt/ds-react";
import { useMediaQuery } from "react-responsive";
import useKeypress from "react-use-keypress";
import { useEffect, useState } from "react";
import style from "./layout.module.css";
import { NextRouter, useRouter } from "next/router";

interface LayoutProps {
  children?: React.ReactNode;
  route: NextRouter;
}

const Layout = ({ route, children }: LayoutProps) => {
  const [sidebar, setSidebar] = useState(false);

  const small = useMediaQuery({
    query: "(max-width: 959px)",
  });

  useKeypress("Escape", () => {
    setSidebar(false);
  });

  useEffect(() => {
    setSidebar(!small);
  }, [small]);

  return (
    <div className={style.pageWrapper + " lightTheme"}>
      <Header sidebar={sidebar} onSidebarChange={(x) => setSidebar(x)} />
      <Sidebar
        sidebar={sidebar}
        small={small}
        onSidebarChange={(x) => setSidebar(x)}
        route={route}
      />
      <main className={style.contentWrapper}>
        <ContentContainer>
          <Grid>
            <Cell className={style.content} xs={12} sm={12} md={10} lg={7}>
              <Mdx>{children}</Mdx>
            </Cell>
            <Cell xs={12} sm={1} md={2} lg={1} />
            <Cell xs={12} sm={12} md={8} lg={4}>
              <Toc />
            </Cell>
          </Grid>
        </ContentContainer>
      </main>
    </div>
  );
};

export default Layout;
