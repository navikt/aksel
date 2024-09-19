import { twMerge } from "tailwind-merge";

export const Ikon = ({
  className,
  colorStroke = "stroke-black",
  colorFill = "fill-black",
}: {
  className?: string;
  colorStroke?: string;
  colorFill?: string;
}) => {
  return (
    <span className={twMerge(`w-5 h-5 block`, className)} aria-hidden="true">
      <svg
        className={twMerge(colorFill, colorStroke)}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        focusable="false"
        role="img"
        aria-hidden="true"
        fontSize="1.25rem"
      >
        <path d="M14.087 6.874a.752.752 0 0 0-.117 1.156l3.22 3.22H5a.75.75 0 0 0 0 1.5h12.19l-3.22 3.22a.75.75 0 0 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 0 0-.943-.096"></path>
      </svg>
    </span>
  );
};

export default Ikon;
