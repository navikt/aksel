import React from "react";
import { Link } from "gatsby";
import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { EtikettFokus, EtikettInfo } from "nav-frontend-etiketter";
import { useNavigationPage, usePageMenu } from "../../../useSiteStructure";
import "./styles.less";

const Sidebar = ({ location, className = "" }) => {
  const page = useNavigationPage(location);
  const menu = usePageMenu(location);

  const isBeta = (item) => {
    const style = item.match(/packages\/nav-frontend-(.*)\/md/);
    if (!!!style || style.length < 2) return false;
    if (style[1].indexOf("beta") === -1) return false;
    return true;
  };

  const isStyle = (item) => {
    const style = item.match(/packages\/nav-frontend-(.*)\/md/);
    if (!!!style || style.length < 2) return false;
    if (style[1].indexOf("style") === -1) return false;
    return true;
  };

  return (
    <div className={className}>
      <nav aria-labelledby="left-navigation-title">
        <h2 id="left-navigation-title" className="typo-systemtittel">
          {page?.title}
        </h2>
        <ul className="nav-list">
          {menu.map(({ link, title, componentPath }, index) => {
            return (
              <li key={index}>
                <Link to={link} activeClassName="active">
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
              </li>
            );
          })}
        </ul>
        {location.pathname.indexOf("/components") === 0 && (
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
    </div>
  );
};

export default Sidebar;
