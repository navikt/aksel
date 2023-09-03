import { Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const lorem = "Hva kan vi hjelpe deg med?";

  return (
    <VStack gap="4">
      <div>
        <Descriptor>H1</Descriptor>
        <Heading level="1" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>H2</Descriptor>
        <Heading level="2" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>H3</Descriptor>
        <Heading level="3" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>H4</Descriptor>
        <Heading level="4" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>H5</Descriptor>
        <Heading level="5" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>H6</Descriptor>
        <Heading level="6" size="medium">
          {lorem}
        </Heading>
      </div>
    </VStack>
  );
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};

function Descriptor({ children }) {
  return <p className="mb-3 text-xl font-semibold">{children}</p>;
}

function Divider() {
  return <hr className="border-border-subtle" />;
}
