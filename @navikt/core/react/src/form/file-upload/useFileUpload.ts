import { useRef } from "react";
import { useMergeRefs } from "../../util/hooks";
import { FileUploadBaseProps } from "./FileUpload.types";
import { validateFiles } from "./utils/validate-files";

export interface UseFileUploadProps
  extends Omit<FileUploadBaseProps, "fileLimit"> {
  ref: React.ForwardedRef<HTMLInputElement>;
  disabled?: boolean;
}

export const useFileUpload = ({
  ref,
  accept,
  onSelect,
  validator,
  maxSizeInBytes,
  disabled,
}: UseFileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = useMergeRefs(inputRef, ref);

  const upload = (fileList: File[]) => {
    const { files, partitionedFiles } = validateFiles(
      fileList,
      accept,
      validator,
      maxSizeInBytes,
    );

    onSelect(files, partitionedFiles);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }

    if (!disabled) {
      upload(Array.from(fileList));
    }

    // Resets the value to make it is possible to upload the same file several consecutive times
    event.target.value = "";
  };

  return {
    onChange,
    inputRef,
    mergedRef,
  };
};
