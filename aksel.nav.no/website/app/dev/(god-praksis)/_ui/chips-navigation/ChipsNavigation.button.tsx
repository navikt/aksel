"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./ChipsNavigation.module.css";

type GpChipNavigationButtonProps = {
  count: number;
  title: string;
  type: "innholdstype" | "undertema";
  isActive?: boolean;
  resetOnClick?: boolean;
};

function GodPrakisChipsNavigationButton(props: GpChipNavigationButtonProps) {
  const { title, count, type, isActive = false, resetOnClick = false } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (isActive || resetOnClick) {
      params.delete(type);
    } else {
      params.set(type, title);
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className={styles.chipsButton}
      disabled={count === 0 && !isActive}
      data-active={isActive}
      onClick={handleClick}
      aria-pressed={isActive}
      data-umami-event="god-praksis-chip"
      data-umami-event-type={props.type}
      data-umami-event-url={pathname}
    >
      {`${title} (${count})`}
    </button>
  );
}

export { GodPrakisChipsNavigationButton };
