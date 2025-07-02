import React from "react";
import { Code } from "./Code";
import { WebsiteLink } from "./WebsiteLink";

/**
 * Takes a string and replaces markdown links with Link components
 * and backticks with InlineCode components.
 * Now also supports **bold** (strong) text.
 */
function MarkdownText({ children: input }: { children: string }) {
  // Updated regex: group 1/2 = link, group 3 = code, group 4 = bold
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  input.replace(regex, (match, text, url, code, bold, index) => {
    if (index > lastIndex) {
      elements.push(input.slice(lastIndex, index));
    }

    if (code) {
      elements.push(<Code key={index}>{code}</Code>);
    } else if (bold) {
      elements.push(<strong key={index}>{bold}</strong>);
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
