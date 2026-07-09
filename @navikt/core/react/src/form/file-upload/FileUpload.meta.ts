import type { ComponentMetadata } from "../../utils/types/metadata";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadTrigger,
} from "./index";

const metadata: ComponentMetadata = {
  name: "FileUpload",
  components: {
    FileUpload,
    "FileUpload.Trigger": FileUploadTrigger,
    "FileUpload.Dropzone": FileUploadDropzone,
    "FileUpload.Item": FileUploadItem,
  },
  keywords: [
    "file upload",
    "filopplasting",
    "upload",
    "dropzone",
    "attachment",
  ],
};

export { metadata };
