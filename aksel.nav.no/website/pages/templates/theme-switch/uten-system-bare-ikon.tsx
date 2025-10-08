import React from "react";
import { ThemeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { useThemeExample } from "@/web/examples/useThemeExample";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  const { theme, setTheme } = useThemeExample();

  return (
    <Tooltip
      content={
        theme === "dark" ? "Endre til lyst tema" : "Endre til mørkt tema"
      }
      placement="bottom"
    >
      <Button
        variant="secondary-neutral"
        data-color="neutral"
        icon={<ThemeIcon aria-hidden />}
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      />
    </Tooltip>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  sandboxEnabled: false,
};
