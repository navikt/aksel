import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { OnFileSelectProps } from "./Dropzone";

const meta: Meta<typeof FileUpload.Dropzone> = {
  title: "ds-react/FileUpload/Dropzone",
  component: FileUpload.Dropzone,
};

export default meta;

const onSelect = ({
  allFiles,
  acceptedFiles,
  rejectedFiles,
}: OnFileSelectProps) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`
  );
};

export const Dropzone = {
  render: () => (
    <FileUpload.Dropzone label="Last opp filer" onSelect={onSelect} />
  ),
};

export const DropzoneSingle = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp fil"
      multiple={false}
      onSelect={onSelect}
    />
  ),
};

export const DropzoneWithDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onSelect={onSelect}
    />
  ),
};
export const Accept = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      accept=".png"
    />
  ),
};

export const DropzoneWithError = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      error="Du må laste opp en fil"
    />
  ),
};

export const DropzoneWithErrorAndDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      error="Du må laste opp en fil"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
    />
  ),
};

export const LocaleEnglish = {
  render: () => (
    <FileUpload.Dropzone
      label="Provide documentation"
      onSelect={onSelect}
      locale="en"
    />
  ),
};

export const LocaleNynorsk = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      locale="nn"
    />
  ),
};
