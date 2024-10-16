import * as TokensBuild from "@navikt/ds-tokens/dist/darkside/tokens";

const nonColorTokens = [
  "spacing",
  "z-index",
  "shadow",
  "font-weight",
  "font-size",
  "font-line-height",
  "font-family",
  "border-radius",
];

const config = {
  theme: {
    colors: getColors(),
    extend: {
      spacing: Reducer(["spacing"]),
    },
    /* screens: getBreakpoints(tokens), */
    /* extend: {
      spacing: Reducer(tokens, ["spacing"]),
      zIndex: Reducer(tokens, ["z-index"]),
      boxShadow: Reducer(tokens, ["shadow"]),
      fontWeight: Reducer(tokens, ["font-weight"]),
      fontSize: Reducer(tokens, ["font-size"]),
      lineHeight: Reducer(tokens, ["font-line-height"]),
      fontFamily: Reducer(tokens, ["font-family"]),
      borderRadius: Reducer(tokens, ["border-radius"]),
      maxWidth: getMaxWidth(tokens),
    }, */
  },
};

/**
 * Get all color tokens from the tokens object
 * Assumes that all remaining names not containing the nonColorTokens are colors
 */
function getColors() {
  return Object.fromEntries(
    Object.entries(TokensBuild).filter(([key]) => {
      return !nonColorTokens.find((prefix) =>
        key.toLowerCase().includes(prefix),
      );
    }, []),
  );
}

function replaceKey(s: string, keys: string[]) {
  let key = s;
  keys.forEach((k) => {
    key = key.replace(`${k}-`, "");
  });
  return key;
}

/* Cherry-picks object keys we want */
function Reducer(replace: string[]) {
  return Object.entries(TokensBuild).reduce((old, [key, value]) => {
    if (replace.find((v) => key.startsWith(v))) {
      old[replaceKey(key, replace)] = value;
    }
    return old;
  }, {});
}

console.info(JSON.stringify(config, null, 2));
