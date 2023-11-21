import { amplitudeLogNavigation } from "@/logging";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

function HeaderLink({ name, href, prefetch = undefined }) {
  const { asPath } = useRouter();
  return (
    <li>
      <Link
        href={href}
        prefetch={prefetch}
        className={cl(
          "text-deepblue-800 focus-visible:shadow-focus relative grid h-11 place-items-center rounded px-2 focus:outline-none",
          {
            "before:bg-deepblue-600 font-semibold before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full":
              asPath.startsWith(href),
            "hover:before:bg-border-subtle-hover before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full":
              !asPath.startsWith(href),
          }
        )}
        onClick={(e) =>
          amplitudeLogNavigation("header", e.currentTarget.getAttribute("href"))
        }
      >
        {name}
      </Link>
    </li>
  );
}

export default HeaderLink;
