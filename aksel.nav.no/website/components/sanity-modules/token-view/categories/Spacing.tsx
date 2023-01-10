import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

export const SpacingView = ({ cat }: { cat: string }) => {
  const spacings = docs[cat];

  return (
    <Frame
      tokens={spacings}
      styles="boxShadow"
      element={({ token }: { token: string; name?: string }) => {
        return (
          <div
            className="min-h-16 flex h-full w-full items-center justify-start rounded-md px-4 text-5xl font-semibold"
            aria-hidden
            style={{
              background: `var(--a-surface-default)`,
            }}
          >
            <div
              className="bg-surface-alt-3-strong h-8 rounded-md"
              style={{
                width: token,
              }}
            />
          </div>
        );
      }}
    />
  );
};
