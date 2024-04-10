import cl from "clsx";
import { Box, Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import styles from "../Hero.module.css";

type GpIntroHeroProps = {
  title: string;
  children: React.ReactNode;
};

function IntroHero({ title, children }: GpIntroHeroProps) {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock={{ xs: "6", lg: "10" }}
      className={cl(
        "relative isolate ring-1 ring-inset ring-teal-400",
        styles.heroGradient,
      )}
    >
      <Cube />
      <Heading level="1" size="xlarge" className="relative z-10 mt-2">
        {title}
      </Heading>
      <div className="relative z-10">{children}</div>
    </Box>
  );
}

export default IntroHero;
