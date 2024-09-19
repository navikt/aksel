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
    <span className={twMerge(`w-4 h-4 block`, className)} aria-hidden="true">
      <svg className={twMerge(colorFill, colorStroke)} viewBox="0 0 24 24">
        <path d="M6.5 11.25c-.69 0-1.25-.56-1.25-1.25V4a.75.75 0 0 0-1.5 0v6a2.75 2.75 0 0 0 2.75 2.75h10.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 0 0-1.06 1.06l3.22 3.22z"></path>
      </svg>
    </span>
  );
};

export default Ikon;
