import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ImageIcon } from "@navikt/aksel-icons";
import { FileUpload } from "..";
import { HStack } from "../../layout/stack";
import { OnFileSelectProps } from "./FileUpload.types";

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
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState<string | null>(null);
    return (
      <div style={{ height: 400 }}>
        <button onClick={() => setError((x) => (!x ? "error" : null))}>
          toggle
        </button>
        <FileUpload.Dropzone
          label="Last opp filer"
          onSelect={onSelect}
          error={error}
        />
      </div>
    );
  },
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
        <FileUpload.Dropzone label="Norsk bokmål" onSelect={onSelect} />
      </FileUpload>
      <FileUpload locale="en">
        <FileUpload.Dropzone label="English" onSelect={onSelect} />
      </FileUpload>
    </HStack>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div>
      <FileUpload.Dropzone
        label="Disabled prop"
        onSelect={console.log}
        disabled
      />
      <FileUpload.Dropzone
        label="FileLimit disabled"
        onSelect={console.log}
        fileLimit={{ max: 1, current: 2 }}
      />
    </div>
  ),
};

export const Custom: StoryObj = {
  render: () => (
    <div>
      <FileUpload.Dropzone
        label="Custom variant"
        onSelect={console.log}
        icon={ImageIcon}
        dragDropText="Dra og slipp bilder i format .png"
        buttonText="Velg bilder"
        disabledText="Du kan ikke laste opp flere bilder"
      />
    </div>
  ),
};
