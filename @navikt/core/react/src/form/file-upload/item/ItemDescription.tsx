import React from "react";
import { ErrorMessage } from "../../../typography";
import { FileItem } from "./types";
import { formatFileSize } from "./utils/format-file-size";

interface Props {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  isLoading?: boolean;
  error?: string;
}

const ItemDescription = ({ file, locale, isLoading, error }: Props) => {
  if (isLoading) {
    switch (locale) {
      case "nb":
        return "Laster opp…";
      case "nn":
        return "Lastar opp…";
      case "en":
        return "Uploading…";
      default:
        return "Laster opp…";
    }
  }

  if (error) {
    return (
      <div
        className="navds-file-item__error"
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }

  return <span>{formatFileSize(file)}</span>;
};

export default ItemDescription;
