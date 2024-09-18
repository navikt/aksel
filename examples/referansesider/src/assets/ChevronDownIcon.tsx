import { twMerge } from "tailwind-merge";

export const Ikon = ({ className }: { className?: string }) => {
  return (
    <span
      className={twMerge(`w-4 h-4 block fill-black stroke-black`, className)}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        focusable="false"
        role="img"
        aria-labelledby="title-Ra6oqmm"
        aria-hidden="true"
      >
        <title>Vis mer</title>
        <path d="M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06"></path>
      </svg>
    </span>
  );
};

export default Ikon;
