import React from "react";
import {
  CheckmarkIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  ThemeIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button, HStack } from "@navikt/ds-react";
import { useThemeExample } from "@/web/examples/useThemeExample";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  const { theme, setTheme } = useThemeExample();

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant="secondary-neutral"
          data-color="neutral"
          icon={<ThemeIcon aria-hidden />}
        >
          Fargetema
        </Button>
      </ActionMenu.Trigger>

      <ActionMenu.Content>
        <ActionMenu.Label>Velg fargetema</ActionMenu.Label>
        <ActionMenu.Group aria-label="Velg fargetema">
          <ActionMenu.Item
            icon={<SunIcon />}
            aria-current={theme === "light"}
            onSelect={() => setTheme("light")}
          >
            <HStack gap="space-24" align="center">
              Lyst
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
            <HStack gap="space-24" align="center">
              Mørkt
              {theme === "dark" && (
                <CheckmarkIcon aria-hidden fontSize="1.25rem" />
              )}
            </HStack>
          </ActionMenu.Item>
          <ActionMenu.Item
            icon={<MonitorIcon />}
            aria-current={theme === "system"}
            onSelect={() => setTheme("system")}
          >
            <HStack gap="space-24" align="center">
              System
              {theme === "system" && (
                <CheckmarkIcon aria-hidden fontSize="1.25rem" />
              )}
            </HStack>
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
  sandboxEnabled: false,
};
