import { useCallback, useEffect, useRef } from "react";
import { useMergeRefs } from "../../util/hooks";
import { FileUploadBaseProps } from "./FileUpload.types";
import { partitionFiles } from "./utils/partition-files";

export interface UseFileUploadProps extends FileUploadBaseProps {
  ref: React.ForwardedRef<HTMLInputElement>;
  disabled?: boolean;
}

export const useFileUpload = ({
  ref,
  accept,
  onSelect,
  validator,
  maxSizeInBytes,
  fileLimit,
  disabled,
}: UseFileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = useMergeRefs(inputRef, ref);

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
      if (fileInput === null || !event.clipboardData) {
        return;
      }
      event.preventDefault();

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
    onChange: disabled ? undefined : onChange,
    inputRef,
    mergedRef,
  };
};
