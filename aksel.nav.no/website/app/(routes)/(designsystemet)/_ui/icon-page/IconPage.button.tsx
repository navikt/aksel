"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./IconPage.module.css";
import { useIconPage } from "./IconPage.provider";

function IconPageButton({
  activeIconName,
  iconName,
  icon,
}: {
  activeIconName?: string;
  iconName: string;
  icon: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, prefetch } = useRouter();

  const context = useIconPage();

  const isActive = iconName === activeIconName;

  const getNextHref = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (isActive) {
      params.delete("iconName");
    } else {
      params.set("iconName", iconName);
    }

    return `${pathname}?${params.toString()}`;
  };

  const handleClick = () => {
    replace(getNextHref(), { scroll: false });
  };

  return (
    <>
      <button
        ref={(el) => {
          if (isActive) {
            context.setActiveIconButton(el);
          }
        }}
        onClick={handleClick}
        key={iconName}
        id={iconName}
        className={styles.iconButton}
        data-state={isActive ? "active" : "inactive"}
        aria-pressed={isActive}
        aria-controls={isActive ? "icon-page-sidepanel" : undefined}
        onMouseEnter={() => prefetch(getNextHref())}
      >
        {icon}
      </button>
      {isActive && context.hideDialog && (
        <a className={styles.iconPageSkiplink} href="#icon-page-sidepanel">
          Hopp til ikonpanel
        </a>
      )}
    </>
  );
}

export { IconPageButton };
