import * as AllIcons from "@navikt/aksel-icons";
import React from "react";

// eslint-disable-next-line import/namespace
const icons = Object.keys(AllIcons).map((key) => AllIcons[key]);

export const RandomIcon = () => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  return <Icon />;
};
