import DOMPurify from "isomorphic-dompurify";
import styles from "./ImageAsSvg.module.css";

/**
 * Utility function to fetch and format a image as SVG with recoloring.
 */
async function ImageAsThemedSvg({
  url,
  size,
  className,
}: {
  url?: string;
  size: number;
  className?: string;
}) {
  if (!url) {
    return null;
  }

  const svgString = await fetch(url)
    .then((res) => res.text())
    .catch(() => null);

  if (!svgString) {
    return null;
  }

  const formattedSvgString = formatSvgString(svgString);

  const cleanedSvg = DOMPurify.sanitize(formattedSvgString, {
    USE_PROFILES: { svg: true },
  });

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We purify the SVG string, so its safer to use locally here.
      dangerouslySetInnerHTML={{ __html: cleanedSvg }}
      aria-hidden
      style={{ "--website-svg-size": `${size}px` }}
      className={className}
    />
  );
}

const colorReplacements = {
  "#99F6E4": "var(--ax-bg-moderate-hoverA)",
  "#AEF4E4": "var(--ax-bg-moderate-hoverA)",
  "#003453": "var(--ax-text-subtle)",
  "#262626": "var(--ax-text-subtle)",
  "#23262A": "var(--ax-text-subtle)",
  "#417DA0": "var(--ax-bg-strong)",
  "#D7E6F0": "var(--ax-bg-moderate-hover)",
  "#C0D6E4": "var(--ax-bg-moderate-pressed)",
  "#E3EFF7": "var(--ax-bg-moderate)",
  "#005A92": "var(--ax-bg-strong)",
  /* TODO: This currently overrides mask-fill. We want to avoid overriding mask-tags if possible. */
  white: "var(--ax-bg-default)",
};

/**
 * Formats the SVG string by replacing colors and adding classes.
 */
function formatSvgString(svgString: string) {
  let formattedSvgString = svgString;

  formattedSvgString = formattedSvgString.replace(
    "<svg",
    `<svg class="${styles.imageAsModule}" aria-hidden`,
  );

  Object.keys(colorReplacements).forEach((color) => {
    const replacement = colorReplacements[color];

    formattedSvgString = formattedSvgString.replace(
      new RegExp(color, "g"),
      replacement,
    );
  });

  return formattedSvgString;
}

export { ImageAsThemedSvg };
