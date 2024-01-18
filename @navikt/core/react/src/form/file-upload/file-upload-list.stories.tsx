import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { VStack } from "../../layout/stack";

const meta: Meta<typeof FileUpload.List> = {
  title: "ds-react/FileUpload/List",
  component: FileUpload.List,
};

export default meta;

const fileTxt = new File(["abc".repeat(10000)], "file.txt");
const fileDocx = new File(["abc"], "file.docx");

export const Default: StoryObj<typeof FileUpload.List> = {
  render: (props) => (
    <>
      <FileUpload.Item file={fileTxt} />
      <FileUpload.List {...props}>
        <FileUpload.Item file={fileTxt} />
        <FileUpload.Item file={fileDocx} />
      </FileUpload.List>
    </>
  ),
  args: {
    label: "Opplastede filer",
    error: "",
  },
};

export const WithoutLabel: StoryObj<typeof FileUpload.List> = {
  render: (props) => (
    <FileUpload.List {...props}>
      <FileUpload.Item file={fileTxt} />
      <FileUpload.Item file={fileDocx} />
    </FileUpload.List>
  ),
};

export const WithError: StoryObj<typeof FileUpload.List> = {
  render: (props) => (
    <FileUpload.List {...props}>
      <FileUpload.Item file={fileTxt} />
      <FileUpload.Item file={fileDocx} />
    </FileUpload.List>
  ),
  args: {
    label: "Opplastede filer",
    error: "hei jeg er en feil og jeg må rettes opp!",
  },
};

export const Locales: StoryObj<typeof FileUpload.List> = {
  render: () => (
    <VStack gap="10">
      <FileUpload locale="nb">
        <FileUpload.List label="Bokmål">
          <FileUpload.Item file={fileTxt} status="uploading" />
          <FileUpload.Item file={fileDocx} />
        </FileUpload.List>
      </FileUpload>

      <FileUpload locale="en">
        <FileUpload.List label="Engelsk">
          <FileUpload.Item file={fileTxt} status="uploading" />
          <FileUpload.Item file={fileDocx} />
        </FileUpload.List>
      </FileUpload>
    </VStack>
  ),
};
