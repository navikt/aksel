import React from "react";
import classnames from "classnames";
import { EtikettInfo } from "nav-frontend-etiketter";
import { Ingress, Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { useComponentPath, useContentPage } from "../../useSiteStructure";
import "./layout.less";
import TabbedContainer from "./TabbedContainer";
import { GithubLogo } from "../assets/images/svg";
import Lenke from "nav-frontend-lenker";

const componentTitleCls = (style) =>
  classnames("componentTitle", {
    "componentTitle--style": style,
  });

const isStyle = (path: string) => {
  const style = path.match(/packages\/nav-frontend-(.*)\/md/);
  if (!style || style.length < 2) return false;
  return style[1].includes("style");
};

const LayoutPicker = (props) => {
  const page = useContentPage(props.location);
  const componentLink = useComponentPath(props.location);

  const linkToEdit = () => {
    let link = "";
    if (!(componentLink && componentLink.componentPath)) return null;
    const compPath = componentLink.componentPath;

    if (compPath.match(/(packages.*)$/)) {
      link = compPath.match(/(packages.*)$/)[1];
    } else if (compPath.match(/(website.*)$/)) {
      link = compPath.match(/(website.*)$/)[1];
    } else {
      return null;
    }
    if (props.location.pathname.endsWith("technical")) return null;
    return (
      <Normaltekst className="gitLink">
        <Lenke
          href={`https://github.com/navikt/nav-frontend-moduler/edit/master/${link}`}
        >
          <GithubLogo /> Rediger siden på Github
        </Lenke>
      </Normaltekst>
    );
  };

  if (page === undefined) {
    return props.children;
  }
  if (page.children.length === 0) {
    return (
      <div>
        <section
          className={classnames("section", {
            full: !!props.location.pathname.match(/other|technical\/?$/),
          })}
        >
          {props.children}
        </section>
        {linkToEdit()}
      </div>
    );
  }

  const currentTab = props.location.pathname.split("/").slice(-1).pop();
  let defaultActive = page.children.findIndex(
    (tab) => tab.slug.split("/").slice(-1).pop() === currentTab
  );
  defaultActive = defaultActive === -1 ? 0 : defaultActive;

  const style = isStyle(page.componentPath);

  return (
    <>
      <div className={componentTitleCls(style)}>
        <Innholdstittel>{page.title}</Innholdstittel>
        {style && <EtikettInfo>CSS</EtikettInfo>}
      </div>
      {page.ingress && (
        <Ingress className="intro">
          <span dangerouslySetInnerHTML={{ __html: page.ingress }}></span>
        </Ingress>
      )}
      <TabbedContainer
        defaultActive={defaultActive}
        tabs={page.children.map(({ link, title }) => ({
          label: title,
          path: link,
        }))}
        {...props}
      />

      <section
        className={classnames("section", {
          full: !!props.location.pathname.match(/other|technical\/?$/),
        })}
      >
        {props.children}
      </section>
      {linkToEdit()}
    </>
  );
};

export default LayoutPicker;
