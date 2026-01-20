import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React from "react";
import { fireEvent, within } from "storybook/test";
import { ImageIcon } from "@navikt/aksel-icons";
import { type FileObject, FileUpload, type FilesPartitioned } from ".";

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

const onSelect = (
  allFiles: FileObject[],
  { accepted, rejected }: FilesPartitioned,
) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${accepted.length}. Rejected: ${rejected.length}`,
  );
};

export const Default: StoryObj<typeof FileUpload.Dropzone> = {
  render: (props) => <FileUpload.Dropzone {...props} onSelect={console.log} />,
  args: {
    label: "Last opp filer",
    description: "",
    error: "",
    multiple: true,
    accept: "",
    maxSizeInBytes: 0,
    fileLimit: { max: 2, current: 1 },
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
  },
  parameters: { chromatic: { disable: true } },
};

export const States = () => {
  return (
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

      <h2>Dragging</h2>
      <FileUpload.Dropzone
        label="Drag over test"
        multiple={false}
        onSelect={onSelect}
      />
    </div>
  );
};
States.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByText("Velg fil");
  fireEvent.dragEnter(button);
};

export const Translation: StoryFn = () => {
  return (
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
          dragAndDropMultiple: "Dra og slipp bilder i format .png",
          buttonMultiple: "Velg bilder",
          disabled: "Du kan ikke laste opp flere bilder",
        }}
        label="Last opp bilder"
        onSelect={console.log}
        icon={ImageIcon}
      />

      <h3>Disabled</h3>
      <FileUpload.Dropzone
        translations={{
          disabled: "Du kan ikke laste opp flere bilder",
        }}
        label="Last opp bilder"
        onSelect={console.log}
        icon={ImageIcon}
        disabled
      />
    </div>
  );
};
