import { Box } from "@navikt/ds-react";

const Placeholder = ({
  text,
  mobil,
  desktop,
  className,
}: {
  text?: string;
  mobil?: boolean;
  desktop?: boolean;
  className?: string;
}) => (
  <Box
    paddingBlock="space-44"
    width="12rem"
    borderRadius="4"
    background={
      desktop
        ? "meta-purple-strong"
        : mobil
          ? "brand-blue-strong"
          : "success-strong"
    }
    style={{ color: "var(--ax-text-accent-contrast)", textAlign: "center" }}
    className={className}
  >
    {text}
  </Box>
);

export { Placeholder };
