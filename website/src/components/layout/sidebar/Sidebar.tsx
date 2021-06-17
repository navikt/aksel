import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  Normaltekst,
  Systemtittel,
  Undertekst,
  Undertittel,
} from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Input } from "nav-frontend-skjema";
import { EtikettFokus, EtikettInfo } from "nav-frontend-etiketter";
import { useNavigationPage, usePageMenu } from "../../../useSiteStructure";
import StartCase from "lodash.startcase";
import "./styles.less";

const isBeta = (path: string) => {
  const style = path.match(/packages\/nav-frontend-(.*)\/md/);
  if (!style || style.length < 2) return false;
  return style[1].includes("beta");
};

const isStyle = (path: string) => {
  const style = path.match(/packages\/nav-frontend-(.*)\/md/);
  if (!style || style.length < 2) return false;
  return style[1].includes("style");
};

const cls = (link: string, location) => {
  if (!location.pathname.startsWith("/designsystem")) {
    return classnames({
      active: link === location.pathname,
    });
  }
  return classnames({
    active: link
      .split("/")
      .every((s, i) => location.pathname.split("/")[i] === s),
  });
};

const Sidebar = ({ location, className = "" }) => {
  const page = useNavigationPage(location);
  const menu = usePageMenu(location);

  const [inputText, setInputText] = useState<string>("");
  const [lastLoc, setLastLoc] = useState<string>("");

  useEffect(() => {
    if ((location.pathname.match(/\//g) || []).length === 1) {
      if (lastLoc === location.pathname) {
        setInputText("");
      }
      setLastLoc(location.pathname);
    }
  }, [location, lastLoc]);

  const result = menu.filter(
    (item) => item.title.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
  );

  const pageTitle = page?.isVerktoykasse
    ? StartCase(page.slug.split("/")[0])
    : page?.title
    ? page?.title
    : "Missing title";

  if (
    ["/", "/404.html", "/designsystem/", "/designsystem"].includes(
      location.pathname
    )
  ) {
    return null;
  }
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween" }}
      exit={{ opacity: 0 }}
      className={className}
    >
      <nav aria-labelledby="left-navigation-title">
        {location.pathname.startsWith("/designsystem") && (
          <Input
            className="leftNavigation__input"
            label="Filter"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            autoComplete="on"
          />
        )}
        <Systemtittel
          id="left-navigation-title"
          className="leftNavigation__title"
        >
          {pageTitle}
        </Systemtittel>

        <ul className="nav-list">
          {result.length > 0 && (
            <AnimatePresence>
              {result.map(({ link, title, componentPath }, index) => {
                return (
                  <motion.li
                    initial={{ x: -10, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                    exit={{ x: 10, opacity: 0, transition: { duration: 0.2 } }}
                    key={index}
                  >
                    <Link to={link} className={cls(link, location)}>
                      {title}
                      {isBeta(componentPath) && (
                        <EtikettFokus>
                          <Undertekst>Beta</Undertekst>
                        </EtikettFokus>
                      )}
                      {isStyle(componentPath) && (
                        <EtikettInfo>
                          <Undertekst>CSS</Undertekst>
                        </EtikettInfo>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          )}
          {result.length === 0 && (
            <li>
              <Normaltekst>Ingen treff...</Normaltekst>
            </li>
          )}
        </ul>
        {location.pathname.indexOf("/designsystem/components") === 0 && (
          <div className="contribute-promo">
            <Undertittel>Noe du savner?</Undertittel>
            <LenkepanelBase
              href="https://github.com/navikt/nav-frontend-moduler"
              border
            >
              <Normaltekst className="lenkepanel__heading">
                Bidra med nye komponenter på Github
              </Normaltekst>
            </LenkepanelBase>
          </div>
        )}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
