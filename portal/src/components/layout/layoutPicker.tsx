import React from "react";
import { Innholdstittel, Ingress } from "nav-frontend-typografi";
import TabbedContainer from "./TabbedContainer";
import { useContentPage } from "../../useSiteStructure";

const LayoutPicker = (props) => {
  const page = useContentPage(props.location);

  if (page === undefined) {
    return props.children;
  }

  if (page.children.length === 0) {
    return (
      <div className="mdx-content">
        <section className="section">{props.children}</section>
      </div>
    );
  }

  return (
    <>
      <Innholdstittel>{page.title}</Innholdstittel>
      {page.ingress && <Ingress className="intro">{page.ingress}</Ingress>}
      <TabbedContainer
        tabs={page.children.map(({ link, title }) => ({
          label: title,
          path: link,
        }))}
        {...props}
      />
      <div className="mdx-content">
        <section className="section">{props.children}</section>
      </div>
    </>
  );
};

export default LayoutPicker;
