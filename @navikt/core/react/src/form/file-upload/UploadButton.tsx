import { UploadIcon } from "@navikt/aksel-icons";
import React from "react";

const UploadButton = () => (
  <span className="navds-button navds-button--secondary navds-fileupload__button">
    <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} className="navds-fileupload__icon" />
    Velg dine filer
  </span>
)

export default UploadButton
