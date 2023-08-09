import { HGrid } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Background>
      <HGrid gap={{ xs: "2", md: "8" }} columns={3}>
        <Placeholder height="240px" />
        <Placeholder height="240px" />
        <Placeholder height="240px" />
        <Placeholder height="240px" />
      </HGrid>
    </Background>
  );
};

const Placeholder = ({ height = "auto", width = "auto" }) => {
  return (
    <div
      style={{
        display: "inherit",
        background: "var(--a-deepblue-500)",
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

const Background = ({
  children,
  width = "100%",
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div
      style={{
        background: "var(--a-deepblue-100)",
        width,
        height: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Med responsiv gap kan man dynamiskt tilpasse spacing basert på brekkpunktene våre.",
};
