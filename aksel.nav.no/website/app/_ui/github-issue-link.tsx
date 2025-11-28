"use client";

import { Link } from "@navikt/ds-react";

interface Props {
  labels: string;
  template: string;
  title: string;
  includeUrlInBody?: boolean;
  children: React.ReactNode;
}

export default function GitHubIssueLink({
  labels,
  template,
  title,
  includeUrlInBody,
  children,
}: Props) {
  const url =
    "https://github.com/navikt/aksel/issues/new?" +
    `labels=${encodeURIComponent(labels)}` +
    `&template=${template}` +
    `&title=${encodeURIComponent(title)}` +
    `${
      includeUrlInBody
        ? `&body=${encodeURIComponent(`URL: ${window.location.href}`)}`
        : ""
    }`;
  return <Link href={url}>{children}</Link>;
}
