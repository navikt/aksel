import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import docs from "@navikt/ds-tokens/docs.json";
import { AkselTable, AkselTableRow } from "components/website-modules/Table";

export const BreakpointsView = ({ cat }: { cat: string }) => {
  const breakpoints = docs[cat];

  return (
    <AkselTable
      withCopy
      th={[
        { text: "Enhet" },
        { text: "Verdi" },
        { text: "Media queries", hideOnSm: true },
        { text: "Bruk" },
      ]}
    >
      {breakpoints.map((x) => (
        <AkselTableRow
          key={x.name}
          tr={[
            { text: getSvg(x.name) },
            { text: x.value },
            { text: x.description, hideOnSm: true },
            {
              text:
                Number(x.value.replace("px", "")) % 2 === 0
                  ? "Mobile first"
                  : "Desktop first",
            },
          ]}
          copyText={x.name}
        />
      ))}
    </AkselTable>
  );
};

function getSvg(token: string) {
  switch (true) {
    case token.includes("xs"):
      return <MobileSmallIcon title="Mobile small" fontSize="3rem" />;

    case token.includes("sm"):
      return <MobileIcon title="Mobile regular" fontSize="3rem" />;

    case token.includes("md"):
      return <TabletIcon title="Tablet" fontSize="3rem" />;

    case token.includes("lg"):
      return <LaptopIcon title="Laptop" fontSize="3rem" />;
    case token.includes("xl"):
      return <MonitorIcon title="Dekstop" fontSize="3rem" />;

    default:
      return null;
  }
}
