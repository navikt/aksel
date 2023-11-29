import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { UploadIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { FileUploadContext } from "../context";
import { getButtonText } from "../utils/i18n";

export interface FileUploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const UploadButton = forwardRef<HTMLButtonElement, FileUploadButtonProps>(
  ({ className, children, ...rest }: FileUploadButtonProps, ref) => {
    const context = useContext(FileUploadContext);

    if (context === null) {
      console.error(
        "You are using <FileUpload.Button> or <FileUpload.Zone> outside of a <FileUpload>"
      );
      return null;
    }

    return (
      <Button
        {...rest}
        ref={ref}
        className={cl("navds-fileupload__content__button", className)}
        variant="secondary"
        onClick={context.onButtonClick}
        tabIndex={-1}
        icon={
          <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} />
        }
      >
        {children ?? getButtonText(context.locale)}
      </Button>
    );
  }
);

export default UploadButton;
