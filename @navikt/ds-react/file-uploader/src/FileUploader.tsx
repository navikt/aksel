import React, { forwardRef } from "react";
import cl from "classnames";
import "@navikt/ds-css/file-uploader/index.css";

export interface FileUploaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-file-uploader", className)}
        {...rest}
      ></div>
    );
  }
);

export default FileUploader;
