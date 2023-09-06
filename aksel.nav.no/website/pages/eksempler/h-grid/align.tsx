import { HGrid, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Background>
      <VStack gap="12">
        <HGrid gap="4" columns={2} align="start">
          <Placeholder height="10rem">Start</Placeholder>
          <Placeholder />
        </HGrid>
        <HGrid gap="4" columns={2} align="center">
          <Placeholder height="10rem">Center</Placeholder>
          <Placeholder />
        </HGrid>
        <HGrid gap="4" columns={2} align="end">
          <Placeholder height="10rem">End</Placeholder>
          <Placeholder />
        </HGrid>
      </VStack>
    </Background>
  );
};

const Placeholder = ({ height = "auto", width = "auto", ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: "grid",
        placeContent: "center",
        background: "var(--a-deepblue-500)",
        height: height ?? undefined,
        minHeight: "2rem",
        width: width ?? undefined,
        color: "var(--a-text-on-action)",
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
  desc: "Align gir HGrid mer kontroll over hvordan child-elementer skal vises",
};

export const args = {
  index: 3,
  desc: "Med responsiv gap kan man dynamiskt tilpasse spacing basert på brekkpunktene våre.",
};
