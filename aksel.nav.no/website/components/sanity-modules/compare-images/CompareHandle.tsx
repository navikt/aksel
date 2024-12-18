import cl from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";

interface CompareHandleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position: number;
  isDragging: boolean;
}

export const CompareHandle = ({
  position,
  isDragging,
  ...rest
}: CompareHandleProps) => {
  return (
    <button
      className={cl(
        "group absolute left-0 top-0 z-10 h-full appearance-none border-0 bg-none p-0 outline-none",
        {
          "cursor-ew-resize opacity-100": isDragging,
          "opacity-40 focus:opacity-100 group-hover:opacity-100": !isDragging,
        },
      )}
      aria-label="Use arrow keys to adjust comparison"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      aria-valuetext={`${position}%`}
      data-rcs="handle-container"
      role="slider"
      {...rest}
    >
      <span className="absolute top-0 h-full w-[2px] bg-surface-subtle shadow-[rgba(0,_0,_0,_0.35)_0px_0px_4px]" />
      <span className="pointer-events-none relative z-10 flex items-center rounded-full bg-surface-subtle text-3xl outline-[3px] outline-offset-2 outline-border-focus group-focus:outline">
        <ChevronLeftIcon aria-hidden />
        <ChevronRightIcon aria-hidden />
      </span>
    </button>
  );
};
