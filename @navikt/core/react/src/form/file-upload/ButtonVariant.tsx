import React, { ChangeEvent } from "react";
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

const ButtonVariant = ({
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
  handleUpload
}: Props) => (
  <Wrapper
    divRef={divRef}
    className={className}
    error={error}
    inputId={inputId}
    multiple={multiple}
    accept={accept}
    handleUpload={handleUpload}
    onDragEnter={onDragEnter}
    onDragEnd={onDragEnd}
    isDraggingOver={isDraggingOver}
  >
    <UploadButton label={label} />
  </Wrapper>
)

export default ButtonVariant
