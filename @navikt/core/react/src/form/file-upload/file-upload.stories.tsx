import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { OnUploadProps } from "./FileUpload";

export default {
  title: "ds-react/FileUpload",
  component: FileUpload,
  argTypes: {
    error: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const onUpload = ({
  allFiles,
  acceptedFiles,
  rejectedFiles,
}: OnUploadProps) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`
  );
};

export const Zone = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const ZoneWithDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      id="fileupload-input"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const Button = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
    >
      <FileUpload.Button />
    </FileUpload>
  ),
};

export const ButtonWithDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      id="fileupload-input"
    >
      <FileUpload.Button />
    </FileUpload>
  ),
};

export const Accept = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      accept=".png"
      id="fileupload-input"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const ButtonWithError = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      id="fileupload-input"
    >
      <FileUpload.Button />
    </FileUpload>
  ),
};

export const ZoneWithError = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      id="fileupload-input"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const ZoneWithErrorAndDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      id="fileupload-input"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const LocaleEnglish = {
  render: () => (
    <FileUpload
      label="Provide documentation"
      onUpload={onUpload}
      id="fileupload-input"
      locale="en"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};

export const LocaleNynorsk = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
      locale="nn"
    >
      <FileUpload.Dropzone />
    </FileUpload>
  ),
};
