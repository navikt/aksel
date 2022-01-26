import fs from "fs";
import { dirname } from "path";
import Mustache from "mustache";
import cards from "./cards.json";

function writeFile(path: string, contents: string) {
  fs.mkdir(dirname(path), { recursive: true }, function (err) {
    const cb = (err: Error | null) => {
      if (err) {
        console.error(err);
      }
    };
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

const cardTemplate = `
import React from "react";
import * as animation from "../../animation/{{cardId}}";
import { getCardText } from "../locale";

import { BaseCard } from "../base-card/BaseCard";
import { CardProps } from "../base-card/types";

const {{componentName}}Card = ({ size, href, customText, language = "no" }: CardProps) => {
  const { title, text, category } = getCardText("{{cardId}}", language);

  return (
    <BaseCard
      size={size}
      title={title}
      href={href}
      text={customText || text}
      category={category}
      hoverAnimation={animation.Hover}
      activeAnimation={animation.Active}
    />
  );
};

export default {{componentName}}Card;
`;

cards.forEach((card) =>
  writeFile(
    `${__dirname}/generated-cards/${card.componentName}Card.tsx`,
    Mustache.render(cardTemplate, {
      ...card,
    })
  )
);

writeFile(
  `${__dirname}/generated-cards/index.ts`,
  cards
    .map(
      ({ componentName }) =>
        `export { default as ${componentName}Card } from "./${componentName}Card";`
    )
    .join("\n")
);
