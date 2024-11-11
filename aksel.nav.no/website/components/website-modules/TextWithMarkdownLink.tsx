import React from "react";
import AkselLink from "@/web/AkselLink";
import InlineCode from "./InlineCode";

/**
 * Splits a string into text and links,
 * and returns an array of React elements.
 */
const TextWithMarkdownLink = ({ children: input }: { children: string }) => {
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  input.replace(regex, (match, text, url, code, index) => {
    if (index > lastIndex) {
      elements.push(input.slice(lastIndex, index));
    }

    if (code) {
      elements.push(<InlineCode key={index}>{code}</InlineCode>);
    } else {
      elements.push(
        <AkselLink href={url} key={index}>
          {text}
        </AkselLink>,
      );
    }

    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < input.length) {
    elements.push(input.slice(lastIndex));
  }

  return <>{elements}</>;
};

export { TextWithMarkdownLink };
