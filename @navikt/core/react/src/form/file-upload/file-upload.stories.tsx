import { Meta, StoryFn } from "@storybook/react";
import React, { useEffect, useState } from "react";
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

const MAX_FILES = 3;
const MAX_SIZE_MB = 1;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const DefaultFn = ({ error = false }) => {
  const [files, setFiles] = useState<any>({
    allFiles: [],
    acceptedFiles: [],
    rejectedFiles: [],
  });

  function addFiles(filesToAdd: OnFileSelectProps) {
    const newFiles = {
      allFiles: [...files.allFiles, ...filesToAdd.allFiles],
      acceptedFiles: error
        ? []
        : [...files.acceptedFiles, ...filesToAdd.acceptedFiles],
      rejectedFiles: error
        ? [
            ...files.rejectedFiles,
            ...filesToAdd.allFiles.map((x) => ({
              file: x,
              reason: ["custom error"],
            })),
          ]
        : [...files.rejectedFiles, ...filesToAdd.rejectedFiles],
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

  const CustomItem = ({ index, ...props }: any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500 * index);
    }, [index]);

    return (
      <FileUpload.Item
        {...props}
        onRetry={() => console.log("retry")}
        status={
          loading
            ? "uploading"
            : index % 2 === 0
              ? "retry"
              : props?.error
                ? "delete"
                : "delete"
        }
      />
    );
  };

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
          <VStack gap="3">
            {files.allFiles.map((file: File, index) => (
              <CustomItem
                key={file.name}
                index={index}
                file={file}
                error={getError(file, files.rejectedFiles, index)}
                onDelete={() => removeFile(file)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export const Default: StoryFn = DefaultFn;

Default.parameters = {
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

const errors = [
  "Filformatet støttes ikke",
  "Filen er for stor",
  "Du kan ikke laste opp tomme filer",
  "Noe gikk galt under opplastingen, prøv å laste opp filen på nytt",
];

function getError(
  file: File,
  rejectedFiles: OnFileSelectProps["rejectedFiles"],
  index: number,
) {
  if (file.size > MAX_SIZE) return `Filen er større enn ${MAX_SIZE} MB`;
  if (rejectedFiles.some((x) => x.file === file))
    return errors[index % errors.length];
  return undefined;
}

function getListError(files: OnFileSelectProps) {
  const filesTooMany = files.allFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}

export const AlwaysError = {
  render: () => <>{DefaultFn({ error: true })}</>,
};

export const TriggerWithButton = {
  render: () => {
    return (
      <FileUpload.Trigger onSelect={console.log}>
        <Button icon={<UploadIcon aria-hidden />}>Last opp filer</Button>
      </FileUpload.Trigger>
    );
  },
};
