import React, { ChangeEvent, useRef, useState } from "react";
import { useClientLayoutEffect } from "../../util";
import { BodyShort } from "../../typography";
import Wrapper from "./Wrapper";
import UploadButton from "./UploadButton";

interface Props {
  label: string;
  description: string | undefined;
  className: string | undefined;
  divRef: React.Ref<HTMLDivElement>;
  error: string | undefined;
  inputId: string;
  multiple: boolean;
  accept: string | undefined;
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  isDraggingOver: boolean;
}

const ZoneVariant = ({
  label,
  description,
  className,
  onDragEnter,
  onDragEnd,
  divRef,
  error,
  isDraggingOver,
  inputId,
  multiple,
  accept,
  handleUpload,
}: Props) => {
  const dropzoneRef = useRef<HTMLDivElement | null>(null)
  const [minWidth, setMinWidth] = useState<number>()

  useClientLayoutEffect(() => {
    const height = dropzoneRef?.current?.getBoundingClientRect()?.height
    if (height) {
      setMinWidth(height * 2)
    }
  }, []);


  return (<Wrapper
    label={label}
    description={description}
    divRef={divRef}
    className={className}
    dropzoneClassName="navds-fileupload--zone"
    onDragEnter={onDragEnter}
    onDragEnd={onDragEnd}
    dropzoneRef={dropzoneRef}
    style={{
      minWidth
    }}
    error={error}
    isDraggingOver={isDraggingOver}
    inputId={inputId}
    multiple={multiple}
    accept={accept}
    handleUpload={handleUpload}
    fullWidth={true}
  >
      <BodyShort as="span">Dra og slipp</BodyShort>
      <BodyShort as="span">eller</BodyShort>
      <UploadButton />
  </Wrapper>)
}

export default ZoneVariant
