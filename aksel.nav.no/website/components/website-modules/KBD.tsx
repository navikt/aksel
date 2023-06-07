import cl from "clsx";

export const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "mx-05 border-border-subtle  my-0 inline-block min-w-[2rem] rounded-md border px-2 py-[1px] text-center font-mono text-sm text-gray-900",
      "from-surface-default via-surface-default to-surface-neutral-subtle bg-gradient-to-b"
    )}
  >
    <span className="kbd">{props.children}</span>
    <style jsx>{`
      .kbd {
        text-shadow: 0 1px 0px var(--a-grayalpha-200);
      }
    `}</style>
  </kbd>
);
