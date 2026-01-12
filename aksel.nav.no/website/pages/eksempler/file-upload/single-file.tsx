import { useState } from "react";
import { FileObject, FileUpload, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  return (
    <VStack gap="space-24">
      <FileUpload.Dropzone
        label="Last opp fødselsattest"
        fileLimit={{ max: 1, current: files.length }}
        multiple={false}
        onSelect={setFiles}
      />
      {files.map((file) => (
        <FileUpload.Item
          key={file.file.name}
          file={file.file}
          button={{
            action: "delete",
            onClick: () => setFiles([]),
          }}
        />
      ))}
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
