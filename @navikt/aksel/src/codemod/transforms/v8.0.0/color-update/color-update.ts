import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

const migrationConfig = {
  name: "Tag",
  prop: "variant",
  changes: [
    {
      oldVariant: "warning",
      replacement: "outline",
      color: "warning",
    },
    {
      oldVariant: "warning-moderate",
      replacement: "moderate",
      color: "warning",
    },
    {
      oldVariant: "warning-filled",
      replacement: "strong",
      color: "warning",
    },
    {
      oldVariant: "error",
      replacement: "outline",
      color: "danger",
    },
    {
      oldVariant: "error-moderate",
      replacement: "moderate",
      color: "danger",
    },
    {
      oldVariant: "error-filled",
      replacement: "strong",
      color: "danger",
    },
    {
      oldVariant: "info",
      replacement: "outline",
      color: "info",
    },
    {
      oldVariant: "info-moderate",
      replacement: "moderate",
      color: "info",
    },
    {
      oldVariant: "info-filled",
      replacement: "strong",
      color: "info",
    },
    {
      oldVariant: "success",
      replacement: "outline",
      color: "success",
    },
    {
      oldVariant: "success-moderate",
      replacement: "moderate",
      color: "success",
    },
    {
      oldVariant: "success-filled",
      replacement: "strong",
      color: "success",
    },
    {
      oldVariant: "neutral",
      replacement: "outline",
      color: "neutral",
    },
    {
      oldVariant: "neutral-moderate",
      replacement: "moderate",
      color: "neutral",
    },
    {
      oldVariant: "neutral-filled",
      replacement: "strong",
      color: "neutral",
    },
    {
      oldVariant: "alt1",
      replacement: "outline",
      color: "meta-purple",
    },
    {
      oldVariant: "alt1-moderate",
      replacement: "moderate",
      color: "meta-purple",
    },
    {
      oldVariant: "alt1-filled",
      replacement: "strong",
      color: "meta-purple",
    },
    {
      oldVariant: "alt2",
      replacement: "outline",
      color: "meta-lime",
    },
    {
      oldVariant: "alt2-moderate",
      replacement: "moderate",
      color: "meta-lime",
    },
    {
      oldVariant: "alt2-filled",
      replacement: "strong",
      color: "meta-lime",
    },
    {
      oldVariant: "alt3",
      replacement: "outline",
      color: "info",
    },
    {
      oldVariant: "alt3-moderate",
      replacement: "moderate",
      color: "info",
    },
    {
      oldVariant: "alt3-filled",
      replacement: "strong",
      color: "info",
    },
  ],
};

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  return root.toSource(toSourceOptions);
}
