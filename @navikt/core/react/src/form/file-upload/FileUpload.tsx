import React from "react";
import Dropzone from "./Dropzone";

interface FileUploadProps {
  children: React.ReactNode
}

interface FileUploadComponent extends React.ExoticComponent<FileUploadProps>{
  Dropzone: typeof Dropzone;
}

/**
 * A component for uploading files. Only used as a namespace. You should
 * use FileUpload.Dropzone instead.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/fileupload)
 * @example
 * ```jsx
 *  <FileUpload.Zone />
 * ```
 */
export const FileUpload = ((props: FileUploadProps) => props.children) as FileUploadComponent;

FileUpload.Dropzone = Dropzone;

export default FileUpload;
