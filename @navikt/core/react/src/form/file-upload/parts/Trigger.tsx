import React, { forwardRef, useRef } from "react";
import { Slot } from "../../../util/Slot";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { FileUploadBaseProps } from "../FileUpload.types";
import { useDropzone } from "./dropzone/useDropzone";

interface FileUploadTriggerProps
  extends FileUploadBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
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
      ...rest
    }: FileUploadTriggerProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const mergedRef = useMergeRefs(ref, inputRef);

    const dropzoneCtx = useDropzone({ inputRef, onSelect, validator, accept });

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
          onChange={composeEventHandlers(rest.onChange, dropzoneCtx.onChange)}
        />
      </>
    );
  },
);

export default Trigger;
