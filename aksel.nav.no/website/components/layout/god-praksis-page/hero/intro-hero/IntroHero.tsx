import { Box, Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";

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
      className="relative isolate bg-gradient-to-tr from-teal-400 via-teal-200 via-60% to-teal-200 ring-1 ring-inset ring-teal-400"
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
