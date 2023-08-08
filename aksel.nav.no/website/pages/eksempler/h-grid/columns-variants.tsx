import { HGrid } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Background>
      <HGrid
        gap="6"
        columns={{ xs: "repeat(auto-fit, minmax(10rem, 1fr))", md: 4 }}
      >
        <Placeholder height="240px" />
        <Placeholder height="240px" />
        <Placeholder height="240px" />
        <Placeholder height="240px" />
      </HGrid>
    </Background>
  );
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Columns støtter både statisk antall kolonner med 'number' og mer fleksible kolonner med 'string'. ",
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
