import { useMedia } from "@/hooks/useMedia";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import { TemaHeroModal } from "./TemaHeroModal";
import { TemaHeroStatic } from "./TemaHeroStatic";

type GpHeroProps = { tema: GpTemaT | null } & HeroNavT;

function TemaHero(props: GpHeroProps) {
  const hideModal = useMedia("screen and (min-width: 768px)");

  return hideModal ? (
    <TemaHeroStatic {...props} />
  ) : (
    <TemaHeroModal {...props} />
  );
}

export default TemaHero;
