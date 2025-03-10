import cl from "clsx";

const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "mx-05 my-0 inline-block min-w-[2rem] rounded-md px-2 py-[1px] text-center font-mono text-sm text-gray-900 ring-1 ring-inset ring-border-subtle",
      "bg-gradient-to-b from-surface-default via-surface-default to-surface-neutral-subtle",
      "group-active:from-gray-700 group-active:via-gray-700 group-active:to-gray-900 group-active:text-text-on-inverted group-active:ring-grayalpha-400",
      "via-gray-800 to-gray-700 dark:from-gray-800 dark:text-white",
    )}
  >
    <span className="kbd">{props.children}</span>
  </kbd>
);

export default KBD;
