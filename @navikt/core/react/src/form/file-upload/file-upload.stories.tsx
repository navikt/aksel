import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { UploadIcon } from "@navikt/aksel-icons";
import { FileItemProps, FileUpload } from "..";
import { Alert } from "../../alert";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Heading } from "../../typography";
import { FileRejectionReason, OnFileSelectProps } from "./FileUpload.types";

const meta: Meta<typeof FileUpload.Dropzone> = {
  title: "ds-react/FileUpload",
  component: FileUpload.Dropzone,
};

export default meta;

const MAX_FILES = 3;
const MAX_SIZE_MB = 1;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const CustomItem = ({
  index,
  ...props
}: FileItemProps & {
  index: number;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700 * index);
  }, [index]);

  return (
    <FileUpload.Item
      {...props}
      status={loading ? "uploading" : "idle"}
      itemAction="delete"
    />
  );
};

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
    <VStack gap="6" style={{ width: 500, maxWidth: "100%" }}>
      <FileUpload.Dropzone
        label="Last opp filer til søknaden"
        description={`Maks størrelse ${MAX_SIZE_MB} MB`}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
        maxSizeInBytes={MAX_SIZE}
        fileLimit={{ max: MAX_FILES, current: files.allFiles.length }}
        onSelect={addFiles}
      />

      {getListError(files) && (
        <Alert variant="error">{getListError(files)}</Alert>
      )}

      {files.acceptedFiles.length > 0 && (
        <VStack gap="2">
          <Heading level="3" size="xsmall">
            {`Vedlagte filer (${files.acceptedFiles.length} av ${MAX_FILES})`}
          </Heading>
          <VStack gap="3">
            {files.acceptedFiles.map((file: File, index) => (
              <CustomItem
                key={index}
                index={index}
                file={file}
                onDelete={() => removeFile(file)}
              />
            ))}
          </VStack>
        </VStack>
      )}
      {files.rejectedFiles.length > 0 && (
        <VStack gap="2">
          <Heading level="3" size="xsmall">
            Filer som ikke vil bli lagt ved søknad
          </Heading>
          <VStack gap="3">
            {files.rejectedFiles.map((rejected, index) => (
              <CustomItem
                key={index}
                index={index}
                file={rejected.file}
                error={errors[rejected.reason[0]]}
                onDelete={() => removeFile(rejected.file)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};
Default.parameters = { chromatic: { disable: true } };

const errors = {
  [FileRejectionReason.FileType]: "Filformatet støttes ikke",
  [FileRejectionReason.FileSize]: `Filen er større enn ${MAX_SIZE_MB} MB`,
};

function getListError(files: OnFileSelectProps) {
  const filesTooMany = files.acceptedFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}

export const Single: StoryFn = () => {
  const [files, setFiles] = useState<OnFileSelectProps>({
    allFiles: [],
    acceptedFiles: [],
    rejectedFiles: [],
  });

  function addFiles(filesToAdd: OnFileSelectProps) {
    setFiles(filesToAdd);
  }

  function removeFile() {
    setFiles({
      allFiles: [],
      acceptedFiles: [],
      rejectedFiles: [],
    });
  }

  return (
    <VStack gap="6" style={{ width: 500, maxWidth: "100%" }}>
      <FileUpload.Dropzone
        label="Last opp fil til søknaden"
        description={`Maks størrelse ${MAX_SIZE_MB} MB`}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
        maxSizeInBytes={MAX_SIZE}
        fileLimit={{ max: 1, current: files.allFiles.length }}
        multiple={false}
        onSelect={addFiles}
      />
      {files.acceptedFiles.map((file) => (
        <FileUpload.Item
          key={file.name}
          file={file}
          onDelete={() => removeFile()}
        />
      ))}
      {files.rejectedFiles.map((rejected) => (
        <FileUpload.Item
          key={rejected.file.name}
          file={rejected.file}
          error={errors[rejected.reason[0]]}
          onDelete={() => removeFile()}
        />
      ))}
    </VStack>
  );
};
Single.parameters = { chromatic: { disable: true } };

export const Translation = () => (
  <FileUpload
    translations={{
      dropzone: {
        dragAndDropMultiple: "Dra og slipp bilder i format .png",
        buttonMultiple: "Velg bilder",
        or: "eventuelt",
        disabled: "Du kan ikke laste opp flere bilder",
      },
      item: {
        deleteButtonTitle: "Slett bilde",
        downloading: "Laster bilde...",
        uploading: "Laster opp bilde...",
        retryButtonTitle: "Last opp bilde på nytt",
      },
    }}
  >
    <VStack gap="3" style={{ width: 500, maxWidth: "100%" }}>
      <FileUpload.Dropzone label="Last opp bilder" onSelect={console.log} />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        onDelete={() => null}
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        itemAction="retry"
        onRetry={() => null}
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        status="downloading"
      />{" "}
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        status="uploading"
      />
    </VStack>
  </FileUpload>
);

export const TriggerWithButton: StoryObj<typeof FileUpload.Trigger> = {
  render: (props) => {
    return (
      <FileUpload.Trigger {...props} onSelect={console.log}>
        <Button icon={<UploadIcon aria-hidden />}>Last opp filer</Button>
      </FileUpload.Trigger>
    );
  },
  args: {
    multiple: true,
    accept: "",
    maxSizeInBytes: 0,
  },
};
