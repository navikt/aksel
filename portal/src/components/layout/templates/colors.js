import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";

import TabbedContainer from "./TabbedContainer";
import { useContentPage } from "../../../useSiteStructure";

const ColorsPage = ({ location, children, ...props }) => {
  const page = useContentPage(location);

  return (
    <React.Fragment>
      <Innholdstittel>{page.title}</Innholdstittel>
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

export default ColorsPage;
