import React from "react";
import { Innholdstittel, Ingress } from "nav-frontend-typografi";

import TabbedContainer from "../../tabbed-container/TabbedContainer";
import { useContentPage } from "../../../useSiteStructure";

const LanguagePage = ({ location, children, ...props }) => {
  const page = useContentPage(location);

  return (
    <React.Fragment>
      <Innholdstittel>{page.title}</Innholdstittel>
      <Ingress className="intro">{page.ingress}</Ingress>
      <TabbedContainer
        tabs={page.children.map(({ link, title }) => ({
          label: title,
          path: link,
        }))}
        location={location}
        {...props}
      />
      {children}
    </React.Fragment>
  );
};

export default LanguagePage;
