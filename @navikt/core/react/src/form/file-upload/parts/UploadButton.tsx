import React, { useContext } from "react";
import { UploadIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { FileUploadContext } from "../context";
import { getButtonText } from "../utils/i18n";

const UploadButton = () => {
  const context = useContext(FileUploadContext);

  if (context === null) {
    console.error(
      "You are using <FileUpload.Button> or <FileUpload.Zone> outside of a <FileUpload>"
    );
    return null;
  }

  return (
    <Button
      variant="secondary"
      className="navds-fileupload__content__button"
      onClick={context.onButtonClick}
      tabIndex={-1}
      icon={
        <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} />
      }
    >
      {getButtonText(context.locale)}
    </Button>
  );
};

export default UploadButton;
