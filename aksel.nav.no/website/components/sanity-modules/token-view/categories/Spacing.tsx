import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Framev2";

export const SpacingView = ({ cat }: { cat: string }) => {
  const spacings = docs[cat];

  return (
    <Frame
      tokens={spacings}
      styles="boxShadow"
      element={({ token }: { token: string; name?: string }) => {
        const widest = Math.max(
          ...spacings.map((x) => Number(x.value.replace("rem", "")))
        );
        return (
          <div
            className="min-h-8 grid h-full w-full place-items-start items-center rounded-md"
            aria-hidden
            style={{
              background: `var(--a-surface-default)`,
              width: `${widest}rem`,
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
