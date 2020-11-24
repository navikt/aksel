import React, { useState } from "react";
import Accordion from "../src/index";

export default {
  title: "@nav-frontend/react-accordion",
  component: Accordion,
};

export const All = () => {
  const [open, setOpen] = useState(false);

  const onRest = (e) => {
    console.log("storyonrest");
  };
  return (
    <>
      <h1>Accordion</h1>
      <Accordion
        title="tittel"
        collapseProps={{ onRest }}
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

      <h1>Accordion no Border</h1>
      <Accordion
        title="tittel"
        collapseProps={{ onRest }}
        open={open}
        onClick={(e) => setOpen(!open)}
        border={false}
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
      <h1>Accordion custom title</h1>
      <Accordion
        title={
          <div>
            <h3>Klikk her for å åpne/lukke panelet</h3>
            <code>Testcode: "123"</code>
          </div>
        }
        collapseProps={{ onRest }}
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
