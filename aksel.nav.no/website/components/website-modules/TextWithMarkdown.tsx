import React from "react";
import AkselLink from "@/web/AkselLink";
import InlineCode from "./InlineCode";

/**
 * Takes a string and replaces markdown links with Link components
 * and backticks with InlineCode components.
 * Now also supports **bold** (strong) text.
 */
const TextWithMarkdown = ({ children: input }: { children: string }) => {
  // Updated regex: group 1/2 = link, group 3 = code, group 4 = bold
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  input.replace(regex, (match, text, url, code, bold, index) => {
    if (index > lastIndex) {
      elements.push(input.slice(lastIndex, index));
    }

    if (code) {
      elements.push(<InlineCode key={index}>{code}</InlineCode>);
    } else if (bold) {
      elements.push(<strong key={index}>{bold}</strong>);
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
