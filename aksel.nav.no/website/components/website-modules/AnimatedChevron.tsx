import cl from "clsx";

/**
 * Simple animated chevron-component based on the Aksel logo
 * @note Requires wrapper that is using it to set the `group`-class from tailwind (handles hover and focus-visible)
 * @note Uses `currentColor` for the stroke color, so wrapper must define color
 */
export function AnimatedChevron({
  scale = "card",
}: {
  scale?: "card" | "inline";
}) {
  return (
    <svg
      width="21"
      height="23"
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cl("text-deepblue-700 group-focus:text-text-on-inverted", {
        "scale-75": scale === "card",
        "scale-[60%]": scale === "inline",
      })}
    >
      <path
        d="M9.77979 1.18945L17.9048 9.31445C18.9403 10.35 18.9403 12.0289 17.9048 13.0645L9.77979 21.1895"
        stroke="currentColor"
        strokeWidth="2"
        className="-translate-x-2 transition-transform ease-out group-hover:translate-x-0 group-has-[:focus-visible]:translate-x-0"
      />
      <path
        d="M0.61377 11.4502L10.6138 11.4502"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-0 transition-opacity duration-75 ease-linear group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
      />
    </svg>
  );
}
