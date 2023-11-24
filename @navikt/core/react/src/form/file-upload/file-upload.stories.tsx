import React from "react";
import { Meta } from "@storybook/react";
import { FileUpload } from "..";
import { OnUploadProps } from "./FileUpload";

export default {
  title: "ds-react/FileUpload",
  component: FileUpload,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["button", "zone"],
      },
    },
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
      variant="zone"
      inputId="fileupload-input"
    />
  ),
};

export const ZoneWithDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      variant="zone"
      inputId="fileupload-input"
    />
  ),
};

export const Button = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      variant="button"
      inputId="fileupload-input"
    />
  ),
};

export const ButtonWithDescription = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      variant="button"
      inputId="fileupload-input"
    />
  ),
};

export const Accept = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      variant="zone"
      accept=".png"
      inputId="fileupload-input"
    />
  ),
};

export const ButtonWithError = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      variant="button"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};

export const ZoneWithError = {
  render: () => (
    <FileUpload
      label="Last opp filer"
      onUpload={onUpload}
      variant="zone"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};
