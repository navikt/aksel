import React, { forwardRef } from "react";
import { Upload } from "@navikt/ds-icons";
import cl from "classnames";
import "@navikt/ds-css/file-uploader/index.css";
import Button from "../../button/src";

export interface FileUploaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onInputChange: (event: React.ChangeEvent<HTMLElement>) => void;
}

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ className, id, onInputChange, ...rest }, ref) => {
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
          type="file"
          ref={fileIntputRef}
          tabIndex={-1}
          onChange={(event) => onInputChange(event)}
          multiple
        />
      </div>
    );
  }
);

export default FileUploader;
