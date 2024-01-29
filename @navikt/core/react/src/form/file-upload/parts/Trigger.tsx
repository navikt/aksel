import React, { forwardRef } from "react";
import { Slot } from "../../../util/Slot";
import { FileUploadBaseProps } from "../FileUpload.types";
import { useFileUpload } from "../useFileUpload";

interface FileUploadTriggerProps extends FileUploadBaseProps {
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
      fileLimit,
      ...rest
    }: FileUploadTriggerProps,
    ref,
  ) => {
    const { onChange, inputRef, mergedRef } = useFileUpload({
      ref,
      onSelect,
      validator,
      accept,
      maxSizeInBytes,
      fileLimit,
      disabled: false,
    });

    return (
      <>
        <Slot
          onClick={() => {
            if (inputRef.current?.value) {
              inputRef.current.value = "";
            }
            inputRef.current?.click();
          }}
        >
          {children}
        </Slot>
        <input
          ref={mergedRef}
          {...rest}
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
