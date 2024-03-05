import { BodyLong, Box, Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/Cube";

type GpHeroProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function StaticHero({ title, children, description }: GpHeroProps) {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className="relative isolate bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 transition-[height]"
    >
      <Cube />
      <Heading level="1" size="xlarge" className="z-10 mt-2 text-aksel-heading">
        {title}
      </Heading>
      {description && (
        <BodyLong size="large" className="relative z-10 mt-4">
          {description}
        </BodyLong>
      )}
      {children && <div className="mt-10">{children}</div>}
    </Box>
  );
}

export default StaticHero;
