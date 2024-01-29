import { useCallback, useEffect, useRef, useState } from "react";
import { partitionFiles } from "../../utils/partition-files";
import { DropzoneProps } from "./dropzone.types";

export interface UseDropzoneProps
  extends Pick<
    DropzoneProps,
    "accept" | "onSelect" | "validator" | "maxSizeInBytes" | "fileLimit"
  > {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  disabled?: boolean;
}

export const useDropzone = ({
  accept,
  onSelect,
  validator,
  inputRef,
  maxSizeInBytes,
  fileLimit,
  disabled,
}: UseDropzoneProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isDraggingRef = useRef(false);

  const upload = useCallback(
    (files: File[]) => {
      const { acceptedFiles, rejectedFiles } = partitionFiles(
        files,
        accept,
        validator,
        maxSizeInBytes,
        fileLimit,
      );

      onSelect({ allFiles: files, acceptedFiles, rejectedFiles });
    },
    [accept, fileLimit, maxSizeInBytes, onSelect, validator],
  );

  useEffect(() => {
    const fileInput = inputRef.current;

    const handlePaste = (event: ClipboardEvent) => {
      if (fileInput === null || window.document.activeElement !== fileInput) {
        return;
      }
      event.preventDefault();
      if (!event.clipboardData) {
        return;
      }

      const files = Array.from(event.clipboardData.items)
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile())
        .filter((item): item is File => item !== null);

      if (files.length > 0) {
        upload(files);
      }
    };

    fileInput?.addEventListener("paste", handlePaste);

    return () => {
      fileInput?.removeEventListener("paste", handlePaste);
    };
  }, [inputRef, upload]);

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }

    upload(Array.from(fileList));

    // Resets the value to make it is possible to upload the same file several consecutive times
    event.target.value = "";
  };

  return {
    isDraggingOver,
    onDragOver: disabled ? undefined : onDragOver,
    onDragLeave: disabled ? undefined : onDragLeave,
    onDragEnd: disabled ? undefined : onDragLeave,
    onDrop: disabled ? undefined : onDragLeave,
    onChange: disabled ? undefined : onChange,
  };
};
