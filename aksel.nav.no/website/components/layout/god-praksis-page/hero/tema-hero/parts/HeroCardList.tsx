import GpHeroCard from "@/layout/god-praksis-page/cards/GpHeroCard";
import { HeroNavT } from "@/layout/god-praksis-page/interface";

type HeroListProps = {
  heroNav: HeroNavT["heroNav"];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSlug?: string;
  currentlyActiveLink?: React.MutableRefObject<HTMLElement | null>;
};

export function HeroList({
  heroNav,
  setOpen,
  currentlyActiveLink,
  currentSlug,
}: HeroListProps) {
  return (
    <nav aria-label="Temavelger" className="relative z-10 mt-2">
      <ul className="flex flex-col flex-wrap gap-2 md:flex-row lg:gap-4">
        <li>
          <GpHeroCard
            href="gp"
            image={null}
            compact
            onClick={() => {
              setOpen(false);
            }}
          >
            Alle tema
          </GpHeroCard>
        </li>
        {heroNav.map((tema, idx) => (
          <li key={tema.slug + idx}>
            <GpHeroCard
              href={`gp/${tema.slug}`}
              image={tema.image}
              compact
              aria-current={currentSlug === tema.slug ? "page" : undefined}
              onClick={() => {
                setOpen(false);
              }}
              ref={(element: HTMLAnchorElement) => {
                if (currentSlug === tema.slug && currentlyActiveLink) {
                  currentlyActiveLink.current = element;
                }
              }}
            >
              {tema.title}
            </GpHeroCard>
          </li>
        ))}
      </ul>
    </nav>
  );
}
