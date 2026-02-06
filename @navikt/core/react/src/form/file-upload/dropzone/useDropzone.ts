import { useState } from "react";
import { UseFileUploadProps } from "../hooks/useFileUpload";

interface Props {
  upload: (fileList: FileList) => void;
  disabled: UseFileUploadProps["disabled"];
}

export const useDropzone = ({ upload, disabled }: Props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const onDragEnter = () => {
    setIsDraggingOver(true);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevents the browser from opening the file in a new tab
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevents the browser from opening the file in a new tab
    setIsDraggingOver(false);

    const fileList = event.dataTransfer.files;
    if (!fileList) {
      return;
    }

    upload(fileList);
  };

  return {
    isDraggingOver,
    onDragEnter: disabled ? undefined : onDragEnter,
    onDragOver: disabled ? undefined : onDragOver,
    onDragLeave: disabled ? undefined : onDragLeave,
    onDrop: disabled ? undefined : onDrop,
  };
};
