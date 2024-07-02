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
        <Button disabled icon={<StarIcon aria-hidden />}>
          Dropdown
        </Button>
      </DropdownMenu.Trigger>
    </DropdownMenu>
  );
};
