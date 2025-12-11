"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import tiny_color from "tinycolor2";
import styles from "./Holiday.module.css";

/* https://github.com/importre/xmas-tree/blob/b3ccb8de7f4f9cd271f3e41ad9a1780bfbcb8ced/index.js */

const DEFAULT_SIZE = 15;
const DECO_CANDIDATES = "      *.-'o+@";
const COLOR_CANDIDATES = [
  "blue",
  "cyan",
  "green",
  "red",
  "white",
  "yellow",
] as const;

type ColorName = (typeof COLOR_CANDIDATES)[number];

type TreeOptions = {
  color?: boolean;
  size?: number;
};

function AsciiTree() {
  const [lines, updateLines] = useState(() =>
    xmasTree({ color: true, size: 21 }),
  );

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "light") {
      return;
    }
    const interval = setInterval(() => {
      updateLines(xmasTree({ color: true, size: 21 }));
    }, 1500);

    return () => clearInterval(interval);
  }, [resolvedTheme]);

  if (resolvedTheme === "light") {
    return null;
  }

  return (
    <div aria-hidden className={styles.tree}>
      <pre style={{ lineHeight: "8px", fontSize: "8px" }}>
        {lines.map((line, idx) => (
          <span key={idx}>
            {"    "}
            {line}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}

function xmasTree({ color = false, size = DEFAULT_SIZE }: TreeOptions) {
  const validSize = Math.max(size, DEFAULT_SIZE);

  const treeLines = Array.from({ length: validSize }, (_, index) =>
    makeTreeLine(index, validSize, color),
  ).filter((line) => line !== null);

  const potLines = makePot(validSize, color);

  return [...treeLines, ...potLines];
}

function makeTreeLine(index: number, size: number, hasColor: boolean) {
  const topPatterns: Record<number, { pattern: string; color?: ColorName }> = {
    0: { pattern: "*", color: "yellow" },
    1: { pattern: "_/ \\_", color: "yellow" },
    2: { pattern: "\\     /", color: "yellow" },
    3: { pattern: "/_' '_\\", color: "yellow" },
  };

  const top = topPatterns[index];
  if (top) {
    const line = centerText(top.pattern, size);
    return hasColor ? applyColor(line, top.color!) : line;
  }

  return makeBodyLine(index, size, hasColor);
}

function makePot(size: number, hasColor: boolean) {
  const scale = Math.floor(size / 25) + 1;
  const topLine = centerText(`*${repeat(size - 2, "-")}*`, size);

  return [
    hasColor ? applyColor(topLine, "green") : topLine,
    centerText(`\\${repeat(1 * scale, "_")}/`, size),
    "",
  ];
}

function makeBodyLine(index: number, size: number, hasColor: boolean) {
  const space = index - 2;
  if (space % 2 === 0) {
    return null;
  }

  const line = centerText(`/${repeat(space, " ")}\\`, size);
  const slashIndex = line.indexOf("/");

  return line.split("").map((char, i) => {
    if (char === "/" || char === "\\") {
      return hasColor ? applyColor(char, "green") : char;
    }
    if (char === " " && i > slashIndex) {
      return randomDeco(hasColor);
    }
    return char;
  });
}

function centerText(text: string, width: number) {
  const padding = " ".repeat(Math.max(0, (width - text.length) >> 1));
  return padding + text;
}

function randomDeco(hasColor: boolean) {
  const char = DECO_CANDIDATES[randomInt(DECO_CANDIDATES.length)];
  return hasColor ? applyColor(char, randomColor()) : char;
}

function repeat(count: number, char: string) {
  return char.repeat(Math.max(0, count));
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomColor(): ColorName {
  return COLOR_CANDIDATES[randomInt(COLOR_CANDIDATES.length)];
}

function applyColor(text: string, color: ColorName) {
  const hex = tiny_color(color).toHexString();
  return <span style={{ color: hex }}>{text}</span>;
}

export { AsciiTree };
