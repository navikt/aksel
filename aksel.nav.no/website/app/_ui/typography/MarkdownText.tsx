import React from "react";
import { Code } from "./Code";
import { WebsiteLink } from "./WebsiteLink";

/**
 * Takes a string and replaces markdown links with Link components
 * and backticks with Code components.
 */
function MarkdownText({ children: input }: { children: string }) {
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`/g; // The part before the pipe finds links, the part after finds backticks.
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  input.replace(regex, (match, text, url, code, index) => {
    if (index > lastIndex) {
      elements.push(input.slice(lastIndex, index));
    }

    if (code) {
      elements.push(<Code key={index}>{code}</Code>);
    } else {
      elements.push(
        <WebsiteLink href={url} key={index}>
          {text}
        </WebsiteLink>,
      );
    }

    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < input.length) {
    elements.push(input.slice(lastIndex));
  }

  return <>{elements}</>;
}

export { MarkdownText };
