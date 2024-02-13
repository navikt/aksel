import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileItem, FileUpload } from "..";
import { VStack } from "../../layout/stack";

const meta: Meta<typeof FileUpload.Item> = {
  title: "ds-react/FileUpload/Item",
  component: FileUpload.Item,
  decorators: [
    (Story) => (
      <div style={{ width: 400, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const onDelete = (file: FileItem) => alert(`Delete ${file.name}`);
const onRetry = (file: FileItem) => alert(`Retry ${file.name}`);
const fileTxt = new File(["abc".repeat(10000)], "file.txt");
const filePng = new File(["abc".repeat(10000)], "file.png");
const filePdf = new File(["abc".repeat(100000)], "file.pdf");
const fileXlsx = new File(["abc"], "file.xlsx");
const fileCsv = new File(["abc"], "file.csv");
const filePptx = new File(["abc"], "file.pptx");
const fileWebp = new File(["abc"], "file.webp");
const fileDocx = new File(["abc"], "file.docx");

export const Icons: StoryObj<typeof FileUpload.Item> = {
  render: () => (
    <FileUpload>
      <VStack gap="5" as="ul">
        <FileUpload.Item file={fileTxt} as="li" />
        <FileUpload.Item file={filePng} as="li" />
        <FileUpload.Item file={filePdf} as="li" />
        <FileUpload.Item file={fileDocx} as="li" />
        <FileUpload.Item file={fileDocx} as="li" status="uploading" />
        <FileUpload.Item file={fileDocx} as="li" status="downloading" />
        <FileUpload.Item file={fileXlsx} as="li" />
        <FileUpload.Item file={fileCsv} as="li" />
        <FileUpload.Item file={filePptx} as="li" />
        <FileUpload.Item file={fileWebp} as="li" />
      </VStack>
    </FileUpload>
  ),
};

export const States: StoryObj<typeof FileUpload.Item> = {
  render: () => (
    <div>
      <h2>Error</h2>
      <FileUpload.Item file={fileTxt} error="Plain error" />
      <h3>error + status</h3>
      <FileUpload.Item
        file={fileTxt}
        error="Error og uploading"
        status="uploading"
        onRetry={() => onRetry(fileTxt)}
        onDelete={() => onDelete(fileTxt)}
      />
      <h2>Item Actions</h2>
      <h3>status + delete</h3>
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="uploading"
        itemAction="delete"
      />
      <h3>status + retry</h3>
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="downloading"
        itemAction="retry"
      />
      <h3>retry</h3>
      <FileUpload.Item
        file={fileCsv}
        onRetry={() => onRetry(fileCsv)}
        itemAction="retry"
      />
      <h3>delete</h3>
      <FileUpload.Item
        file={filePptx}
        onDelete={() => onDelete(filePptx)}
        itemAction="delete"
      />
      <h3>retry + error</h3>
      <FileUpload.Item
        file={fileCsv}
        error="Error og onRetry"
        onRetry={() => onRetry(fileCsv)}
        itemAction="retry"
      />
      <h3>delete + error</h3>
      <FileUpload.Item
        file={filePptx}
        error="Error og onDelete"
        onDelete={() => onDelete(filePptx)}
        itemAction="delete"
      />
    </div>
  ),
};

export const Download: StoryObj = {
  render: () => (
    <VStack gap="5">
      <FileUpload.Item
        file={{
          name: "withOnClick.txt",
          size: 1_048_576,
        }}
        onFileClick={() => alert("onFileClick")}
      />
      <FileUpload.Item
        file={{
          name: "withHref.txt",
          size: 1,
        }}
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "withoutHrefOrOnFileClick.txt",
          size: 2_000_000,
        }}
      />
      <FileUpload.Item file={fileTxt} />
    </VStack>
  ),
};
