import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Framev2";

export const ZindexView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token }: { token: string; name?: string }) => {
        return (
          <div
            className="min-h-8 ring-border-subtle grid aspect-[2/1] h-full w-full place-items-center items-center rounded-md text-2xl font-semibold ring-1 ring-inset"
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
