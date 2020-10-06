import React from "react";

import { Innholdstittel } from "../../../../../../packages/nav-frontend-typografi";

const SectionTitle = (props) => (
  <div className="sectionTitle">
    <Innholdstittel>{props.title}</Innholdstittel>
  </div>
);

export default SectionTitle;
