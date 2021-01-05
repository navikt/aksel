import React from "react";
import { Ingress, Undertittel } from "nav-frontend-typografi";
import Code, { Bash, copyImport, InlineCode } from "../code/Code";
import "./styles.less";

const IconPage = () => {
  return (
    <div className="iconpage__install">
      <Ingress>
        Ikonene er tilgjengelige som både React komponent og SVG. Husk å sjekke
        at prosjektet støtter SVG med riktige loaders eks{" "}
        <InlineCode> `file-loader`</InlineCode> for webpack.
      </Ingress>
      <Ingress>
        Ikonene er designet for 24x24px, men height og width er satt til{" "}
        <InlineCode>1em</InlineCode> for å gjøre de mest mulig brukervenlige. Vi
        anbefaler derfor å wrappe ikonene eller sette font-size: 1.5rem/24px
        inline for å oppnå dette.
      </Ingress>
      <Undertittel className="iconpage__headlines">Installering</Undertittel>
      <Bash
        className="iconpage__installBash"
        onClick={(e) => copyImport(e, "yarn add @navikt/ds-icons")}
      >
        yarn add @navikt/ds-icons
      </Bash>
      <Undertittel className="iconpage__headlines">React</Undertittel>
      <Code popupUnder className="language-jsx">
        {`import { Ikonnavn } from '@navikt/ds-icons'`}
      </Code>
      <Undertittel className="iconpage__headlines">SVG</Undertittel>
      <Code popupUnder className="language-jsx">
        {`import Ikon from '@navikt/ds-icons/svg/ikonnavn.svg';`}
      </Code>
    </div>
  );
};

export default IconPage;
