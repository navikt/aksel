import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { VStack } from "../../layout/stack";

const meta: Meta<typeof FileUpload.Item> = {
  title: "ds-react/FileUpload/Item",
  component: FileUpload.Item,
};

export default meta;

const fileDocx = new File(["abc"], "file.docx");

export const StandaloneFileItem: StoryObj<typeof FileUpload.Item> = {
  render: (props) => <FileUpload.Item {...props} file={fileDocx} />,
  args: {
    error: "",
    href: "",
    locale: "nb",
  },
  argTypes: {
    status: {
      options: [undefined, "uploading", "downloading"],
      control: { type: "radio" },
    },
  },
};

export const BreakingText: StoryObj = {
  render: () => {
    const metadataFile = { name: "imafilewithanamethatistoolong.txt" };
    const nativeFile = new File(["a"], "imafilewithanamethatistoolong.png");
    const error = "imaverylongerrorandyoushouldfixme!";

    return (
      <VStack gap="3" style={{ maxWidth: "200px" }}>
        <FileUpload.Item file={metadataFile} />
        <FileUpload.Item
          file={metadataFile}
          error={error}
          onDelete={() => {}}
        />
        <FileUpload.Item file={metadataFile} status="uploading" />
        <FileUpload.Item file={nativeFile} error={error} onDelete={() => {}} />
      </VStack>
    );
  },
};
