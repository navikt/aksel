import docs from "@navikt/ds-tokens/docs.json";

import { Frame } from "../Framev2";

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  return <Frame tokens={colors} styles="background" />;
};
