import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { amplitudeLogNavigation } from "@/logging";

type HeaderLinkProps = {
  name: string;
  href: string;
  prefetch?: boolean;
};

function HeaderLink({ name, href, prefetch = undefined }: HeaderLinkProps) {
  const { asPath } = useRouter();
  return (
    <li>
      <Link
        href={href}
        prefetch={prefetch}
        className={cl(
          "relative grid h-11 place-items-center rounded px-2 text-deepblue-800 focus:outline-none focus-visible:shadow-focus",
          {
            "font-semibold before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full before:bg-deepblue-600":
              asPath.startsWith(href),
            "before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full hover:before:bg-border-subtle-hover":
              !asPath.startsWith(href),
          },
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
