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

  console.log(props.location.pathname);
  console.log(page.children[0].slug);

  const currentTab = props.location.pathname.split("/").slice(-1).pop();
  let defaultActive = page.children.findIndex(
    (tab) => tab.slug.split("/").slice(-1).pop() === currentTab
  );
  defaultActive = defaultActive === -1 ? 0 : defaultActive;

  console.log(defaultActive);
  return (
    <>
      <Innholdstittel>{page.title}</Innholdstittel>
      {page.ingress && <Ingress className="intro">{page.ingress}</Ingress>}
      <TabbedContainer
        defaultActive={defaultActive}
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
