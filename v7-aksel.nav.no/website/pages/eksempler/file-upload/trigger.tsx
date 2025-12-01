import { UploadIcon } from "@navikt/aksel-icons";
import { Button, FileUpload } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <FileUpload.Trigger multiple={false} onSelect={console.info}>
      <Button variant="secondary" icon={<UploadIcon aria-hidden />}>
        Last opp filer
      </Button>
    </FileUpload.Trigger>
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
