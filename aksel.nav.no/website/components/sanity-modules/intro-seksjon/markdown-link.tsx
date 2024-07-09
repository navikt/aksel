import React from "react";
import { Link } from "@navikt/ds-react";

/**
 * Splits a string into text and links,
 * and returns an array of React elements.
 */
function markdownLink(x: string) {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  x.replace(regex, (match, text, url, index) => {
    if (index > lastIndex) {
      elements.push(x.slice(lastIndex, index));
    }
    elements.push(
      <Link href={url} key={index}>
        {text}
      </Link>,
    );

    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < x.length) {
    elements.push(x.slice(lastIndex));
  }

  return elements;
}

export { markdownLink };
