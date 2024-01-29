import { useCallback, useRef } from "react";
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
