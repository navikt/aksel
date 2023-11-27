import React, { useRef, useState } from "react";
import { useClientLayoutEffect } from "../../util";
import { BodyShort } from "../../typography";
import UploadButton from "./UploadButton";

const ZoneVariant = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [minWidth, setMinWidth] = useState<number>()

  useClientLayoutEffect(() => {
    const height = ref?.current?.getBoundingClientRect()?.height
    if (height) {
      setMinWidth(height * 2)
    }
  }, []);

  return (
    <div
      className="navds-fileupload__zone"
      ref={ref}
      style={{ minWidth }}
    >
      <BodyShort as="span">Dra og slipp</BodyShort>
      <BodyShort as="span">eller</BodyShort>
      <UploadButton />
    </div>
  )
}

export default ZoneVariant
