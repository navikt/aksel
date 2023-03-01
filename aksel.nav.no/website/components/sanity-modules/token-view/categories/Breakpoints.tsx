import docs from "@navikt/ds-tokens/docs.json";
import { Frame } from "../Frame";

export const BreakpointsView = ({ cat }: { cat: string }) => {
  const breakpoints = docs[cat];

  return (
    <Frame
      tokens={breakpoints}
      element={({ name }: { token: string; name?: string }) => {
        const Svg = getSvg(name);
        return (
          <div
            className="min-h-16 bg-surface-default flex h-full w-full items-center justify-start rounded-md px-4 text-5xl font-semibold"
            aria-hidden
          >
            {Svg}
          </div>
        );
      }}
    />
  );
};

function getSvg(token: string) {
  switch (true) {
    case token.includes("xs"):
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.75 5.77778C7.75 5.16382 8.20527 4.75 8.66667 4.75H15.3333C15.7947 4.75 16.25 5.16382 16.25 5.77778V18.2222C16.25 18.8362 15.7947 19.25 15.3333 19.25H8.66667C8.20527 19.25 7.75 18.8362 7.75 18.2222V5.77778ZM8.66667 3.25C7.28712 3.25 6.25 4.42806 6.25 5.77778V18.2222C6.25 19.5719 7.28712 20.75 8.66667 20.75H15.3333C16.7129 20.75 17.75 19.5719 17.75 18.2222V5.77778C17.75 4.42806 16.7129 3.25 15.3333 3.25H8.66667ZM12 16.75C11.5858 16.75 11.25 17.0858 11.25 17.5C11.25 17.9142 11.5858 18.25 12 18.25H12.01C12.4242 18.25 12.76 17.9142 12.76 17.5C12.76 17.0858 12.4242 16.75 12.01 16.75H12Z"
            fill="#262626"
          />
        </svg>
      );
    case token.includes("sm"):
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 5C6.75 4.30964 7.30964 3.75 8 3.75H16C16.6904 3.75 17.25 4.30964 17.25 5V19C17.25 19.6904 16.6904 20.25 16 20.25H8C7.30964 20.25 6.75 19.6904 6.75 19V5ZM8 2.25C6.48122 2.25 5.25 3.48122 5.25 5V19C5.25 20.5188 6.48122 21.75 8 21.75H16C17.5188 21.75 18.75 20.5188 18.75 19V5C18.75 3.48122 17.5188 2.25 16 2.25H8ZM11.5 4.75C11.0858 4.75 10.75 5.08579 10.75 5.5C10.75 5.91421 11.0858 6.25 11.5 6.25H12.5C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 5.08579 12.9142 4.75 12.5 4.75H11.5Z"
            fill="#262626"
          />
        </svg>
      );

    case token.includes("md"):
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.75 6C3.75 5.30964 4.30964 4.75 5 4.75H19C19.6904 4.75 20.25 5.30964 20.25 6V18C20.25 18.6904 19.6904 19.25 19 19.25H5C4.30964 19.25 3.75 18.6904 3.75 18V6ZM5 3.25C3.48122 3.25 2.25 4.48122 2.25 6V18C2.25 19.5188 3.48122 20.75 5 20.75H19C20.5188 20.75 21.75 19.5188 21.75 18V6C21.75 4.48122 20.5188 3.25 19 3.25H5ZM10.5 5.75C10.0858 5.75 9.75 6.08579 9.75 6.5C9.75 6.91421 10.0858 7.25 10.5 7.25H13.5C13.9142 7.25 14.25 6.91421 14.25 6.5C14.25 6.08579 13.9142 5.75 13.5 5.75H10.5Z"
            fill="#262626"
          />
        </svg>
      );

    case token.includes("lg"):
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 4.25C4.5335 4.25 3.75 5.0335 3.75 6V15C3.75 15.9665 4.5335 16.75 5.5 16.75H18.5C19.4665 16.75 20.25 15.9665 20.25 15V6C20.25 5.0335 19.4665 4.25 18.5 4.25H5.5ZM5.25 6C5.25 5.86193 5.36193 5.75 5.5 5.75H18.5C18.6381 5.75 18.75 5.86193 18.75 6V15C18.75 15.1381 18.6381 15.25 18.5 15.25H5.5C5.36193 15.25 5.25 15.1381 5.25 15V6ZM3 18.25C2.58579 18.25 2.25 18.5858 2.25 19C2.25 19.4142 2.58579 19.75 3 19.75H21C21.4142 19.75 21.75 19.4142 21.75 19C21.75 18.5858 21.4142 18.25 21 18.25H3Z"
            fill="#262626"
          />
        </svg>
      );
    case token.includes("xl"):
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25 4.5C2.25 3.80964 2.80964 3.25 3.5 3.25H20.5C21.1904 3.25 21.75 3.80964 21.75 4.5V15.5C21.75 16.1904 21.1904 16.75 20.5 16.75H12.75V19.25H19C19.4142 19.25 19.75 19.5858 19.75 20C19.75 20.4142 19.4142 20.75 19 20.75H6C5.58579 20.75 5.25 20.4142 5.25 20C5.25 19.5858 5.58579 19.25 6 19.25H11.25V16.75H3.5C2.80964 16.75 2.25 16.1904 2.25 15.5V4.5ZM3.75 4.75V15.25H20.25V4.75H3.75Z"
            fill="#262626"
          />
        </svg>
      );

    default:
      return null;
  }
}
