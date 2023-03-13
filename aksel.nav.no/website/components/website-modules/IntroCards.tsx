import { logNav } from "components/website-modules/utils/amplitude";
import Link from "next/link";
import cl from "clsx";

export const IntroCards = ({
  links,
  className,
  variant,
}: {
  links: {
    title: string;
    desc: string;
    icon: React.FC<any>;
    href: string;
  }[];
  className?: string;
  variant?: "forside" | "komponentside";
}) => {
  return (
    <ul className={cl("grid w-full grid-cols-2 gap-4 md:gap-6", className)}>
      {links.map(({ icon: Icon, title, desc, href }) => (
        <li key={title} className="grid">
          <Link
            href={href}
            passHref
            className={cl(
              "focus-visible:shadow-focus bg-surface-default hover:shadow-small hover:ring-border-subtle group z-10 rounded-lg p-4 hover:ring-1 focus:outline-none",
              { "ring-border-subtle ring-1": variant === "komponentside" }
            )}
            onClick={(e) =>
              logNav(
                "intro-kort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <span className="items-center gap-2 sm:flex">
              <Icon aria-hidden className="shrink-0 text-2xl" role="img" />
              <span className="text-xl font-semibold group-hover:underline">
                {title}
              </span>
            </span>
            <div className="text-text-subtle mt-2">{desc}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
