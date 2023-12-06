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
 * A set of components used to upload files and display files.
 * FileUpload is only a namespace, only use the subcomponents.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/fileupload)
 * @example
 * ```jsx
 *  <FileUpload.Dropzone />
 * ```
 *
 * @example
 * ```jsx
 *  <FileUpload.List>
 *    <FileUpload.Item file={myFile} />
 *    <FileUpload.Item file={mySecondFile} />
 *  </FileUpload.List>
 * ```
 *
 * @example
 * ```jsx
 *  <FileUpload.Item file={myStandaloneFile} />
 * ```
 */
export const FileUpload = ((props: FileUploadProps) => props.children) as FileUploadComponent;

FileUpload.Dropzone = Dropzone;
FileUpload.List = List;
FileUpload.Item = Item;

export default FileUpload;
