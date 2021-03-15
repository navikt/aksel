import React, { forwardRef } from "react";
import cl from "classnames";
import { Attachment, Close } from "@navikt/ds-icons";
import "@navikt/ds-css/file-uploader/index.css";
import Button from "../../button/src";

export interface FileViewProps extends React.HTMLAttributes<HTMLDivElement> {
  files: File[];
  onRemove?: (index: number) => void;
  //children: React.ReactNode;
}

const FileView = forwardRef<HTMLDivElement, FileViewProps>(
  ({ files, className, onRemove, ...rest }, ref) => {
    return (
      <div ref={ref} className={cl("navds-file-view", className)} {...rest}>
        {files.map((file, index) => {
          return (
            <div className="navds-file-view-row">
              <div>
                <Attachment
                  style={{ verticalAlign: "middle" }}
                  role="img"
                  focusable={false}
                />{" "}
                {file.name}
              </div>
              {onRemove && (
                <Button variant="secondary" onClick={() => onRemove(index)}>
                  <Close
                    style={{ verticalAlign: "middle" }}
                    role="img"
                    focusable={false}
                  />{" "}
                  Fjern
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default FileView;
