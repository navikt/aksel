import { Meta } from "@storybook/react";
import React from "react";
import { VStack } from "../layout/stack";
import { Phone } from "./Phone";

export default {
  title: "ds-react/Phone",
  component: Phone,
} as Meta;

export const Default = () => {
  return (
    <VStack gap="2">
      <Phone number="+01234567" />
      <Phone number="  +abc34+=[03]0({})567  " />
      <Phone number="004701234567" />
      <Phone number="04045" />
      <Phone number="116117" />
      <Phone number="0123456" />
      <Phone number="8123456" />
      <Phone number="22222222" />
      <Phone number="80030300" />
      <Phone prefixCode="47" number="22222222" />
    </VStack>
  );
};
