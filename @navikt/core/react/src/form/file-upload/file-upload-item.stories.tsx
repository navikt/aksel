import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileItem, FileUpload } from "..";
import { VStack } from "../../layout/stack";
import { Heading } from "../../typography";

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

export const Default: StoryObj<typeof FileUpload.Item> = {
  render: (props) => <FileUpload.Item {...props} file={fileDocx} />,
  args: {
    error: "",
    href: "",
  },
  argTypes: {
    status: {
      options: [undefined, "uploading", "downloading"],
      control: { type: "radio" },
    },
  },
};

export const Icons: StoryObj<typeof FileUpload.List> = {
  render: () => (
    <VStack gap="5">
      <FileUpload.Item file={fileTxt} />
      <FileUpload.Item file={filePng} />
      <FileUpload.Item file={filePdf} />
      <FileUpload.Item file={fileDocx} />
      <FileUpload.Item file={fileDocx} status="uploading" />
      <FileUpload.Item file={fileDocx} status="downloading" />
      <FileUpload.Item file={fileXlsx} />
      <FileUpload.Item file={fileCsv} />
      <FileUpload.Item file={filePptx} />
      <FileUpload.Item file={fileWebp} />
    </VStack>
  ),
};

export const Error: StoryObj<typeof FileUpload.List> = {
  render: () => (
    <VStack gap="5">
      <Heading size="small">Vanlig error</Heading>
      <FileUpload.Item file={fileTxt} error="Plain error" />
      <Heading size="small">Error og uploading</Heading>
      <FileUpload.Item
        file={fileTxt}
        error="Error og uploading"
        status="uploading"
        onRetry={() => onRetry(fileTxt)}
        onDelete={() => onDelete(fileTxt)}
      />
    </VStack>
  ),
};

export const Buttons: StoryObj<typeof FileUpload.List> = {
  render: () => (
    <VStack gap="5">
      <FileUpload.Item file={fileXlsx} onRetry={() => onRetry(fileXlsx)} />
      <FileUpload.Item
        file={fileXlsx}
        onRetry={() => onRetry(fileXlsx)}
        onDelete={() => onDelete(fileXlsx)}
      />
      <FileUpload.Item file={fileXlsx} onDelete={() => onDelete(fileXlsx)} />
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="uploading"
      />
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="downloading"
      />
      <FileUpload.Item
        file={fileCsv}
        error="Error og onRetry"
        onRetry={() => onRetry(fileCsv)}
      />
      <FileUpload.Item
        file={filePptx}
        error="Error og onDelete"
        onDelete={() => onDelete(filePptx)}
      />
      <FileUpload.Item
        file={fileWebp}
        error="Error, onRetry og onDelete"
        onRetry={() => onRetry(fileWebp)}
        onDelete={() => onDelete(fileWebp)}
      />
    </VStack>
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
        onClick={() => alert("onClick")}
      />
      <FileUpload.Item
        file={{
          name: "withOnClickAndDelete.txt",
          size: 600_000_000,
        }}
        onClick={() => alert("onClick")}
        onDelete={() =>
          onDelete({
            name: "withOnClickAndDelete.txt",
            size: 600_000_000,
          })
        }
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
          name: "withHrefAndDelete.txt",
          size: 1,
        }}
        onDelete={() =>
          onDelete({
            name: "withHref.txt",
            size: 1,
          })
        }
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "withoutHrefOrOnClick.txt",
          size: 2_000_000,
        }}
      />
      <FileUpload.Item file={fileTxt} />
    </VStack>
  ),
};

export const Locale: StoryObj<{ locale: "nb" | "en" }> = {
  render: () => (
    <VStack gap="12">
      <Heading size="medium">Laster opp</Heading>
      <FileUpload locale="nb">
        <FileUpload.Item file={fileTxt} status="uploading" />
        <FileUpload.Item file={fileTxt} status="uploading" />
        <FileUpload.Item file={fileTxt} status="uploading" />
        <FileUpload.Item file={fileTxt} status="uploading" />
      </FileUpload>

      <Heading size="medium">Laster ned</Heading>
      <FileUpload locale="en">
        <FileUpload.Item file={fileTxt} status="downloading" />
        <FileUpload.Item file={fileTxt} status="downloading" />
        <FileUpload.Item file={fileTxt} status="downloading" />
        <FileUpload.Item file={fileTxt} status="downloading" />
      </FileUpload>
    </VStack>
  ),
};
