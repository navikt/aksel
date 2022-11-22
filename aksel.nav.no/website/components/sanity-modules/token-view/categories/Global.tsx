import docs from "@navikt/ds-tokens/docs.json";

import { Frame } from "../Frame";

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  return <Frame tokens={colors} styles="background" />;
};
