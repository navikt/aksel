import React, { useContext, useRef, useState } from "react";
import { BodyShort } from "../../../typography";
import { useClientLayoutEffect } from "../../../util";
import { FileUploadContext } from "../context";
import { getDragAndLetGoText, getOrText } from "../utils/i18n";
import UploadButton from "./UploadButton";

const ZoneVariant = () => {
  const context = useContext(FileUploadContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [minWidth, setMinWidth] = useState<number>();

  useClientLayoutEffect(() => {
    const height = ref?.current?.getBoundingClientRect()?.height;
    if (height) {
      setMinWidth(height * 2);
    }
  }, []);

  if (context === null) {
    console.error("<FileUpload.Zone> has to be used within a <FileUpload>.");
    return null;
  }

  return (
    <div
      className="navds-fileupload__content__zone"
      ref={ref}
      style={{ minWidth }}
    >
      <BodyShort as="span">{getDragAndLetGoText(context.locale)}</BodyShort>
      <BodyShort as="span">{getOrText(context.locale)}</BodyShort>
      <UploadButton />
    </div>
  );
};

export default ZoneVariant;
