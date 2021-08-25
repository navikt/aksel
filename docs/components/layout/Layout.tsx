import cl from "classnames";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useMediaQuery } from "react-responsive";
import useKeypress from "react-use-keypress";
import { useEffect, useState } from "react";
import "./theme.css";
import "./layout.css";

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

  useEffect(() => {
    document.body.classList.add("lightTheme");
  }, []);

  return (
    <div id="pageWrapper" className={cl("pageWrapper")}>
      <Header sidebar={sidebar} onSidebarChange={(x) => setSidebar(x)} />
      <Sidebar
        menu={menu}
        sidebar={sidebar}
        small={small}
        onSidebarChange={(x) => setSidebar(x)}
      />
      <main className={"contentWrapper"}>
        <div className={"content"}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
