import { amplitudeLogNavigation } from "@/logging";
import cl from "clsx";
import Link from "next/link";

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
    <ul className={cl("grid w-full gap-4 md:gap-6", className)}>
      {links.map(({ icon: Icon, title, desc, href }) => (
        <li key={title} className="grid">
          <Link
            href={href}
            passHref
            className={cl(
              "focus-visible:shadow-focus text-deepblue-700 bg-surface-default shadow-xsmall hover:shadow-small group z-10 rounded-lg p-4 focus:outline-none",
              {
                "max-w-md": variant === "forside",
              }
            )}
            prefetch={false}
            onClick={(e) =>
              amplitudeLogNavigation(
                "intro-kort",
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <span className="flex items-center gap-2">
              <Icon
                aria-hidden
                className="text-deepblue-500 shrink-0 text-2xl"
                role="img"
              />
              <span className="text-xl font-semibold underline group-hover:no-underline">
                {title}
              </span>
            </span>
            <div className="text-text-default mt-2">{desc}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
