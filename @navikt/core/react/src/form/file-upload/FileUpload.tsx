import React from "react";
import Dropzone from "./Dropzone";
import List from "./list/List";
import Item from "./item/Item";

interface FileUploadProps {
  children: React.ReactNode
}

interface FileUploadComponent extends React.ExoticComponent<FileUploadProps>{
  Dropzone: typeof Dropzone;
  List: typeof List;
  Item: typeof Item;
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
FileUpload.List = List;
FileUpload.Item = Item;

export default FileUpload;
