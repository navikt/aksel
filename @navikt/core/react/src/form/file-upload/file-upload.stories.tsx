import React from "react";
import { Meta } from "@storybook/react";
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
      inputId="fileupload-input"
    >
      <FileUpload.Zone />
    </FileUpload>
  ),
};

export const ZoneWithDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      inputId="fileupload-input"
    >
      <FileUpload.Zone />
    </FileUpload>
  ),
};

export const Button = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      inputId="fileupload-input"
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
      inputId="fileupload-input"
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
      inputId="fileupload-input"
    >
      <FileUpload.Zone />
    </FileUpload>
  ),
};

export const ButtonWithError = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      inputId="fileupload-input"
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
      inputId="fileupload-input"
    >
      <FileUpload.Zone />
    </FileUpload>
  ),
};
