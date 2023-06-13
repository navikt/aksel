import React from "react";
import cl from "clsx";
import Fuse from "fuse.js";

function splitStr(str: string, query: string) {
  const regexStr = query.toLowerCase().split(" ").join("|");
  return str.split(new RegExp(`(${regexStr})`, "gi"));
}

export function highlightStr(str: string, query: string) {
  return (
    <span>
      {splitStr(str, query)
        .filter((x) => !!x)
        .map((part, i) => (
          <span
            key={i}
            className={cl({
              "text-text-default group-focus-visible:text-text-on-action bg-teal-100 group-focus-visible:bg-transparent":
                query
                  .split(" ")
                  .map((x) => x.toLowerCase())
                  .includes(part.toLowerCase()),
            })}
          >
            {part}
          </span>
        ))}
    </span>
  );
}

export function highlightMatches(hitMatch: Fuse.FuseResultMatch) {
  const text = hitMatch.value;
  const result = [];
  const matches = [...hitMatch.indices];

  let index = 0;
  matches.forEach((match, i) => {
    const str = text.substring(match[0], match[1] - 1);
    let preText = text.substring(index, match[0]);

    if (i === 0) {
      const preLength = preText.length;
      preText = preText.substring(preText.length - 23);
      if (preText.length < preLength) {
        preText = `...${preText}`;
      }
    }

    result.push({ text: preText, highlight: false });
    result.push({ text: str, highlight: true });
    index = match[1] - 1;
    if (i === matches.length - 1) {
      result.push({ text: text.substring(index), highlight: false });
    }
  });

  return (
    <span>
      {result.map((part, i) => (
        <span
          key={i}
          className={cl({
            "text-text-default font-semibold": part.highlight,
          })}
        >
          {part.text}
        </span>
      ))}
    </span>
  );
}
