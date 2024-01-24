import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { HStack } from "../../layout/stack";
import { OnFileSelectProps } from "./parts/dropzone/dropzone.types";

const meta: Meta<typeof FileUpload.Dropzone> = {
  title: "ds-react/FileUpload/Dropzone",
  component: FileUpload.Dropzone,
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const onSelect = ({
  allFiles,
  acceptedFiles,
  rejectedFiles,
}: OnFileSelectProps) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`,
  );
};

export const Default: StoryObj<typeof FileUpload.Dropzone> = {
  render: (props) => <FileUpload.Dropzone {...props} onSelect={onSelect} />,
  args: {
    label: "Last opp filer",
    description: "",
    error: "",
    multiple: true,
    accept: "",
  },
};

export const SingleFile: StoryObj = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp fil"
      multiple={false}
      onSelect={onSelect}
    />
  ),
};

export const WithDescription: StoryObj = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onSelect={onSelect}
    />
  ),
};

export const WithError: StoryObj = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      error="Du må laste opp en fil"
    />
  ),
};

export const WithErrorAndDescription: StoryObj = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onSelect={onSelect}
      error="Du må laste opp en fil"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
    />
  ),
};

export const Locales: StoryObj = {
  render: () => (
    <HStack gap="12">
      <FileUpload locale="nb">
        <FileUpload.Dropzone label="English" onSelect={onSelect} />
      </FileUpload>
      <FileUpload locale="en">
        <FileUpload.Dropzone label="Nynorsk" onSelect={onSelect} />
      </FileUpload>
    </HStack>
  ),
};

export const Widget: StoryObj = {
  render: () => <FileUpload.Dropzone label="Widget" onSelect={console.log} />,
};
