import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { FileUpload } from "..";
import { VStack } from "../../layout/stack";
import { OnFileSelectProps } from "./parts/Dropzone";

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
      rejectedFiles: files.rejectedFiles.filter(filter),
    };
    setFiles(newFiles);
  }

  return (
    <VStack gap="6" style={{ maxWidth: 500 }}>
      <FileUpload.Dropzone
        label="Last opp filer til søknaden"
        description={`I formatene doc, xls, pdf - maks størrelse ${MAX_SIZE_MB} MB`}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
        onSelect={addFiles}
      />

      {files.allFiles.length > 0 && (
        <FileUpload.List
          label={`Valgte filer (${files.allFiles.length} av ${MAX_FILES})`}
          error={getListError(files)}
        >
          {files.allFiles.map((file, index) => (
            <FileUpload.Item
              key={index}
              file={file}
              error={getError(file, files.rejectedFiles)}
              onDelete={() => removeFile(file)}
            />
          ))}
        </FileUpload.List>
      )}
    </VStack>
  );
};

function getError(file: File, rejectedFiles: File[]) {
  if (file.size > MAX_SIZE) return `Filen er større enn ${MAX_SIZE} MB`;
  if (rejectedFiles.includes(file)) return "Filformatet støttes ikke";
  return undefined;
}

function getListError(files: OnFileSelectProps) {
  const filesTooMany = files.allFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}
