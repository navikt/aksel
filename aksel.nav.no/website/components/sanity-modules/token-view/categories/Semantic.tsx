import { PersonCircleIcon } from "@navikt/aksel-icons";
import docs from "@navikt/ds-tokens/docs.json";
import color from "tinycolor2";
import { Frame } from "../Frame";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat === "semantic-text") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.9;

          return (
            <div
              className="min-h-16 flex h-full w-full items-end rounded-md px-4 text-5xl font-semibold"
              aria-hidden
              style={{
                color: token,
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              Aa
            </div>
          );
        }}
      />
    );
  }
  if (cat === "semantic-icon") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.9;

          return (
            <div
              className="min-h-16 flex h-full w-full items-center justify-center rounded-md px-4 text-4xl font-semibold"
              aria-hidden
              style={{
                color: token,
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <PersonCircleIcon aria-hidden />
            </div>
          );
        }}
      />
    );
  }

  if (cat === "semantic-border") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.7;

          return (
            <div
              className="min-h-16 flex h-full w-full items-center justify-center rounded-md px-4 text-5xl font-semibold"
              aria-hidden
              style={{
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <div
                className="h-12 w-full rounded-md"
                style={{
                  border: `2px solid ${token}`,
                }}
              />
            </div>
          );
        }}
      />
    );
  }
  return <Frame tokens={colors} styles="background" showHex />;
};
