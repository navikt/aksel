import cl from "clsx";
import { useRouter } from "next/router";

type GpChipProps = {
  children: React.ReactNode;
  pressed: boolean;
  onClick: () => void;
  type: "innholdstype" | "undertema";
  disabled: boolean;
};

export function GpChip(props: GpChipProps) {
  const { asPath } = useRouter();

  return (
    <button
      aria-pressed={props.pressed}
      onClick={props.onClick}
      className={cl(
        "grid min-h-8 place-content-center whitespace-nowrap rounded-full bg-surface-neutral-subtle px-3 py-1 ring-1 ring-inset transition-opacity focus:outline-none focus-visible:shadow-focus-gap aria-pressed:text-text-on-inverted",
        "disabled:bg-surface-neutral-subtle disabled:opacity-40 disabled:ring-border-default",
        {
          "ring-violet-700/50 hover:bg-violet-50 aria-pressed:bg-violet-700 hover:aria-pressed:bg-violet-800":
            props.type === "innholdstype",
          "ring-teal-700/50 hover:bg-teal-50 aria-pressed:bg-teal-700 hover:aria-pressed:bg-teal-800":
            props.type === "undertema",
        },
      )}
      data-umami-event="god-praksis-chip"
      data-umami-event-type={props.type}
      data-umami-event-url={asPath}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
