import React from "react";
import AkselLink from "@/web/AkselLink";
import InlineCode from "./InlineCode";

/**
 * Takes a string and replaces markdown links with Link components
 * and backticks with InlineCode components.
 */
const TextWithMarkdown = ({ children: input }: { children: string }) => {
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`/g; // The part before the pipe finds links, the part after finds backticks.
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

export { TextWithMarkdown };
