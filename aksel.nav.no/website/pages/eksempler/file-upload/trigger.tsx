import { UploadIcon } from "@navikt/aksel-icons";
import { Button, UNSAFE_FileUpload } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_FileUpload.Trigger multiple={false} onSelect={console.info}>
      <Button variant="secondary" icon={<UploadIcon aria-hidden />}>
        Last opp filer
      </Button>
    </UNSAFE_FileUpload.Trigger>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
