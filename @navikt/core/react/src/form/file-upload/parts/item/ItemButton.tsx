import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { useRenameCSS } from "../../../../theme/Theme";

interface Props {
  action: "delete" | "retry";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  title: string;
}

const ItemButton = ({ action, onClick, id, title }: Props) => {
  const { cn } = useRenameCSS();
  const Icon = action === "delete" ? TrashIcon : ArrowsCirclepathIcon;

  return (
    <Button
      id={id}
      className={cn("navds-file-item__button")}
      type="button"
      variant="tertiary-neutral"
      onClick={onClick}
      icon={<Icon title={title} />}
    />
  );
};

export default ItemButton;
