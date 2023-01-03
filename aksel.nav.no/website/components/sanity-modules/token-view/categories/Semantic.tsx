import { PeopleInCircle } from "@navikt/ds-icons";
import docs from "@navikt/ds-tokens/docs.json";
import color from "color";
import { Frame } from "../Framev2";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat === "semantic-text") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.luminosity() > 0.9;

          return (
            <div
              className="min-h-8 ring-border-subtle grid aspect-[2/1] h-full w-full place-items-center items-center rounded-md text-2xl font-semibold ring-1 ring-inset"
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
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.luminosity() > 0.9;

          return (
            <div
              className="min-h-8 ring-border-subtle grid aspect-[2/1] h-full w-full place-items-center items-center rounded-md text-2xl font-semibold ring-1 ring-inset"
              aria-hidden
              style={{
                color: token,
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <PeopleInCircle aria-hidden />
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
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLight = c.luminosity() > 0.9;

          return (
            <div
              className="min-h-8 grid aspect-[2/1] h-full w-full rounded-md"
              aria-hidden
              style={{
                background: isLight
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <div
                className="h-8 w-full rounded-md"
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
  return <Frame tokens={colors} styles="background" />;
};
