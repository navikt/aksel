import React, { ChangeEvent } from "react";
import { Meta } from "@storybook/react";
import { FileUpload } from "..";
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

const onChange = (event: ChangeEvent<HTMLInputElement>) => {console.log(`Lastet opp ${event.target.files.length} filer`)}

export const Button = {
  render: (props) => (
    <FileUpload
      onChange={onChange}
      variant="button"
      inputId="fileupload-input"
    />
  ),
};

export const Box = {
  render: (props) => (
    <FileUpload
      onChange={onChange}
      variant="box"
      inputId="fileupload-input"
    />
  ),
};

export const ButtonWithError = {
  render: (props) => (
    <FileUpload
      onChange={onChange}
      variant="button"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};

export const BoxWithError = {
  render: (props) => (
    <FileUpload
      onChange={onChange}
      variant="box"
      error="Du må laste opp en fil"
      inputId="fileupload-input"
    />
  ),
};
