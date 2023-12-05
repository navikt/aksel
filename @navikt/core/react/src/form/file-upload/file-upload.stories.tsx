import { Meta } from "@storybook/react";
import React from "react";
import { FileUpload } from "..";
import { OnUploadProps } from "./Dropzone";
import { FileItem } from "./item/props";

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
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        isLoading
      />
      <FileUpload.Item
        file={fileXlsx}
        onDelete={() => onDelete(fileXlsx)}
      />
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
};

// export const ListWithDownloading = {
//   render: () => (
//     <FileUpload.List
//       label="Last opp filer"
//       error="hei jeg er en feil og jeg må rettes opp!"
//     >
//       <FileUpload.Item
//         file={{
//           name: "withOnClick.docx",
//           size: 35700
//         }}
//         onClick={(file) => alert(`onClick ${file.name}`)}
//       />
//       <FileUpload.Item
//         file={{
//           name: "withOnClickAndDelete.docx",
//           size: 35700
//         }}
//         onClick={(file) => alert(`onClick ${file.name}`)}
//         onDelete={onDelete}
//       />
//       <FileUpload.Item
//         file={{
//           name: "withHref.docx",
//           size: 2000000
//         }}
//         href="https://www.nav.no"
//       />
//       <FileUpload.Item
//         file={filePdf}
//         onClick={2}
//       />
//     </FileUpload.List>
//   ),
// };

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
