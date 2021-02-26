import React, { forwardRef } from "react";
import cl from "classnames";
import { Attachment, Close } from "@navikt/ds-icons";
import "@navikt/ds-css/file-uploader/index.css";
import Button from "../../button/src";
import { Text } from "../../typography/src";

export interface FileViewProps extends React.HTMLAttributes<HTMLDivElement> {
  files: File[];
  //children: React.ReactNode;
}

const FileView = forwardRef<HTMLDivElement, FileViewProps>(
  ({ files, className, id, ...rest }, ref) => {
    return (
      <div ref={ref} className={cl("navds-file-view", className)} {...rest}>
        {files.map((file) => {
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
              <Button variant="secondary">
                <Close
                  style={{ verticalAlign: "middle" }}
                  role="img"
                  focusable={false}
                />{" "}
                Fjern
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
);

export default FileView;
