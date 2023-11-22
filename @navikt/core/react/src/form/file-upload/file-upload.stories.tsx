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
        options: ["button", "box"]
      },
    },
    error: {
      control: {
        type: "text"
      }
    }
  }
} as Meta;

const onUpload = ({ allFiles, acceptedFiles, rejectedFiles }: OnUploadProps) => {
  alert(`Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`)
}

export const Button = {
  render: (props) => (
    <FileUpload
      onUpload={onUpload}
      variant="button"
      inputId="fileupload-input"
    />
  ),
};

export const Box = {
  render: (props) => (
    <FileUpload
      onUpload={onUpload}
      variant="box"
      inputId="fileupload-input"
    />
  ),
};

export const Accept = {
  render: (props) => (
    <FileUpload
      onUpload={onUpload}
      variant="box"
      accept=".png"
      inputId="fileupload-input"
    />
  ),
};

export const ButtonWithError = {
  render: (props) => (
    <FileUpload
      onUpload={onUpload}
      variant="button"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};

export const BoxWithError = {
  render: (props) => (
    <FileUpload
      onUpload={onUpload}
      variant="box"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};
