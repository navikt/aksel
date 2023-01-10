import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

export const ZindexView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token }: { token: string; name?: string }) => {
        return (
          <div
            className="min-h-16 flex h-full w-full items-end rounded-md px-4 text-5xl font-semibold"
            aria-hidden
            style={{
              background: `var(--a-surface-default)`,
            }}
          >
            {token}
          </div>
        );
      }}
    />
  );
};
