import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

export const ShapesView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token }: { token: string; name?: string }) => {
        return (
          <div
            className="min-h-16 flex h-full w-full items-center justify-center gap-4 rounded-md px-4 text-5xl font-semibold"
            aria-hidden
            style={{
              background: `var(--a-surface-default)`,
            }}
          >
            <div
              className="bg-surface-alt-3-strong h-8 w-8 rounded-md"
              style={{
                borderRadius: `${token}`,
              }}
            />
            <div
              className="bg-surface-alt-3-strong h-8 w-20 rounded-md"
              style={{
                borderRadius: `${token}`,
              }}
            />
          </div>
        );
      }}
    />
  );
};
