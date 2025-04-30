import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

function HamburgerLink({ name, href, onClick }) {
  const { asPath } = useRouter();
  return (
    <li className="my-2 flex h-11 items-center">
      <Link
        href={href}
        passHref
        className={cl(
          "relative flex h-full w-full items-center rounded px-2 hover:bg-surface-action-subtle-hover focus:outline-none focus-visible:shadow-focus",
          {
            "pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full before:bg-surface-action-selected":
              asPath.startsWith(href),
            "": !asPath.startsWith(href),
          },
        )}
        onClick={() => {
          onClick();
          umamiTrack("navigere", {
            kilde: "hamburger",
            url: href,
          });
        }}
      >
        {name}
      </Link>
    </li>
  );
}

export default HamburgerLink;
