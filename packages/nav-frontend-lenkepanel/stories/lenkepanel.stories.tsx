import React from "react";
import Lenkepanel from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Lenkepanel",
  component: Lenkepanel,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "fit-content",
    }}
  >
    <Lenkepanel href="#" border tittelProps="undertittel">
      Voluptate sunt nisi consequat ea sunt laboris consectetur. Consequat
      aliquip laborum sint veniam eu incididunt commodo laborum sint laborum. Ut
      deserunt amet sunt aliquip. Minim consequat nulla occaecat ex deserunt
      consectetur ad voluptate officia. Id cillum dolore culpa sunt duis
      pariatur amet consequat deserunt enim et sint et esse. Aliquip aliquip
      voluptate mollit proident deserunt eu proident proident do cupidatat duis.
      Ut est in cupidatat exercitation velit aliqua pariatur laboris.
    </Lenkepanel>
    <Lenkepanel href="#" border tittelProps="normaltekst">
      Voluptate sunt nisi consequat ea sunt laboris consectetur. Consequat
      aliquip laborum sint veniam eu incididunt commodo laborum sint laborum. Ut
      deserunt amet sunt aliquip. Minim consequat nulla occaecat ex deserunt
      consectetur ad voluptate officia. Id cillum dolore culpa sunt duis
      pariatur amet consequat deserunt enim et sint et esse. Aliquip aliquip
      voluptate mollit proident deserunt eu proident proident do cupidatat duis.
      Ut est in cupidatat exercitation velit aliqua pariatur laboris.
    </Lenkepanel>
  </div>
);
