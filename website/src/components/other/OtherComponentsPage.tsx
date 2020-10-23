import React from "react";
import Lenke from "nav-frontend-lenker";
import "nav-frontend-tabell-style";
import { Innholdstittel, Undertittel } from "nav-frontend-typografi";
import components from "../assets/data/other.json";
import OverflowDetector from "../overflow-detector/OverflowDetector";
import "./styles.less";

const data = components.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

const editUrl =
  "https://github.com/navikt/nav-frontend-moduler/edit/master/website/src/components/assets/data/other.json"; // eslint-disable-line

const OtherComponentsPage = () => {
  return (
    <>
      <div className="section" id="disclaimer">
        <Undertittel>Disclaimer</Undertittel>
        <p>
          Dette er en liste over komponenter som lages og forvaltes i NAV IT,
          men utenfor Designsystemet. Vi gir ingen support, og utfører ingen
          kvalitetskontroll på komponentene i denne listen. Eventuelle
          henvendelser angående disse komponentene må tas via komponentenes
          repositories da disse eies og forvaltes av andre enn
          Designsystem-teamet.
        </p>
        <p>
          Vi gir ingen garanti for at disse komponentene er hverken kompatible
          med hverandre eller de andre komponentene i Designsystemet.&nbsp;
          <strong>
            Det eneste kravet som stilles til komponenter i denne listen er at
            de ikke dupliserer komponenter som allerede finnes i Designsystemet.
          </strong>
        </p>
      </div>

      <div className="tabell-header">
        <Innholdstittel>Andre komponenter</Innholdstittel>
        <a className="knapp" href={editUrl}>
          Rediger tabell
        </a>
      </div>
      <OverflowDetector>
        <table className="tabell tabell--stripet">
          <thead>
            <tr>
              <th>Komponent</th>
              <th>Beskrivelse</th>
              <th>Demo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comp) => (
              <tr key={comp.repository + comp.description}>
                <td>
                  <Lenke href={comp.repository}>{comp.name}</Lenke>
                </td>
                <td>{comp.description}</td>
                <td>
                  {comp.demo_url && (
                    <Lenke href={comp.demo_url}>Live&nbsp;demo</Lenke>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OverflowDetector>
    </>
  );
};

export default OtherComponentsPage;
