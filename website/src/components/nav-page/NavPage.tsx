import React from "react";
import { Link } from "gatsby";
import { guid } from "nav-frontend-js-utils";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Undertittel } from "nav-frontend-typografi";
import { usePageMenu } from "../../useSiteStructure";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.less";

const NavPage = ({ location }) => {
  const menu = usePageMenu(location);

  return (
    <>
      <motion.nav
        initial={{ x: -5, y: -5, opacity: 0 }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration: 0.2 },
        }}
        exit={{ x: 10, opacity: 0, transition: { duration: 0.2 } }}
        className="navPage"
        aria-labelledby="left-navigation-title"
      >
        {menu.map(({ link, title }, index) => (
          <LenkepanelBase
            key={guid()}
            linkCreator={(props) => (
              <Link className="lenkepanel lenkepanel--border" to={link}>
                {props.children}
              </Link>
            )}
            href="#"
          >
            <Undertittel className="lenkepanel__heading">{title}</Undertittel>
          </LenkepanelBase>
        ))}
      </motion.nav>
    </>
  );
};

export default NavPage;
