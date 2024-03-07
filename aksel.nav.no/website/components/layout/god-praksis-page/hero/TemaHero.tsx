import { useMedia } from "@/hooks/useMedia";
import { TemaHeroModal } from "@/layout/god-praksis-page/hero/parts/tema-hero/HeroModal";
import { TemaHeroStatic } from "@/layout/god-praksis-page/hero/parts/tema-hero/HeroStatic";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";

type GpHeroProps = { tema: GpTemaT | null } & HeroNavT;

function TemaHero(props: GpHeroProps) {
  const hideModal = useMedia("screen and (min-width: 1024px)");

  return hideModal ? (
    <TemaHeroStatic {...props} />
  ) : (
    <TemaHeroModal {...props} />
  );
}

export default TemaHero;
