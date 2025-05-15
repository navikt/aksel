import cl from "clsx";
import Link from "next/link";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

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
              "group z-10 rounded-lg bg-surface-default p-4 text-deepblue-700 shadow-xsmall hover:shadow-small focus:outline-none focus-visible:shadow-focus",
              {
                "max-w-md": variant === "forside",
              },
            )}
            prefetch={false}
            onClick={() =>
              umamiTrack("navigere", {
                kilde: "introkort",
                url: href,
              })
            }
          >
            <span className="flex items-center gap-2">
              <Icon
                aria-hidden
                className="shrink-0 text-2xl text-deepblue-500"
                role="img"
              />
              <span className="text-xl font-semibold underline group-hover:no-underline">
                {title}
              </span>
            </span>
            <div className="mt-2 text-text-default">{desc}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
