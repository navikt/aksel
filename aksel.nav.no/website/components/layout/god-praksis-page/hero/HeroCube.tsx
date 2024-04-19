import cl from "clsx";

type CubeProps = {
  variant?: "light" | "dark";
};

function Cube({ variant = "light" }: CubeProps) {
  return (
    <div
      className={cl(
        "pointer-events-none absolute inset-0 z-10 overflow-clip rounded-large",
        {
          "text-teal-300": variant === "light",
          "text-teal-400": variant === "dark",
        },
      )}
    >
      <svg
        className="absolute right-0 -z-10"
        width="390"
        height="560"
        viewBox="0 0 390 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g>
          <path
            d="M414.265 -22.7451L296.355 95.1649L414.089 95.1649L531.999 -22.7451L414.265 -22.7451Z"
            stroke="#5EEAD4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M343.496 119.165L225.645 237.016L343.496 354.867L461.347 237.016L343.496 119.165Z"
            stroke="#5EEAD4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M390.754 378.867L272.844 496.777L390.577 496.777L508.487 378.867L390.754 378.867Z"
            stroke="#5EEAD4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M202.133 638.686L84.2234 520.777L201.956 520.777L319.867 638.686L202.133 638.686Z"
            stroke="#5EEAD4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default Cube;
