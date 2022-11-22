import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

const text = "The quick brown fox jumps over the lazy dog";

export const FontView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token, name }: { token: string; name?: string }) => {
        if (name.includes("font-family")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
            >
              {text}
            </div>
          );
        }
        if (name.includes("font-weight")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
              style={{
                fontWeight: token,
              }}
            >
              {text}
            </div>
          );
        }
        if (name.includes("font-line-height")) {
          return (
            <div className="bg-surface-default">
              <div
                className="min-h-16  flex h-full max-w-xs items-end rounded-md px-4 text-xl"
                aria-hidden
                style={{
                  lineHeight: token,
                }}
              >
                {text}
              </div>
            </div>
          );
        }
        if (name.includes("font-size")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
              style={{
                fontSize: token,
                fontWeight: name.includes("size-heading") ? "600" : "400",
                lineHeight: 1.33,
              }}
            >
              {text}
            </div>
          );
        }
        return null;
      }}
    />
  );
};
