import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Box, Select } from "@navikt/ds-react";

function ExampleThemingSwitch({
  legacyOnly = false,
}: {
  legacyOnly?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const { query, isReady } = useRouter();

  const shouldShow = useMemo(
    () => isReady && query.darkside === "true",
    [isReady, query.darkside],
  );

  if (!shouldShow || legacyOnly) {
    return null;
  }

  return (
    <Box position="absolute" top="space-8" right="space-8">
      <Select
        label="Tema"
        onChange={(e) => setTheme(e.target.value)}
        hideLabel
        value={theme}
        size="small"
      >
        <option value="legacy">Standard</option>
        <option value="light">Nytt lyst tema</option>
        <option value="dark">Nytt mørkt tema</option>
      </Select>
    </Box>
  );
}

export { ExampleThemingSwitch };
