import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";

interface Props {
  action: "delete" | "retry";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  title: string;
}

const ItemButton = ({ action, onClick, id, title }: Props) => {
  const Icon = action === "delete" ? TrashIcon : ArrowsCirclepathIcon;

  return (
    <Button
      id={id}
      className="aksel-file-item__button"
      type="button"
      variant="tertiary-neutral"
      onClick={onClick}
      icon={<Icon title={title} />}
    />
  );
};

export default ItemButton;
