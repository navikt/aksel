import GpHeroCard from "@/layout/god-praksis-page/cards/GpHeroCard";
import { HeroNavT } from "@/layout/god-praksis-page/interface";

type HeroListProps = {
  heroNav: HeroNavT["heroNav"];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSlug?: string;
};

export function HeroCardList({ heroNav, setOpen, currentSlug }: HeroListProps) {
  return (
    <nav aria-label="Temavelger" className="relative z-10 mt-5">
      <ul className="flex flex-col flex-wrap gap-2 md:flex-row lg:gap-4">
        <li>
          <GpHeroCard href="god-praksis" compact>
            Alle tema
          </GpHeroCard>
        </li>
        {heroNav.map((tema, idx) => (
          <li key={tema.slug + idx}>
            <GpHeroCard
              href={`god-praksis/${tema.slug}`}
              image={
                currentSlug === tema.slug ? tema.imageInverted : tema.image
              }
              compact
              aria-current={currentSlug === tema.slug ? "page" : undefined}
              onClick={() => {
                // Since navigating to same page will not trigger a new render, we have to manually close it
                currentSlug === tema.slug && setOpen(false);
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
