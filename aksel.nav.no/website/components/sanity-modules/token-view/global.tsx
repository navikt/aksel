import docs from "@navikt/ds-tokens/docs.json";

import { Frame } from "./Frame";

const GlobalView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  return <Frame tokens={colors} styles="background" />;
};

export default GlobalView;
