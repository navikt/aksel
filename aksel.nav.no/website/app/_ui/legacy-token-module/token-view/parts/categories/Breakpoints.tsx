import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { LegacyDocs } from "../../../legacy-docs";

export const BreakpointsView = ({ cat }: { cat: string }) => {
  const breakpoints = LegacyDocs[cat];

  return (
    <WebsiteTable
      withCopy
      th={[
        { text: "Enhet" },
        { text: "Verdi" },
        { text: "Media queries", hideOnSm: true },
        { text: "Bruk" },
      ]}
    >
      {breakpoints.map((x) => (
        <WebsiteTableRow
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
    </WebsiteTable>
  );
};

function getSvg(token: string) {
  switch (true) {
    case token.includes("xs"):
      return <MobileSmallIcon title="Mobile small" fontSize="2.5rem" />;

    case token.includes("sm"):
      return <MobileIcon title="Mobile regular" fontSize="2.5rem" />;

    case token.includes("md"):
      return <TabletIcon title="Tablet" fontSize="2.5rem" />;

    case token.includes("lg"):
      return <LaptopIcon title="Laptop" fontSize="2.5rem" />;
    case token.includes("xl"):
      return <MonitorIcon title="Desktop" fontSize="2.5rem" />;
    default:
      return null;
  }
}
