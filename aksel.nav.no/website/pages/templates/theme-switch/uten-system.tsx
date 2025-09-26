import { ThemeIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useThemeExample } from "@/web/examples/useThemeExample";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  const { theme, setTheme } = useThemeExample();

  return (
    <Button
      variant="secondary-neutral"
      data-color="neutral"
      icon={<ThemeIcon aria-hidden />}
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      Fargetema
    </Button>
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
