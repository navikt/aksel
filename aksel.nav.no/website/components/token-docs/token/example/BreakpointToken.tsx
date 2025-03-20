import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";

const BreakpointToken = ({ token }: { token: (typeof tokenDocs)[number] }) => {
  switch (token.modifier.split("-")[0]) {
    case "xs":
      return <MobileSmallIcon width="32px" height="32px" title={token.name} />;
    case "sm":
      return <MobileIcon width="32px" height="32px" title={token.name} />;
    case "md":
      return <TabletIcon width="32px" height="32px" title={token.name} />;
    case "lg":
      return <LaptopIcon width="32px" height="32px" title={token.name} />;
    case "xl":
    case "2xl":
      return <MonitorIcon width="32px" height="32px" title={token.name} />;
    default:
      return "";
  }
};

export default BreakpointToken;
