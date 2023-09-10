import * as AllIcons from "@navikt/aksel-icons";
import React from "react";

/* eslint import/namespace: ['error', { allowComputed: true }] */
const icons = Object.keys(AllIcons).map((key) => AllIcons[key]);

export const RandomIcon = () => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  return <Icon />;
};
