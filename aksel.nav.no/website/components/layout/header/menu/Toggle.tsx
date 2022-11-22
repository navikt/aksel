import { Popover } from "@navikt/ds-react";
import cl from "classnames";
import React, { useState } from "react";

const Toggle = ({
  buttonContent,
  menu,
  open,
  setOpen,
  isHamburger,
  inverted,
}: {
  buttonContent: React.ReactNode;
  menu: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  isHamburger?: boolean;
  inverted?: boolean;
}) => {
  const [buttonRef, setButtonRef] = useState(null);

  return (
    <>
      <div
        className={cl("z-[1050] mr-0 flex h-full justify-center", {
          "xs:mr-8": !isHamburger,
        })}
      >
        <button
          ref={setButtonRef}
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={cl({
            "min-w-header focus-visible:shadow-focus-inset ml-auto flex items-center justify-center border-r-0 hover:bg-gray-800/10 focus:outline-none":
              inverted,
            "navdsi-dropdown__toggle navdsi-header__button min-w-header justify-center gap-4 border-none focus-visible:shadow-[inset_0_0_0_1px_var(--a-surface-inverted),inset_0_0_0_3px_var(--a-border-focus-on-inverted)]":
              !inverted,
          })}
        >
          {buttonContent}
        </button>
        <Popover
          onClose={() => setOpen(false)}
          anchorEl={buttonRef}
          open={open}
          arrow={false}
          placement="bottom-start"
          offset={8}
          className="animate-fadeIn bg-surface-default shadow-large z-[1100] w-80 max-w-full rounded border-none"
        >
          {menu}
        </Popover>
      </div>

      {!inverted && (
        <div
          className={cl(
            "fixed inset-0 z-[1010] h-full w-screen bg-gray-900 transition-opacity",
            { "visible opacity-50": open, "invisible opacity-0": !open }
          )}
        />
      )}
    </>
  );
};

export default Toggle;
