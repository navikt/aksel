import {
  CheckmarkIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  ThemeIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button, HStack, Tooltip } from "@navikt/ds-react";
import { useTheme } from "@/app/_ui/theming/ThemeProvider";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <ActionMenu>
      <Tooltip content="Bytt fargetema" placement="bottom">
        <ActionMenu.Trigger>
          <Button
            variant="secondary-neutral"
            data-color="neutral"
            icon={<ThemeIcon aria-hidden />}
          />
        </ActionMenu.Trigger>
      </Tooltip>

      <ActionMenu.Content>
        <ActionMenu.Label>Velg fargetema</ActionMenu.Label>
        <ActionMenu.Group aria-label="Velg fargetema">
          <ActionMenu.Item
            icon={<SunIcon />}
            aria-current={theme === "light"}
            onSelect={() => setTheme("light")}
          >
            <HStack
              gap="space-24"
              as="span"
              justify="space-between"
              align="center"
            >
              <span>Lyst modus</span>
              {theme === "light" && (
                <CheckmarkIcon aria-hidden fontSize="1.25rem" />
              )}
            </HStack>
          </ActionMenu.Item>
          <ActionMenu.Item
            icon={<MoonIcon />}
            aria-current={theme === "dark"}
            onSelect={() => setTheme("dark")}
          >
            <HStack
              gap="space-24"
              as="span"
              justify="space-between"
              align="center"
            >
              <span>Mørkt modus</span>
              {theme === "dark" && (
                <CheckmarkIcon aria-hidden fontSize="1.25rem" />
              )}
            </HStack>
          </ActionMenu.Item>
          <ActionMenu.Divider />
          <ActionMenu.Item
            icon={<MonitorIcon />}
            aria-current={theme === "system"}
            onSelect={() => setTheme(systemTheme ?? "light")}
          >
            Systemfarger
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
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
