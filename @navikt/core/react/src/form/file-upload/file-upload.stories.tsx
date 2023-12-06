import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { OnUploadProps } from "./Dropzone";

const meta: Meta<typeof FileUpload.Dropzone> = {
  title: "ds-react/FileUpload/Dropzone",
  component: FileUpload.Dropzone,
};

export default meta;

const onUpload = ({
  allFiles,
  acceptedFiles,
  rejectedFiles,
}: OnUploadProps) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`
  );
};

export const Dropzone = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      id="fileupload-input"
    />
  ),
};
export const Accept = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      accept=".png"
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithError = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithErrorAndDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      id="fileupload-input"
    />
  ),
};

export const LocaleEnglish = {
  render: () => (
    <FileUpload.Dropzone
      label="Provide documentation"
      onUpload={onUpload}
      id="fileupload-input"
      locale="en"
    />
  ),
};

export const LocaleNynorsk = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
      locale="nn"
    />
  ),
};
