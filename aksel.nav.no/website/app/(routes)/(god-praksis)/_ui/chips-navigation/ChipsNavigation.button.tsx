"use client";

import { stegaClean } from "next-sanity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Events } from "@navikt/analytics-types";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
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
  const { push, prefetch } = useRouter();

  const getHref = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (isActive || resetOnClick) {
      params.delete(type);
    } else {
      params.set(type, title);
    }
    return stegaClean(`${pathname}?${params.toString()}`);
  };

  const handleClick = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (isActive || resetOnClick) {
      params.delete(type);
    } else {
      params.set(type, title);
    }

    umamiTrack(Events.FILTERVALG, {
      kategori: props.type,
      filternavn: title,
      seksjon: "god praksis",
    });

    push(getHref(), { scroll: false });
  };

  return (
    <button
      type="button"
      className={styles.chipsButton}
      disabled={count === 0 && !isActive}
      data-active={isActive}
      onClick={handleClick}
      aria-pressed={isActive}
      onMouseEnter={() => {
        const href = getHref();
        prefetch(href);
      }}
    >
      {stegaClean(`${title} (${count})`)}
    </button>
  );
}

export { GodPrakisChipsNavigationButton };
