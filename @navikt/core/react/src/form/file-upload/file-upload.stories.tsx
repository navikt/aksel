import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { OnUploadProps } from "./Dropzone";
import { FileItem } from "./item/Item";

export default {
  title: "ds-react/FileUpload",
  component: FileUpload,
  argTypes: {
    error: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const onUpload = ({
  allFiles,
  acceptedFiles,
  rejectedFiles,
}: OnUploadProps) => {
  alert(
    `Lastet opp ${allFiles.length} filer. Accepted: ${acceptedFiles.length}. Rejected: ${rejectedFiles.length}`
  );
};

const onDelete = (file: FileItem) => alert(`Delete ${file.name}`)
const onRetry = (file: FileItem) => alert(`Retry ${file.name}`)
const fileTxt = new File(["abc".repeat(10000)], "file.docx")
const filePng = new File(["abc".repeat(10000)], "file.png")
const filePdf = new File(["abc".repeat(100000)], "file.pdf")
const fileDocx = new File(["abc"], "file.docx")
const fileXlsx = new File(["abc"], "file.xlsx")
const fileCsv = new File(["abc"], "file.csv")
const filePptx = new File(["abc"], "file.pptx")
const fileWebp = new File(["abc"], "file.webp")

export const List = {
  render: () => (
    <FileUpload.List
      label="Last opp filer"
      error="hei jeg er en feil og jeg må rettes opp!"
    >
      <FileUpload.Item
        file={fileTxt}
        error="Oopsann"
      />
      <FileUpload.Item
        file={filePng}
      />
      <FileUpload.Item
        file={filePdf}
      />
      <FileUpload.Item
        file={fileDocx}
        onDelete={onDelete}
        onRetry={onRetry}
        isLoading
      />
      <FileUpload.Item
        file={fileXlsx}
        onDelete={onDelete}
      />
      <FileUpload.Item
        file={fileCsv}
        error="Åh nei!"
        onDelete={onDelete}
      />
      <FileUpload.Item
        file={filePptx}
        error="Huffameg.."
        onDelete={onDelete}
      />
      <FileUpload.Item
        file={fileWebp}
        error="Au da.."
        onRetry={onRetry}
        onDelete={onDelete}
      />
    </FileUpload.List>
  ),
};

export const ListWithOverriding = {
  render: () => (
    <FileUpload.List
      label="Last opp filer"
      onDelete={onDelete}
      onRetry={onRetry}
      locale="nb"
    >
      <FileUpload.Item
        file={fileDocx}
      />
      <FileUpload.Item
        file={fileDocx}
        error="Prøv igjen"
      />
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => alert("delete med override")}
        onRetry={() => alert("retry med override")}
      />
      <FileUpload.Item
        file={fileDocx}
        error="Oopsie"
        onRetry={() => alert("retry med override")}
      />
      <FileUpload.Item
        file={fileDocx}
        isLoading
      />
      <FileUpload.Item
        file={fileDocx}
        isLoading
        locale="en"
      />
    </FileUpload.List>
  ),
};

export const Dropzone = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      onUpload={onUpload}
      id="fileupload-input"
    />
  ),
};
export const Accept = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      accept=".png"
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithError = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      id="fileupload-input"
    />
  ),
};

export const DropzoneWithErrorAndDescription = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      error="Du må laste opp en fil"
      description="Bruk filtype DOC, PPT eller PDF. Maks filstørrelse 10 MB."
      id="fileupload-input"
    />
  ),
};

export const LocaleEnglish = {
  render: () => (
    <FileUpload.Dropzone
      label="Provide documentation"
      onUpload={onUpload}
      id="fileupload-input"
      locale="en"
    />
  ),
};

export const LocaleNynorsk = {
  render: () => (
    <FileUpload.Dropzone
      label="Last opp filer"
      onUpload={onUpload}
      id="fileupload-input"
      locale="nn"
    />
  ),
};
