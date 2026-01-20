import { Meta, StoryFn } from "@storybook/react-vite";
import React, { useEffect, useState } from "react";
import { UploadIcon } from "@navikt/aksel-icons";
import { FileUpload, FileUploadItemProps } from ".";
import { Alert } from "../../alert";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Heading } from "../../typography";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import {
  FileObject,
  FileRejected,
  FileRejectionReason,
} from "./FileUpload.types";
import {
  States as DropzoneStates,
  Translation as DropzoneTranslation,
} from "./file-upload-dropzone.stories";
import {
  Description as ItemDescription,
  Download as ItemDownload,
  Icons as ItemIcons,
  States as ItemStates,
} from "./file-upload-item.stories";

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
  onDelete,
  ...props
}: FileUploadItemProps & {
  index: number;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false);
      },
      1700 * index + 1,
    );
  }, [index]);

  return (
    <FileUpload.Item
      {...props}
      status={loading ? "uploading" : "idle"}
      button={{
        action: "delete",
        onClick: onDelete,
      }}
      as="li"
    />
  );
};

export const Default: StoryFn = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  function addFiles(filesToAdd: FileObject[]) {
    setFiles([...files, ...filesToAdd]);
  }

  function removeFile(fileToRemove: FileObject) {
    setFiles(files.filter((file) => file !== fileToRemove));
  }

  const acceptedFiles = files.filter((file) => !file.error);
  const rejectedFiles = files.filter((f): f is FileRejected => f.error);

  return (
    <FileUpload style={{ width: 500, maxWidth: "100%", margin: "0 auto" }}>
      <VStack gap="space-24">
        <FileUpload.Dropzone
          label="Last opp filer til søknaden"
          description={`Maks størrelse ${MAX_SIZE_MB} MB`}
          accept=".doc,.docx,.xls,.xlsx,.pdf"
          maxSizeInBytes={MAX_SIZE}
          fileLimit={{ max: MAX_FILES, current: acceptedFiles.length }}
          onSelect={addFiles}
        />

        {getListError(acceptedFiles) && (
          <Alert variant="error">{getListError(acceptedFiles)}</Alert>
        )}

        {acceptedFiles.length > 0 && (
          <VStack gap="space-8">
            <Heading level="3" size="xsmall">
              {`Vedlegg (${acceptedFiles.length} av maks ${MAX_FILES})`}
            </Heading>
            <VStack as="ul" gap="space-12">
              {acceptedFiles.map((file, index) => (
                <CustomItem
                  key={index}
                  index={index}
                  file={file.file}
                  onDelete={() => removeFile(file)}
                />
              ))}
            </VStack>
          </VStack>
        )}
        {rejectedFiles.length > 0 && (
          <VStack gap="space-8">
            <Heading level="3" size="xsmall">
              Vedlegg med feil
            </Heading>
            <VStack as="ul" gap="space-12">
              {rejectedFiles.map((rejected, index) => (
                <CustomItem
                  key={index}
                  index={index}
                  file={rejected.file}
                  error={errors[rejected.reasons[0]]}
                  onDelete={() => removeFile(rejected)}
                />
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </FileUpload>
  );
};
Default.parameters = {
  chromatic: { disable: true },
  layout: "padded",
};

const errors: Record<FileRejectionReason, string> = {
  fileType: "Filformatet støttes ikke",
  fileSize: `Filen er større enn ${MAX_SIZE_MB} MB`,
};

function getListError(acceptedFiles: FileObject[]) {
  const filesTooMany = acceptedFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}

export const Single: StoryFn = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  function addFiles(filesToAdd: FileObject[]) {
    setFiles(filesToAdd);
  }

  function removeFile() {
    setFiles([]);
  }

  return (
    <VStack gap="space-24" style={{ width: 500, maxWidth: "100%" }}>
      <FileUpload.Dropzone
        label="Last opp fil til søknaden"
        description={`Maks størrelse ${MAX_SIZE_MB} MB`}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
        maxSizeInBytes={MAX_SIZE}
        fileLimit={{ max: 1, current: files.length }}
        multiple={false}
        onSelect={addFiles}
      />
      {files.map((file) => (
        <FileUpload.Item
          key={file.file.name}
          file={file.file}
          error={file.error ? errors[file.reasons[0]] : undefined}
          button={{
            action: "delete",
            onClick: removeFile,
          }}
        />
      ))}
    </VStack>
  );
};
Single.parameters = { chromatic: { disable: true } };

export const Translation: StoryFn = () => (
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
    <VStack gap="space-12" style={{ width: 500, maxWidth: "100%" }}>
      <FileUpload.Dropzone label="Last opp bilder" onSelect={console.log} />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        button={{
          action: "delete",
          onClick: () => null,
        }}
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        button={{
          action: "retry",
          onClick: () => null,
        }}
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        status="downloading"
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        status="uploading"
      />
      <FileUpload.Item
        file={{ name: "eksempel.png", size: 200000 }}
        status="uploading"
        translations={{ uploading: "Sender bilde..." }}
      />
    </VStack>
  </FileUpload>
);

export const TriggerWithButton: StoryFn = (props) => (
  <FileUpload.Trigger {...props} onSelect={console.log}>
    <Button variant="secondary" icon={<UploadIcon aria-hidden />}>
      Last opp filer
    </Button>
  </FileUpload.Trigger>
);

TriggerWithButton.args = {
  multiple: true,
  accept: "",
  maxSizeInBytes: 0,
};

export const ColorRoles = () => (
  <div data-color="brand-magenta">
    <h2>Default</h2>
    <Default />
    <h2>TriggerWithButton</h2>
    <TriggerWithButton />
    <h2>DropzoneStates</h2>
    <DropzoneStates />
    <h2>ItemStates</h2>
    <ItemStates />
  </div>
);

export const Chromatic = renderStoriesForChromatic({
  Default,
  Single,
  Translation,
  TriggerWithButton,
  DropzoneStates,
  DropzoneTranslation,
  ItemDescription: () => (
    <div style={{ width: 400, maxWidth: "100%" }}>
      <ItemDescription />
    </div>
  ),
  ItemDownload,
  ItemIcons,
  ItemStates,
});
