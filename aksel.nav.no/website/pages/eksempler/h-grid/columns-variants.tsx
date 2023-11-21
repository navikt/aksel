import { withDsExample } from "@/web/examples/withDsExample";
import { HGrid } from "@navikt/ds-react";

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

export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Columns støtter både statisk antall kolonner med 'number' og mer fleksible kolonner med 'string'. ",
};
