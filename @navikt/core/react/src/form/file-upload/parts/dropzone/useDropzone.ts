import { useRef, useState } from "react";
import { UseFileUploadProps } from "../../useFileUpload";

export const useDropzone = ({
  disabled,
}: Pick<UseFileUploadProps, "disabled">) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isDraggingRef = useRef(false);

  // onDragOver triggers 60+ times per second, so we need to cut it off, and
  const onDragOver = () => {
    if (isDraggingRef.current) {
      return;
    }
    isDraggingRef.current = true;
    setIsDraggingOver(true);
  };

  // onDragOver triggers 60+ times per second, so we need to cut it off, and
  const onDragLeave = () => {
    if (!isDraggingRef.current) {
      return;
    }
    isDraggingRef.current = false;
    setIsDraggingOver(false);
  };

  return {
    isDraggingOver,
    onDragOver: disabled ? undefined : onDragOver,
    onDragLeave: disabled ? undefined : onDragLeave,
    onDragEnd: disabled ? undefined : onDragLeave,
    onDrop: disabled ? undefined : onDragLeave,
  };
};
