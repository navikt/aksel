"use client";

import { useTheme } from "next-themes";
import { AsciiTree } from "@/app/_ui/holiday-deco/AsciiTree";
import { Snow } from "@/app/_ui/holiday-deco/Snow";

type HolidayDecorationsProps = {
  type:
    | {
        name: "snow";
      }
    | { name: "tree"; right?: boolean };
};

const isHolidaySeason = new Date().getMonth() === 11;

function HolidayDecorations({ type }: HolidayDecorationsProps) {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light" || !isHolidaySeason) {
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
