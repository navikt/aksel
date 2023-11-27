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
  const [widthOverride, setWidthOverride] = useState<number>()
  const [heightOverride, setHeightOverride] = useState<number>()
  const [minWidth, setMinWidth] = useState<number>()

  useClientLayoutEffect(() => {
    const height = dropzoneRef?.current?.getBoundingClientRect()?.height
    if (height) {
      setMinWidth(height * 2)
    }
  }, []);

  useClientLayoutEffect(() => {
    if (isDraggingOver) {
      const requestID = window.requestAnimationFrame(() => {
        const boundingClientRect = dropzoneRef?.current?.getBoundingClientRect()
        setWidthOverride(boundingClientRect?.width)
        setHeightOverride(boundingClientRect?.height)
      });
      return () => {
        setWidthOverride(undefined);
        setHeightOverride(undefined);
        cancelAnimationFrame(requestID);
      };
    } else {
      setWidthOverride(undefined);
      setHeightOverride(undefined);
    }
  }, [isDraggingOver]);

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
      minWidth,
      width: widthOverride,
      height: heightOverride
    }}
    error={error}
    isDraggingOver={isDraggingOver}
    inputId={inputId}
    multiple={multiple}
    accept={accept}
    handleUpload={handleUpload}
    fullWidth={true}
  >
    {isDraggingOver
      ? <BodyShort as="span">Slipp</BodyShort>
      : (<>
        <BodyShort as="span">Dra og slipp</BodyShort>
        <BodyShort as="span">eller</BodyShort>
        <UploadButton />
      </>)
    }
  </Wrapper>)
}

export default ZoneVariant
