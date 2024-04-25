import { Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { HeroPanel } from "@/web/hero-panel/HeroPanel";

type GpIntroHeroProps = {
  title: string;
  children: React.ReactNode;
};

function IntroHero({ title, children }: GpIntroHeroProps) {
  return (
    <HeroPanel variant="god-praksis" className="relative isolate">
      <Cube />
      <Heading level="1" size="xlarge" className="relative z-10">
        {title}
      </Heading>
      <div className="relative z-10">{children}</div>
    </HeroPanel>
  );
}

export default IntroHero;
