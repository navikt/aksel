import React, { useState } from "react";
import Accordion from "../src/index";

export default {
  title: "@navikt/accordion",
  component: Accordion,
};

export const All = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Accordion</h1>
      <Accordion headline="tittel" open={open} onClick={(e) => setOpen(!open)}>
        Eu magna fugiat officia sit ullamco reprehenderit reprehenderit officia.
        Culpa fugiat irure deserunt irure enim adipisicing qui id. Pariatur
        commodo dolore consequat nulla cupidatat commodo nisi sunt. Ad proident
        occaecat cillum eu Lorem proident sunt anim officia voluptate. Veniam
        ullamco magna elit amet mollit exercitation magna quis ad occaecat in
        elit. Labore ad id pariatur consequat consectetur ullamco culpa dolor
        dolor. Sunt irure eiusmod velit duis excepteur veniam consectetur eu
        occaecat reprehenderit qui anim dolore. Ea voluptate dolore proident
        esse aliqua amet magna pariatur incididunt ea excepteur. Aliquip magna
        ut ipsum veniam eu laborum id commodo.
      </Accordion>
      <h1>Open</h1>
      <Accordion headline="tittel" open={true} onClick={(e) => null}>
        Eu magna fugiat officia sit ullamco reprehenderit reprehenderit officia.
        Culpa fugiat irure deserunt irure enim adipisicing qui id. Pariatur
        commodo dolore consequat nulla cupidatat commodo nisi sunt. Ad proident
        occaecat cillum eu Lorem proident sunt anim officia voluptate. Veniam
        ullamco magna elit amet mollit exercitation magna quis ad occaecat in
        elit. Labore ad id pariatur consequat consectetur ullamco culpa dolor
        dolor. Sunt irure eiusmod velit duis excepteur veniam consectetur eu
        occaecat reprehenderit qui anim dolore. Ea voluptate dolore proident
        esse aliqua amet magna pariatur incididunt ea excepteur. Aliquip magna
        ut ipsum veniam eu laborum id commodo.
      </Accordion>
      <h1>Long headline</h1>
      <Accordion
        headline="Consequat incididunt aliquip aliquip fugiat anim cupidatat eu do ipsum pariatur."
        open={open}
        onClick={(e) => setOpen(!open)}
      >
        Eu magna fugiat officia sit ullamco reprehenderit reprehenderit officia.
        Culpa fugiat irure deserunt irure enim adipisicing qui id. Pariatur
        commodo dolore consequat nulla cupidatat commodo nisi sunt. Ad proident
        occaecat cillum eu Lorem proident sunt anim officia voluptate. Veniam
        ullamco magna elit amet mollit exercitation magna quis ad occaecat in
        elit. Labore ad id pariatur consequat consectetur ullamco culpa dolor
        dolor. Sunt irure eiusmod velit duis excepteur veniam consectetur eu
        occaecat reprehenderit qui anim dolore. Ea voluptate dolore proident
        esse aliqua amet magna pariatur incididunt ea excepteur. Aliquip magna
        ut ipsum veniam eu laborum id commodo.
      </Accordion>
    </>
  );
};
