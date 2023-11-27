import { UploadIcon } from "@navikt/aksel-icons";
import React, { useContext } from "react";
import { FileUploadContext } from "./FileUploadContext";
import { getButtonText } from "./utils/i18n";

const UploadButton = () => {
  const context = useContext(FileUploadContext);

  if (context === null) {
    console.error(
      "You are using <FileUpload.Button> or <FileUpload.Zone> outside of a <FileUpload>"
    );
    return null;
  }

  return (
    <span className="navds-button navds-button--secondary navds-fileupload__content__button">
    <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} className="navds-fileupload__content__icon" />
      {getButtonText(context.locale)}
  </span>
  )
}

export default UploadButton
