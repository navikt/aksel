import { SendFilled } from "@navikt/ds-icons";
import React, { useState } from "react";
import Button from "../../button/src";
import FileView from "../src/FileView";
import FileUploader from "../src/index";

export default {
  title: "@navikt/file-uploader",
  component: { FileUploader, FileView },
};

export const All = () => {
  const [files, setFiles] = useState<File[]>([
    new File([], "image.jpg"),
    new File([], "document.pdf"),
  ]);

  return (
    <>
      <h1>Fileuploader</h1>
      <div>
        <label htmlFor="file">Last opp fil</label>
        <FileUploader
          id="file"
          onChange={(event) => {
            const newFiles = event.target.files;
            setFiles((files) => [...files, ...newFiles]);
          }}
        />
        <FileView
          files={files}
          onRemove={(index) =>
            setFiles((files) => files.filter((file, i) => i !== index))
          }
        />
        <Button variant="action">
          <SendFilled
            style={{ verticalAlign: "middle" }}
            role="img"
            focusable={false}
          />{" "}
          Bekreft og send
        </Button>
      </div>
      <div>
        <label htmlFor="file">Last opp fil (kun .jpg)</label>
        <FileUploader
          id="file"
          accept="image/jpg"
          onChange={(event) => {
            const newFiles = event.target.files;
            setFiles((files) => [...files, ...newFiles]);
          }}
        />
        <FileView files={files} />
        <Button variant="action">
          <SendFilled
            style={{ verticalAlign: "middle" }}
            role="img"
            focusable={false}
          />{" "}
          Bekreft og send
        </Button>
      </div>
    </>
  );
};
