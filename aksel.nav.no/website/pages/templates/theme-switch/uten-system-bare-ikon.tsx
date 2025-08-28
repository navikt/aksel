import { ThemeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { useTheme } from "@/app/_ui/theming/ThemeProvider";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip
      content={
        theme === "light" ? "Endre til lyst tema" : "Endre til mørkt tema"
      }
      placement="bottom"
    >
      <Button
        variant="secondary-neutral"
        data-color="neutral"
        icon={<ThemeIcon aria-hidden />}
        onClick={() => {
          theme === "light" ? setTheme("dark") : setTheme("light");
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
};
