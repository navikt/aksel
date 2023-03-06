import { Heading } from "@navikt/ds-react";
import cl from "clsx";
import React from "react";

export const LevelTwoHeading = ({
  children,
  hidden,
  id,
}: {
  children: [React.ReactNode | string];
  hidden?: boolean;
  id: string;
}): JSX.Element => {
  return (
    <>
      {hidden && <div id={id} className="scroll-m-18" />}
      <Heading
        tabIndex={-1}
        id={id + (hidden ? "-hidden" : "")}
        level="2"
        size="large"
        className={cl(
          "max-w-text text-deepblue-800 group mb-4 mt-12 scroll-mt-20 first-of-type:mt-0 focus:outline-none",
          {
            hidden: hidden,
            block: !hidden,
          }
        )}
      >
        {children}
      </Heading>
    </>
  );
};
