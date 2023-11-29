import cl from "clsx";
import React, {
  forwardRef,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { BodyShort } from "../../../typography";
import { mergeRefs, useClientLayoutEffect } from "../../../util";
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

    const [minWidth, setMinWidth] = useState<number>();

    useClientLayoutEffect(() => {
      const height = wrapperRef?.current?.getBoundingClientRect()?.height;
      if (height) {
        setMinWidth(height * 2);
      }
    }, []);

    if (context === null) {
      console.error("<FileUpload.Zone> has to be used within a <FileUpload>.");
      return null;
    }

    return (
      <div
        {...rest}
        ref={mergedRef}
        className={cl("navds-fileupload__content__zone", className)}
        style={{ minWidth }}
      >
        <BodyShort as="span">{getDragAndLetGoText(context.locale)}</BodyShort>
        <BodyShort as="span">{getOrText(context.locale)}</BodyShort>
        <UploadButton />
      </div>
    );
  }
);

export default Dropzone;
