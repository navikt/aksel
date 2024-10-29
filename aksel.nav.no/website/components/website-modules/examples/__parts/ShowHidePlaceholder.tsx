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
    paddingBlock="11"
    width="12rem"
    borderRadius="medium"
    background={
      desktop ? "surface-alt-1" : mobil ? "surface-alt-3" : "surface-success"
    }
    style={{ color: "var(--a-text-on-action)", textAlign: "center" }}
    className={className}
  >
    {text}
  </Box>
);

export { Placeholder };
