"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AsciiTree } from "@/app/_ui/holiday-deco/AsciiTree";
import { Snow } from "@/app/_ui/holiday-deco/Snow";

type HolidayDecorationsProps = {
  type:
    | {
        name: "snow";
      }
    | { name: "tree"; right?: boolean };
};

function HolidayDecorations({ type }: HolidayDecorationsProps) {
  const { resolvedTheme } = useTheme();
  const [isHolidaySeason, setIsHolidaySeason] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHolidaySeason(
      resolvedTheme !== "light" && new Date().getMonth() === 11,
    );
  }, [resolvedTheme]);

  if (!isHolidaySeason) {
    return null;
  }

  if (type.name === "snow") {
    return <Snow />;
  }
  if (type.name === "tree") {
    return <AsciiTree right={type.right} />;
  }

  return null;
}

export { HolidayDecorations };
