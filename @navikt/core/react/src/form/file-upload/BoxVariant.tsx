import React, { ChangeEvent, useRef, useState } from "react";
import { useClientLayoutEffect } from "../../util";
import { BodyShort } from "../../typography";
import Wrapper from "./Wrapper";
import UploadButton from "./UploadButton";

interface Props {
  label: string;
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

const BoxVariant = ({
  label,
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
  const labelRef = useRef<HTMLLabelElement | null>(null)
  const [widthOverride, setWidthOverride] = useState<number>()
  const [heightOverride, setHeightOverride] = useState<number>()

  useClientLayoutEffect(() => {
    if (isDraggingOver) {
      const requestID = window.requestAnimationFrame(() => {
        const boundingClientRect = labelRef?.current?.getBoundingClientRect()
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
    divRef={divRef}
    className={className}
    labelClassName="navds-fileupload--box"
    onDragEnter={onDragEnter}
    onDragEnd={onDragEnd}
    labelRef={labelRef}
    style={{
      width: widthOverride,
      height: heightOverride
    }}
    error={error}
    isDraggingOver={isDraggingOver}
    inputId={inputId}
    multiple={multiple}
    accept={accept}
    handleUpload={handleUpload}
  >
    {widthOverride
      ? <BodyShort as="span">Slipp</BodyShort>
      : (<>
        <BodyShort as="span">Dra og slipp</BodyShort>
        <BodyShort as="span">eller</BodyShort>
        <UploadButton label={label} />
      </>)
    }
  </Wrapper>)
}

export default BoxVariant
