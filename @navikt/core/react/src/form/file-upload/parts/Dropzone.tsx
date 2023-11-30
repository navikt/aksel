import cl from "clsx";
import React, {
  forwardRef,
  useContext,
  useMemo,
  useRef,
} from "react";
import { BodyShort } from "../../../typography";
import { mergeRefs } from "../../../util";
import { FileUploadContext } from "../context";
import { getDragAndLetGoText, getOrText } from "../utils/i18n";
import UploadButton from "./UploadButton";

export interface FileUploadDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {}

const Dropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  ({ className, ...rest }: FileUploadDropzoneProps, ref) => {
    const context = useContext(FileUploadContext);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    if (context === null) {
      console.error("<FileUpload.Zone> has to be used within a <FileUpload>.");
      return null;
    }

    return (
      <div
        {...rest}
        ref={mergedRef}
        className={cl("navds-fileupload__content__zone", className)}
      >
        <BodyShort as="span">{getDragAndLetGoText(context.locale)}</BodyShort>
        <BodyShort as="span">{getOrText(context.locale)}</BodyShort>
        <UploadButton />
      </div>
    );
  }
);

export default Dropzone;
