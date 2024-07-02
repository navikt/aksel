import { Meta } from "@storybook/react";
import React from "react";
import { StarIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { DropdownMenu } from "./DropdownMenu";

export default {
  title: "ds-react/DropdownMenu",
} satisfies Meta<typeof DropdownMenu>;

export const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button disabled icon={<StarIcon tabIndex={-1} />}>
          123
        </Button>
      </DropdownMenu.Trigger>
    </DropdownMenu>
  );
};
