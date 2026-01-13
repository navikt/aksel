import React, { MouseEvent } from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import Spacer from "../../../../layout/stack/Spacer";
import { Loader } from "../../../../loader";
import { useRenameCSS } from "../../../../theme/Theme";
import { TFunction } from "../../../../util/i18n/i18n.types";
import { FileUploadItemProps } from "./Item";

interface ItemActionFieldProps {
  isLoading: boolean;
  button?:
    | {
        action: "delete" | "retry";
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
        id?: string;
      }
    | React.ReactNode;
  translate: TFunction<"FileUpload">;
}

function ItemActionField({
  isLoading,
  button,
  translate,
}: ItemActionFieldProps) {
  const { cn } = useRenameCSS();

  if (isLoading) {
    return (
      <>
        <Spacer />
        <div className={cn("navds-file-item__icon--loading")}>
          <Loader size="medium" />
        </div>
      </>
    );
  }

  if (!button) {
    return null;
  }

  if (isCustomButton(button)) {
    return (
      <>
        <Spacer />
        {button}
      </>
    );
  }

  const Icon = button.action === "delete" ? TrashIcon : ArrowsCirclepathIcon;

  return (
    <>
      <Spacer />
      <Button
        id={button.id}
        className={cn("navds-file-item__button")}
        type="button"
        variant="tertiary-neutral"
        onClick={button.onClick}
        icon={
          <Icon
            title={translate(
              button.action === "retry"
                ? "item.retryButtonTitle"
                : "item.deleteButtonTitle",
            )}
          />
        }
      />
    </>
  );
}

function isCustomButton(
  button: FileUploadItemProps["button"],
): button is React.ReactNode {
  return React.isValidElement(button);
}

export { ItemActionField };
