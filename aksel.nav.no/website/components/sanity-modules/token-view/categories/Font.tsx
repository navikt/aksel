import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Framev2";

const text = "Hello world";

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
              className="min-h-8 bg-surface-default grid h-full w-full place-items-center items-center text-xl"
              aria-hidden
            >
              {text}
            </div>
          );
        }
        if (name.includes("font-weight")) {
          return (
            <div
              className="min-h-8 bg-surface-default grid h-full w-full place-items-center items-center text-xl"
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
                className="min-h-8 bg-surface-default grid h-full w-full place-items-center items-center text-xl"
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
              className="min-h-8 bg-surface-default block h-full w-24 overflow-hidden text-ellipsis whitespace-nowrap text-xl"
              aria-hidden
              style={{
                fontSize: token,
                fontWeight: name.includes("size-heading") ? "600" : "400",
                lineHeight: 1.33,
              }}
            >
              Tittel
            </div>
          );
        }
        return null;
      }}
    />
  );
};
