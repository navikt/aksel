import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Mdx from "./MdxProvider";
import { ContentContainer } from "@navikt/ds-react";
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
      <main className={style.contentWrapper}>
        <ContentContainer>
          <div className={style.content}>
            <Mdx>{children}</Mdx>
          </div>
        </ContentContainer>
      </main>
    </div>
  );
};

export default Layout;
