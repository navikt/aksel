import { amplitudeLogNavigation } from "@/logging";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

function HamburgerLink({ name, href, onClick }) {
  const { asPath } = useRouter();
  return (
    <li className="my-2 flex h-11 items-center">
      <Link
        href={href}
        passHref
        className={cl(
          "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus relative flex h-full w-full items-center rounded px-2 focus:outline-none",
          {
            "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
              asPath.startsWith(href),
            "": !asPath.startsWith(href),
          }
        )}
        onClick={(e) => {
          amplitudeLogNavigation(
            "header",
            e.currentTarget.getAttribute("href")
          );
          onClick();
        }}
      >
        {name}
      </Link>
    </li>
  );
}

export default HamburgerLink;
