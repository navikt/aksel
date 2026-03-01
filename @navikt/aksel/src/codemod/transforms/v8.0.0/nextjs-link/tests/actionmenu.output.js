import { ActionMenu } from "@navikt/ds-react";
import NextLink from "next/link";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>Menu</ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group>
          <ActionMenu.Item as={NextLink} href="/eksempel">
            Next.js-lenke
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
