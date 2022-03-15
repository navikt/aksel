import { Link } from "@navikt/ds-icons";
import React, { useState } from "react";
import { ReadMore } from ".";

export default {
  title: "ds-react/read-more",
  component: ReadMore,
};

export const All = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Read more</h1>
      <h2>Controlled</h2>
      <ReadMore
        open={open}
        onClick={() => setOpen(!open)}
        header="ReadMore header text"
      >
        Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
        officia laboris voluptate officia pariatur.Lorem est ex anim velit
        occaecat nisi qui nostrud sit consectetur consectetur officia nostrud
        ullamco. Est ex duis proident nostrud elit qui laborum anim minim eu
        eiusmod. Veniam in nostrud sunt tempor velit incididunt sint ex dolor
        qui velit id eu. <Link>Deserunt magna sunt velit in</Link>. Est
        exercitation id cillum qui do. Minim adipisicing nostrud commodo
        proident occaecat aliquip nulla anim proident reprehenderit. Magna ipsum
        officia veniam cupidatat duis veniam dolore reprehenderit mollit
        velit.Ut consequat commodo minim occaecat id pariatur. Nisi enim tempor
        laborum commodo. Tempor sit quis nostrud eu cupidatat sunt commodo
        reprehenderit irure deserunt eiusmod ipsum. Exercitation quis commodo
        cillum eiusmod eiusmod. Do laborum qui proident commodo adipisicing
        eiusmod id.
      </ReadMore>
      <h2>Un-controlled</h2>
      <ReadMore header="ReadMore header text">
        Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
        officia laboris voluptate officia pariatur.Lorem est ex anim velit
        occaecat nisi qui nostrud sit consectetur consectetur officia nostrud
        ullamco. Est ex duis proident nostrud elit qui laborum anim minim eu
        eiusmod. Veniam in nostrud sunt tempor velit incididunt sint ex dolor
        qui velit id eu. Deserunt magna sunt velit in. Est exercitation id
        cillum qui do. Minim adipisicing nostrud commodo proident occaecat
        aliquip nulla anim proident reprehenderit. Magna ipsum officia veniam
        cupidatat duis veniam dolore reprehenderit mollit velit.Ut consequat
        commodo minim occaecat id pariatur. Nisi enim tempor laborum commodo.
        Tempor sit quis nostrud eu cupidatat sunt commodo reprehenderit irure
        deserunt eiusmod ipsum. Exercitation quis commodo cillum eiusmod
        eiusmod. Do laborum qui proident commodo adipisicing eiusmod id.
      </ReadMore>
      <h2>Default open</h2>
      <ReadMore header="ReadMore header text" defaultOpen>
        Body
      </ReadMore>
    </>
  );
};
