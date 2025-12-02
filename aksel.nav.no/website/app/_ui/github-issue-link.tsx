"use client";

import { Link } from "@navikt/ds-react";

interface Props {
  labels: string;
  template: "bug-report.md";
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
  const url = typeof window === "undefined" ? "" : window.location.href;

  const href =
    "https://github.com/navikt/aksel/issues/new?" +
    `labels=${encodeURIComponent(labels)}` +
    `&template=${template}` +
    `&title=${encodeURIComponent(title)}` +
    `${includeUrlInBody ? `&body=${encodeURIComponent(`URL: ${url}`)}` : ""}`;

  return <Link href={href}>{children}</Link>;
}
