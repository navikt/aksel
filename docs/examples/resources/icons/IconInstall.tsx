import React from "react";
import {
  Ingress,
  Systemtittel,
  Undertittel,
  Normaltekst,
} from "nav-frontend-typografi";
import Bash from "../../../components/code/Bash";
import InlineCode from "../../../components/code/Inline";
import "./styles.less";
import { Link } from "@navikt/ds-icons";

const IconInstall = () => {
  return (
    <div className="iconPage__install">
      <Systemtittel className="iconPage__headlines">Installering</Systemtittel>
      <Bash copy terminal code={`yarn add @navikt/ds-icons`} />
      <Bash copy terminal code={`npm i @navikt/ds-icons`} />
      <Ingress>
        Ikonene er tilgjengeliggjort for React og SVG.
        <Ingress>
          Husk å sjekke at prosjektet støtter lasting av SVG med riktige loaders
          eks{" "}
          <Link href="https://www.npmjs.com/package/file-loader">
            file-loader
          </Link>{" "}
          eller{" "}
          <Link href="https://www.npmjs.com/package/@svgr/webpack">
            @svgr/webpack
          </Link>
        </Ingress>
      </Ingress>
      <Ingress>
        React komponenten tar imot props og setter dem direkte på SVG elementet.
        Husk <InlineCode>`aria-label`</InlineCode>,
        <InlineCode>`role`</InlineCode>, <InlineCode>`focusable`</InlineCode>{" "}
        propsene for en tilgjengelig brukeropplevelse.
      </Ingress>
      <Systemtittel className="iconPage__headlines">Bruk</Systemtittel>
      <Normaltekst>
        SVG til ikonene har height og width satt til{" "}
        <InlineCode>1em</InlineCode>. Dette betyr at man må sette font-size på
        ikonet/parent for å endre størrelse eller endre width og height med
        props.
      </Normaltekst>
      <Undertittel className="iconPage__headlines">React</Undertittel>
      <Bash
        code={`import { System } from '@navikt/ds-icons';`}
        language="jsx"
        copy
      />

      <Ingress>Med wrapper (16px font-size)</Ingress>
      <Bash
        code={`<span style={{"fontSize": "1.5rem"}}>\n\t<System \n\t\taria-label="System ikon" \n\t\trole="img" \n\t\tfocusable="false"\n\t/>\n</span>`}
        language="jsx"
        copy
      />
      <Ingress>Uten wrapper (16px font-size)</Ingress>
      <Bash
        code={`<System \n\tstyle={{"fontSize": "1.5rem"}} \n\taria-label="System ikon" \n\trole="img" \n\tfocusable="false"\n/>`}
        language="jsx"
        copy
      />
      <Undertittel className="iconPage__headlines">SVG</Undertittel>
      <Bash
        code={`const System = require('@navikt/ds-icons/svg/System.svg');`}
        language="jsx"
        copy
      />
      <Ingress>
        Med <InlineCode>img</InlineCode> (16px font-size)
      </Ingress>
      <Bash
        code={`<img \n\tsrc={System} \n\tstyle={{ height: "1.5rem" }} \n\talt="System ikon" \n/>`}
        language="jsx"
        copy
      />
      <Ingress>Med CSS</Ingress>
      <Bash
        code={`.cssClass::after { \n\tcontent: url("~@navikt/ds-icons/svg/System.svg");\n}`}
        language="css"
        copy
      />
    </div>
  );
};
export default IconInstall;
