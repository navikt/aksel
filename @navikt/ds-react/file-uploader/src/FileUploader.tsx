import React, { forwardRef } from "react";
import { Upload } from "@navikt/ds-icons";
import cl from "classnames";
import "@navikt/ds-css/file-uploader/index.css";
import Button from "../../button/src";

export interface FileUploaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * A string that defines the file types the file input should accept.
   * This string is a comma-separated list of unique file type specifiers.
   */
  accept?: string;
  multiple?: boolean;
  capture?: boolean | string;
}

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    { className, id, onChange, accept, multiple = false, capture, ...rest },
    ref
  ) => {
    const fileIntputRef = React.useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
      if (fileIntputRef?.current) {
        fileIntputRef.current.click();
      }
    };

    return (
      <div ref={ref} className={cl("navds-file-uploader", className)} {...rest}>
        <Button onClick={onButtonClick}>
          <Upload
            style={{ verticalAlign: "middle" }}
            role="img"
            focusable={false}
          />{" "}
          Velg filer
        </Button>
        <input
          id={id}
          type="file"
          ref={fileIntputRef}
          tabIndex={-1}
          onChange={onChange}
          accept={accept}
          multiple={multiple}
          capture={capture}
        />
      </div>
    );
  }
);

export default FileUploader;
