import { Data } from "@navikt/ds-icons";

export const tmpTabell = {
  type: "object",
  name: "tabell_v2",
  title: "Tabell",
  icon: Data,
  fields: [{ type: "array", name: "rows", of: [{ type: "tableRow" }] }],
  preview: {
    select: {
      rows: "rows",
    },
    prepare(selection) {
      const { rows } = selection;
      return {
        title: "Tabell",
        subtitle: rows && `Rader: ${rows.length}`,
      };
    },
  },
};

export const tmpTabellRow = {
  type: "object",
  name: "tableRow",
  title: "ROW2",
  fields: [{ type: "array", name: "cells", of: [{ type: "string" }] }],
  preview: {
    select: {
      cells: "cells",
    },
    prepare(selection) {
      const { cells } = selection;
      return {
        title: cells ? cells.join(" | ") : "cell",
        media: Data,
      };
    },
  },
};
