import { useRef } from "react";
import { useMergeRefs } from "../../utils/hooks";
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

  const upload = (fileList: FileList) => {
    const { files, partitionedFiles } = validateFiles(
      Array.from(fileList),
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
      upload(fileList);
    }

    // Resets the value to make it is possible to upload the same file several consecutive times
    event.target.value = "";
  };

  return {
    upload,
    onChange,
    inputRef,
    mergedRef,
  };
};
