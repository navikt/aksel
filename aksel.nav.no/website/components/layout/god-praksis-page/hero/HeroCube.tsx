import cl from "clsx";

type CubeProps = {
  variant?: "light" | "dark" | "muted";
};

function Cube({ variant = "light" }: CubeProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-clip">
      <svg
        width="720"
        height="409"
        viewBox="0 0 720 409"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flip pointer-events-none absolute right-0 top-0 -z-10"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1329.81 -664C1330.61 -664 1331.37 -663.684 1331.93 -663.122L2078.12 85.3978C2079.29 86.5681 2079.29 88.4656 2078.12 89.6359L1331.93 838.156C1331.37 838.718 1330.61 839.034 1329.82 839.034C1329.02 839.034 1328.26 838.718 1327.7 838.156L581.505 89.6359C580.945 89.0739 580.63 88.3116 580.63 87.5168C580.63 86.722 580.945 85.9598 581.505 85.3978L1327.7 -663.122C1328.26 -663.684 1329.02 -664 1329.81 -664ZM1329.81 -656.765L587.842 87.5168L1329.82 831.799L2071.79 87.5168L1329.81 -656.765ZM130.185 -208.034C130.977 -208.034 131.737 -207.718 132.297 -207.156L878.495 541.364C879.662 542.534 879.662 544.432 878.495 545.602L132.298 1294.12C131.737 1294.68 130.977 1295 130.185 1295C129.393 1295 128.633 1294.68 128.073 1294.12L-618.125 545.602C-619.292 544.432 -619.292 542.534 -618.125 541.364L128.073 -207.156C128.633 -207.718 129.393 -208.034 130.185 -208.034ZM-611.788 543.483L130.185 1287.77L872.158 543.483L130.185 -200.799L-611.788 543.483Z"
          strokeWidth="2"
          className={cl({
            "fill-teal-300": variant === "light",
            "fill-teal-700": variant === "dark",
            "fill-teal-300/30": variant === "muted",
          })}
        />
      </svg>
      <svg
        width="720"
        height="409"
        viewBox="0 0 720 409"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flip pointer-events-none absolute -left-96 -top-80 -z-10 rotate-90"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 1329.81 -664 M 130.185 -208.034 C 130.977 -208.034 131.737 -207.718 132.297 -207.156 L 878.495 541.364 C 879.662 542.534 879.662 544.432 878.495 545.602 L 132.298 1294.12 C 131.737 1294.68 130.977 1295 130.185 1295 C 129.393 1295 128.633 1294.68 128.073 1294.12 L -618.125 545.602 C -619.292 544.432 -619.292 542.534 -618.125 541.364 L 128.073 -207.156 C 128.633 -207.718 129.393 -208.034 130.185 -208.034 Z M -611.788 543.483 L 130.185 1287.77 L 872.158 543.483 L 130.185 -200.799 L -611.788 543.483 Z"
          strokeWidth="2"
          className={cl({
            "fill-teal-300": variant === "light",
            "fill-teal-700": variant === "dark",
            "fill-teal-300/30": variant === "muted",
          })}
        />
      </svg>
    </div>
  );
}

export default Cube;
