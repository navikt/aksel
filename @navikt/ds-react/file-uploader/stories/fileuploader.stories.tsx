import { SendFilled } from "@navikt/ds-icons";
import React from "react";
import Button from "../../button/src";
import FileView from "../src/FileView";
import FileUploader from "../src/index";

export default {
  title: "@navikt/file-uploader",
  component: { FileUploader, FileView },
};

export const All = () => {
  const files: File[] = [
    new File([], "image.jpg"),
    new File([], "document.pdf"),
  ];
  return (
    <>
      <h1>Fileuploader</h1>
      <FileUploader onInputChange={() => {}} />
      <FileView files={files} />
      <Button variant="action">
        <SendFilled
          style={{ verticalAlign: "middle" }}
          role="img"
          focusable={false}
        />{" "}
        Bekreft og send
      </Button>
    </>
  );
};
