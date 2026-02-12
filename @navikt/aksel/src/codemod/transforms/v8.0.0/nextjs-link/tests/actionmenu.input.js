import { ActionMenu } from "@navikt/ds-react";
import NextLink from "next/link";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>Menu</ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group>
          <NextLink href="/eksempel" passHref legacyBehavior>
            <ActionMenu.Item as="a">Next.js-lenke</ActionMenu.Item>
          </NextLink>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
