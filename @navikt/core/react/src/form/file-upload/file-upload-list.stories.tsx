import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { FileItem } from "./item/types";

const meta: Meta<typeof FileUpload.List> = {
  title: "ds-react/FileUpload/List",
  component: FileUpload.List,
};

export default meta;

const onDelete = (file: FileItem) => alert(`Delete ${file.name}`);
const onRetry = (file: FileItem) => alert(`Retry ${file.name}`);
const fileTxt = new File(["abc".repeat(10000)], "file.txt");
const filePng = new File(["abc".repeat(10000)], "file.png");
const filePdf = new File(["abc".repeat(100000)], "file.pdf");
const fileDocx = new File(["abc"], "file.docx");
const fileXlsx = new File(["abc"], "file.xlsx");
const fileCsv = new File(["abc"], "file.csv");
const filePptx = new File(["abc"], "file.pptx");
const fileWebp = new File(["abc"], "file.webp");

interface ListStoryProps {
  error: string;
  isLoading: boolean;
  label: string;
  locale: "nb" | "nn" | "en";
}

export const ListIcons: StoryObj<ListStoryProps> = {
  render: (props) => (
    <FileUpload.List label={props.label} error={props.error}>
      <FileUpload.Item file={fileTxt} error="Oopsann" />
      <FileUpload.Item file={filePng} />
      <FileUpload.Item file={filePdf} />
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        isLoading={props.isLoading}
      />
      <FileUpload.Item file={fileXlsx} onDelete={() => onDelete(fileXlsx)} />
      <FileUpload.Item
        file={fileCsv}
        error="Åh nei!"
        onDelete={() => onDelete(fileCsv)}
      />
      <FileUpload.Item
        file={filePptx}
        error="Huffameg.."
        onDelete={() => onDelete(filePptx)}
      />
      <FileUpload.Item
        file={fileWebp}
        error="Au da.."
        onRetry={() => onRetry(fileWebp)}
        onDelete={() => onDelete(fileWebp)}
      />
    </FileUpload.List>
  ),
  args: {
    error: "hei jeg er en feil og jeg må rettes opp!",
    isLoading: true,
    label: "Opplastede filer",
  },
};

export const ListWithBreaking: StoryObj = {
  render: () => {
    const metadataFile = {
      name: "imafilewithanamethatistoolong.txt",
    };
    const nativeFile = new File(["a"], "imafilewithanamethatistoolong.png");
    const error = "imaverylongerrorandyoushouldfixme!";
    return (
      <div style={{ maxWidth: "200px" }}>
        <FileUpload.List label="Opplastede filer">
          <FileUpload.Item file={metadataFile} />
          <FileUpload.Item
            file={metadataFile}
            error={error}
            onDelete={() => {}}
          />
          <FileUpload.Item
            file={metadataFile}
            error={error}
            onDelete={() => {}}
          />
          <FileUpload.Item
            file={nativeFile}
            error={error}
            onDelete={() => {}}
          />
        </FileUpload.List>
      </div>
    );
  },
};

export const ListDownloading: StoryObj<ListStoryProps> = {
  render: () => (
    <FileUpload.List
      label="Opplastede filer"
      error="hei jeg er en feil og jeg må rettes opp!"
    >
      <FileUpload.Item
        file={{
          name: "withOnClick.txt",
          size: 35700,
        }}
        onClick={() => alert("onClick")}
      />
      <FileUpload.Item
        file={{
          name: "withOnClickAndDelete.txt",
          size: 35700,
        }}
        onClick={() => alert("onClick")}
        onDelete={() =>
          onDelete({
            name: "withOnClickAndDelete.txt",
            size: 35700,
          })
        }
      />
      <FileUpload.Item
        file={{
          name: "withHref.txt",
          size: 2000000,
        }}
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "withoutHrefOrOnClick.txt",
          size: 2000000,
        }}
      />
      <FileUpload.Item
        file={{
          name: "withBase64.txt",
          size: 2000000,
          base64: "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==",
        }}
      />
      <FileUpload.Item file={fileTxt} />
    </FileUpload.List>
  ),
};

export const ListLocales: StoryObj<ListStoryProps> = {
  render: (props) => (
    <>
      <FileUpload.List
        label="Opplastede filer med standard nynorsk locale"
        locale={props.locale}
      >
        <FileUpload.Item file={fileTxt} isLoading locale="nb" />
        <FileUpload.Item file={fileTxt} isLoading />
        <FileUpload.Item file={fileTxt} isLoading locale="en" />
      </FileUpload.List>
      <FileUpload.List label="Opplastede filer uten standard locale">
        <FileUpload.Item file={fileTxt} isLoading />
        <FileUpload.Item file={fileTxt} isLoading locale="nn" />
        <FileUpload.Item file={fileTxt} isLoading locale="en" />
      </FileUpload.List>
    </>
  ),
  args: {
    locale: "nn",
  },
};
