import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { FileItem } from "./types";

interface Props {
  file: FileItem;
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  error?: string;
}

const ItemButton = ({ file, onRetry, onDelete, isLoading, error }: Props) => {
  if (isLoading) {
    return null;
  }
  if (error && onRetry) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onRetry}
        icon={
          <ArrowsCirclepathIcon
            title={`Prøv å laste opp filen ${file.name} på nytt`}
          />
        }
      />
    );
  }
  if (onDelete) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onDelete}
        icon={<TrashIcon title={`Slett ${file.name}`} />}
      />
    );
  }

  return null;
};

export default ItemButton;
