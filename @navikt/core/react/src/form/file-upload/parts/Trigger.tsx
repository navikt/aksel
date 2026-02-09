import React, { forwardRef } from "react";
import { Slot } from "../../../utils/components/slot/Slot";
import { FileUploadBaseProps } from "../FileUpload.types";
import { useFileUpload } from "../useFileUpload";

export interface FileUploadTriggerProps extends Omit<
  FileUploadBaseProps,
  "fileLimit"
> {
  children: React.ReactNode;
}

const Trigger = forwardRef<HTMLInputElement, FileUploadTriggerProps>(
  (
    {
      children,
      multiple = true,
      accept,
      onSelect,
      validator,
      maxSizeInBytes,
    }: FileUploadTriggerProps,
    ref,
  ) => {
    const { onChange, inputRef, mergedRef } = useFileUpload({
      ref,
      onSelect,
      validator,
      accept,
      maxSizeInBytes,
      disabled: false,
    });

    return (
      <>
        <Slot onClick={() => inputRef.current?.click()}>{children}</Slot>
        <input
          ref={mergedRef}
          type="file"
          style={{ display: "none" }}
          multiple={multiple}
          accept={accept}
          onChange={onChange}
        />
      </>
    );
  },
);

export default Trigger;
