import { useState } from "react";
import {
  FileObject,
  FileRejected,
  FileRejectionReason,
  Heading,
  UNSAFE_FileUpload,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [files, setFiles] = useState<FileObject[]>(exampleFiles);

  function removeFile(fileToRemove: FileObject) {
    setFiles(files.filter((file) => file !== fileToRemove));
  }

  const acceptedFiles = files.filter((file) => !file.error);
  const rejectedFiles = files.filter((f): f is FileRejected => f.error);

  return (
    <VStack gap="6">
      <UNSAFE_FileUpload.Dropzone
        label="Last opp filer til søknaden"
        description={`Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse ${MAX_SIZE_MB} MB.`}
        accept=".doc,.docx,.pdf"
        maxSizeInBytes={MAX_SIZE}
        fileLimit={{ max: MAX_FILES, current: acceptedFiles.length }}
        onSelect={(newFiles) => setFiles([...files, ...newFiles])}
      />

      {acceptedFiles.length > 0 && (
        <VStack gap="2">
          <Heading level="3" size="xsmall">
            {`Vedlegg (${acceptedFiles.length})`}
          </Heading>
          <VStack as="ul" gap="3">
            {acceptedFiles.map((file, index) => (
              <UNSAFE_FileUpload.Item
                as="li"
                key={index}
                file={file.file}
                onDelete={() => removeFile(file)}
              />
            ))}
          </VStack>
        </VStack>
      )}
      {rejectedFiles.length > 0 && (
        <VStack gap="2">
          <Heading level="3" size="xsmall">
            Vedlegg med feil
          </Heading>
          <VStack as="ul" gap="3">
            {rejectedFiles.map((rejected, index) => (
              <UNSAFE_FileUpload.Item
                as="li"
                key={index}
                file={rejected.file}
                error={errors[rejected.reasons[0]]}
                onDelete={() => removeFile(rejected)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

const MAX_FILES = 3;
const MAX_SIZE_MB = 1;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const errors: Record<FileRejectionReason, string> = {
  fileType: "Filformatet støttes ikke",
  fileSize: `Filen er større enn ${MAX_SIZE_MB} MB`,
};

const filePdf = new File(["abc".repeat(100000)], "document.pdf");
const fileJpg = new File(["abc".repeat(500000)], "picture.jpg");
const exampleFiles: FileObject[] = [
  { file: filePdf, error: false },
  { file: fileJpg, error: true, reasons: ["fileType"] },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
