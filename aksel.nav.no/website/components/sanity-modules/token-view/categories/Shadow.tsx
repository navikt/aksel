import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Framev2";

export const ShadowView = ({ cat }: { cat: string }) => {
  const shadows = docs[cat];

  return (
    <Frame
      tokens={shadows}
      styles="boxShadow"
      element={({ token, name }: { token: string; name?: string }) => {
        const isLigth = name && name.includes("focus-inverted");

        return (
          <div
            className="min-h-8 grid aspect-[2/1] h-full w-full place-items-start items-center rounded-md"
            aria-hidden
            style={{
              background: isLigth
                ? `var(--a-surface-inverted)`
                : `var(--a-surface-default)`,
            }}
          >
            <div
              className="h-8 w-full rounded-md"
              style={{
                boxShadow: `${token}`,
                background: isLigth
                  ? "var(--a-surface-inverted)"
                  : "var(--a-bg-subtle)",
              }}
            />
          </div>
        );
      }}
    />
  );
};
