import React from "react";
import Lesmerpanel from "../src/lesmerpanel";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Lesmerpanel",
  component: Lesmerpanel,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "auto", rowGap: "2rem" }}>
      <Lesmerpanel
        intro={"Default, Tekst eller elementer som vises før panelet er åpnet"}
        border={true}
      >
        <div>
          Tekst eller elementer som vises etter panelet er åpnet. Pariatur
          consectetur commodo deserunt anim veniam consectetur nisi anim sint.
          Ad irure in id cupidatat aute sint exercitation minim. Eiusmod fugiat
          ad excepteur voluptate labore consectetur Lorem ipsum irure commodo.
        </div>
      </Lesmerpanel>
      <Lesmerpanel
        intro={
          "border=false, Tekst eller elementer som vises før panelet er åpnet"
        }
        border={false}
      >
        <div>
          Tekst eller elementer som vises etter panelet er åpnet. Pariatur
          consectetur commodo deserunt anim veniam consectetur nisi anim sint.
          Ad irure in id cupidatat aute sint exercitation minim. Eiusmod fugiat
          ad excepteur voluptate labore consectetur Lorem ipsum irure commodo.
        </div>
      </Lesmerpanel>
      <Lesmerpanel
        intro={
          "defaultApen=true, Tekst eller elementer som vises før panelet er åpnet"
        }
        border={true}
        defaultApen
      >
        <div>
          Tekst eller elementer som vises etter panelet er åpnet. Pariatur
          consectetur commodo deserunt anim veniam consectetur nisi anim sint.
          Ad irure in id cupidatat aute sint exercitation minim. Eiusmod fugiat
          ad excepteur voluptate labore consectetur Lorem ipsum irure
          commodo.Aliquip in aute aliquip nulla. Nostrud in occaecat ex ipsum
          aliquip non veniam aliqua est ipsum anim. Voluptate reprehenderit eu
          laboris occaecat dolore consequat duis in non. Cupidatat consectetur
          ut occaecat cupidatat laborum sunt adipisicing qui anim nostrud aute
          occaecat enim. Laborum aliquip pariatur anim commodo eu dolor dolore
          cillum adipisicing.
        </div>
      </Lesmerpanel>
    </div>
  );
};
