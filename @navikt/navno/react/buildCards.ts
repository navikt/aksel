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
import * as animation from "../animation/{{name}}";

import { BaseCard } from "../product-card/base-card/BaseCard";

const {{title}}Card = () => {
  return (
    <BaseCard
      size="large"
      title="{{title}}"
      href="nav.no"
      text="text"
      category="category"
      hoverAnimation={animation.Hover}
      activeAnimation={animation.Active}
    />
  );
};

export default {{title}}Card;
`;

cards.forEach((card) =>
  writeFile(
    `./src/card/${card.title}Card.tsx`,
    Mustache.render(cardTemplate, {
      ...card,
      name: card.title.toLowerCase(),
    })
  )
);

writeFile(
  `./src/card/index.ts`,
  cards
    .map(({ title }) => `export { default as ${title} } from "./${title}Card";`)
    .join("\n")
);
