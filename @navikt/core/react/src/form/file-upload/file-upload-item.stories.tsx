import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";

const meta: Meta<typeof FileUpload.Item> = {
  title: "ds-react/FileUpload/Item",
  component: FileUpload.Item,
};

export default meta;

const fileDocx = new File(["abc"], "file.docx");

export const StandaloneFileItem = {
  render: () => <FileUpload.Item file={fileDocx} />,
};
