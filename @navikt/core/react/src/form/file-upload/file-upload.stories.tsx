import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { UploadIcon } from "@navikt/aksel-icons";
import { FileUpload } from "..";
import { Alert } from "../../alert";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Heading } from "../../typography";
import { OnFileSelectProps } from "./FileUpload.types";

const meta: Meta<typeof FileUpload.Dropzone> = {
  title: "ds-react/FileUpload",
  component: FileUpload.Dropzone,
};

export default meta;

const MAX_FILES = 5;
const MAX_SIZE_MB = 3;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

export const Default: StoryFn = () => {
  const [files, setFiles] = useState<OnFileSelectProps>({
    allFiles: [],
    acceptedFiles: [],
    rejectedFiles: [],
  });

  function addFiles(filesToAdd: OnFileSelectProps) {
    const newFiles = {
      allFiles: [...files.allFiles, ...filesToAdd.allFiles],
      acceptedFiles: [...files.acceptedFiles, ...filesToAdd.acceptedFiles],
      rejectedFiles: [...files.rejectedFiles, ...filesToAdd.rejectedFiles],
    };
    setFiles(newFiles);
  }

  function removeFile(fileToRemove: File) {
    const filter = (file: File) => file !== fileToRemove;

    const newFiles = {
      allFiles: files.allFiles.filter(filter),
      acceptedFiles: files.acceptedFiles.filter(filter),
      rejectedFiles: files.rejectedFiles.filter((x) => x.file !== fileToRemove),
    };
    setFiles(newFiles);
  }

  return (
    <VStack gap="6" style={{ maxWidth: 500 }}>
      <FileUpload.Dropzone
        label="Last opp filer til søknaden"
        description={`Maks størrelse ${MAX_SIZE_MB} MB`}
        disabledText="Du kan ikke laste opp flere filer"
        /* accept=".doc,.docx,.xls,.xlsx,.pdf" */
        onSelect={addFiles}
        fileLimit={{ max: MAX_FILES, current: files.allFiles.length }}
      />

      {getListError(files) && (
        <Alert variant="error">{getListError(files)}</Alert>
      )}

      {files.allFiles.length > 0 && (
        <VStack gap="2">
          <Heading level="3" size="xsmall">
            {`Valgte filer (${files.allFiles.length} av ${MAX_FILES})`}
          </Heading>
          <VStack gap="2">
            {files.allFiles.map((file, index) => (
              <FileUpload.Item
                key={index}
                file={file}
                error={getError(file, files.rejectedFiles)}
                onDelete={() => removeFile(file)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

Default.parameters = {
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

function getError(
  file: File,
  rejectedFiles: OnFileSelectProps["rejectedFiles"],
) {
  if (file.size > MAX_SIZE) return `Filen er større enn ${MAX_SIZE} MB`;
  if (rejectedFiles.some((x) => x.file === file))
    return "Filformatet støttes ikke";
  return undefined;
}

function getListError(files: OnFileSelectProps) {
  const filesTooMany = files.allFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}

export const TriggerWithButton = {
  render: () => {
    return (
      <FileUpload.Trigger onSelect={console.log}>
        <Button icon={<UploadIcon aria-hidden />}>Last opp filer</Button>
      </FileUpload.Trigger>
    );
  },
};
