import React, { useContext } from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { ItemContext } from "./item-context";

const ItemButton = () => {
  const context = useContext(ItemContext);

  if (context == null) {
    console.error("<ItemButton> has to be used within a <Item>");
    return null;
  }

  const { file, error, isLoading, onDelete, onRetry } = context;
  const variant = "tertiary-neutral";

  if (isLoading) {
    return null;
  }
  if (error && onRetry) {
    return (
      <Button
        type="button"
        variant={variant}
        onClick={onRetry}
        icon={
          <ArrowsCirclepathIcon
            aria-label={`Prøv å laste opp filen ${file.name} på nytt`}
          />
        }
      />
    );
  }
  if (onDelete) {
    return (
      <Button
        type="button"
        variant={variant}
        onClick={onDelete}
        icon={<TrashIcon aria-label={`Slett ${file.name}`} />}
      />
    );
  }

  return null;
};

export default ItemButton;
