import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ImageIcon } from "@navikt/aksel-icons";
import { FileUpload } from "..";
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

export const States: StoryObj = {
  render: () => (
    <div>
      <h2>Disabled</h2>
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
      <h2>Error</h2>
      <FileUpload.Dropzone
        label="Last opp filer"
        onSelect={onSelect}
        error="Du må laste opp en fil"
        description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      />
    </div>
  ),
};

export const Translation: StoryObj = {
  render: () => (
    <div>
      <h2>Single file</h2>
      <FileUpload.Dropzone
        label="Last opp fil"
        multiple={false}
        onSelect={onSelect}
      />
      <h2>Custom texts</h2>
      <FileUpload.Dropzone
        translations={{
          dropzone: {
            dragAndDropMultiple: "Dra og slipp bilder i format .png",
            buttonMultiple: "Velg bilder",
            disabled: "Du kan ikke laste opp flere bilder",
          },
        }}
        label="Last opp bilder"
        onSelect={console.log}
        icon={ImageIcon}
      />
    </div>
  ),
};
