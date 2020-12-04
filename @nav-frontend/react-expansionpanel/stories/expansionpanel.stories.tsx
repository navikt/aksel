import React, { useState } from "react";
import Expansionpanel from "../src/index";

export default {
  title: "@nav-frontend/react-expansionpanel",
  component: Expansionpanel,
};

export const All = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Expansionpanel</h1>
      <Expansionpanel
        title="tittel"
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
      </Expansionpanel>
      <h1>Open</h1>
      <Expansionpanel title="tittel" open={true} onClick={(e) => null}>
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
      </Expansionpanel>
    </>
  );
};
