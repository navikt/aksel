import React, { useContext } from "react";
import { ItemContext } from "./item-context";
import { Button } from "../../../button";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";

const ItemButton = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemButton> has to be used within a <Item>")
    return null
  }

  const { file, error, isLoading, onDelete, onRetry } = context
  const variant = "tertiary-neutral"

  if (isLoading) {
    return null
  }
  if (error && onRetry) {
    return <Button
      variant={variant}
      onClick={() => onRetry?.(file)}
      icon={<ArrowsCirclepathIcon focusable={false} aria-label={`Prøv å laste opp filen ${file.name} på nytt`} />}
    />
  }
  if (onDelete) {
    return <Button
      variant={variant}
      onClick={() => onDelete?.(file)}
      icon={<TrashIcon focusable={false} aria-label={`Slett ${file.name}`} />}
    />
  }

  return null
}

export default ItemButton