import { UploadIcon } from "@navikt/aksel-icons";
import React from "react";

interface Props {
  label: string
}

const UploadButton = ({ label }: Props) => (
  <span className="navds-button navds-button--secondary navds-fileupload__button">
    <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} className="navds-fileupload__icon" />
    {label}
  </span>
)

export default UploadButton
