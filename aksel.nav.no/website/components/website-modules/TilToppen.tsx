import { Heading } from "@navikt/ds-react";

export const ScrollTop = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
        document.getElementById("hovedinnhold")?.focus?.();
      }}
      className="text-xlarge text-text-on-inverted focus-visible:shadow-focus-inverted group -mt-[10px] flex h-[48px] w-fit items-center justify-center gap-2 rounded p-2 font-semibold hover:underline focus:outline-none"
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[19px] w-[19px] translate-y-1 rotate-90 transition-all group-hover:translate-y-0"
        aria-hidden
      >
        <path
          d="M8 17.5L2.12132 11.6213C0.949744 10.4497 0.949746 8.55025 2.12132 7.37868L8 1.5"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M16 9.72266L8 9.72266"
          stroke="white"
          strokeWidth="1.5"
          className="hidden group-hover:block"
        />
      </svg>
      <Heading as="span" size="small">
        Til toppen
      </Heading>
    </button>
  );
};

export default ScrollTop;
