import React from "react";
import { Innholdstittel, Ingress } from "nav-frontend-typografi";

import TabbedContainer from "../../tabbed-container/TabbedContainer";

const LanguagePage = ({ children, ...props }) => {
  // TODO: Better handling of redirect
  // useEffect(() => {
  //   navigate("/resources/language/principles/", { replace: true });
  // }, []);

  const tabs = [
    {
      label: "Prinsipper",
      path: "/resources/language/",
    },
    {
      label: "Skriveråd",
      path: "/resources/language/guidelines/",
    },
    {
      label: "Sjekkliste",
      path: "/resources/language/checklist/",
    },
    {
      label: "Tall, tid og dato",
      path: "/resources/language/units/",
    },
  ];

  return (
    <React.Fragment>
      <Innholdstittel>Språk</Innholdstittel>
      <Ingress className="intro">
        Her finner du generelle tips og råd som er viktige for at flest mulig
        skal kunne finne og forstå teksten din.
      </Ingress>
      <TabbedContainer tabs={tabs} {...props} />
      {children}
    </React.Fragment>
  );
};

export default LanguagePage;
