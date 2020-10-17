import classnames from "classnames";
import { EtikettInfo } from "nav-frontend-etiketter";
import { Ingress, Innholdstittel } from "nav-frontend-typografi";
import React from "react";
import { useContentPage } from "../../useSiteStructure";
import "./layout.less";
import TabbedContainer from "./TabbedContainer";

const componentTitleCls = (style) =>
  classnames("componentTitle", {
    "componentTitle--style": style,
  });

const LayoutPicker = (props) => {
  const page = useContentPage(props.location);

  const isStyle = (item) => {
    const style = item.match(/packages\/nav-frontend-(.*)\/md/);
    if (!!!style || style.length < 2) return false;
    if (style[1].indexOf("style") === -1) return false;
    return true;
  };

  if (page === undefined) {
    return props.children;
  }

  if (page.children.length === 0) {
    return (
      <div className="mdx-content">
        <section
          className={classnames("section", {
            full: !!props.location.pathname.match(/other|technical\/?$/),
          })}
        >
          {props.children}
        </section>
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
    </>
  );
};

export default LayoutPicker;
