import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Grid, Cell, ContentContainer } from "@navikt/ds-react";
import { useMediaQuery } from "react-responsive";
import useKeypress from "react-use-keypress";
import { useEffect, useState } from "react";
import style from "./layout.module.css";

interface LayoutProps {
  children?: React.ReactNode;
  menu: any[];
}

const Layout = ({ children, menu }: LayoutProps) => {
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
        menu={menu}
        sidebar={sidebar}
        small={small}
        onSidebarChange={(x) => setSidebar(x)}
      />
      {/* TEMP UNTIL LAYOUT UPDATE */}
      <main className={style.contentWrapper}>
        <ContentContainer>
          <Grid>
            <Cell className={style.content} xs={12} sm={12} md={12} lg={12}>
              {children}
            </Cell>
          </Grid>
        </ContentContainer>
      </main>
    </div>
  );
};

export default Layout;
