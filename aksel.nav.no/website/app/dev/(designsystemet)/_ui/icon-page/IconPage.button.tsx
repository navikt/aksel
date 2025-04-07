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
  const { replace } = useRouter();

  const context = useIconPage();

  const isActive = iconName === activeIconName;

  const handleClick = () => {
    /* TODO: fix types */
    const params = new URLSearchParams(searchParams ?? undefined);
    if (isActive) {
      params.delete("iconName");
    } else {
      params.set("iconName", iconName);
    }
    replace(`${pathname}?${params.toString()}`);
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
        aria-pressed={iconName === icon}
        aria-controls={isActive ? "icon-page-sidepanel" : undefined}
      >
        {icon}
      </button>
      {isActive && context.hideModal && (
        <a className={styles.iconPageSkiplink} href="#icon-page-sidepanel">
          Hopp til ikonpanel
        </a>
      )}
    </>
  );
}

export { IconPageButton };
