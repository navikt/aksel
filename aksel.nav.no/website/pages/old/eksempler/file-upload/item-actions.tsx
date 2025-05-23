import { FileUpload, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <VStack gap="6">
    <div>
      <Heading size="small">retry</Heading>
      <FileUpload.Item
        file={new File(["abc".repeat(100000)], "eksempel1.pdf")}
        button={{
          action: "retry",
          onClick: () => null,
        }}
      />
    </div>
    <div>
      <Heading size="small">delete</Heading>
      <FileUpload.Item
        file={{ name: "eksempel2.pdf", size: 200000 }}
        href="#"
        button={{
          action: "delete",
          onClick: () => null,
        }}
      />
    </div>
  </VStack>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
