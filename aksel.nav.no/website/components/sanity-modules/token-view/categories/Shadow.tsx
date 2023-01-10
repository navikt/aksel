import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

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
            className="min-h-16 flex h-full w-full items-center justify-center rounded-md px-4 text-5xl font-semibold"
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
