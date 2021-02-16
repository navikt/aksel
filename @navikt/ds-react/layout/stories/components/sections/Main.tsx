import * as React from "react";
import { Heading } from "../../../../lib/typography/src";
import { Normaltekst } from "nav-frontend-typografi";
import { Cell, Grid } from "../../../../grid/src";
import Lenke from "nav-frontend-lenker";
import Snakkeboble from "nav-frontend-snakkeboble";
import { Button } from "../../../../lib";

export const Main = () => (
  <div>
    <Heading className={"section"} level={1} size={"xl"}>
      Quis autem
    </Heading>
    <Normaltekst className={"section"}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.{" "}
    </Normaltekst>
    <Normaltekst className={"section"}>
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
      consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.{" "}
    </Normaltekst>
    <Grid className={"section"}>
      <Cell xs={6}>
        <Lenke href={"#"}>Ea voluptate</Lenke>
      </Cell>
      <Cell xs={6}>
        <Lenke href={"#"}>Quis autem</Lenke>
      </Cell>
    </Grid>
    <Normaltekst className={"section"}>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </Normaltekst>
    <Snakkeboble className={"section"}>
      Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in
      faucibus.
    </Snakkeboble>
    <Normaltekst className={"section"}>
      Etiam viverra neque sit amet libero dapibus tincidunt. Pellentesque quis
      imperdiet erat. Morbi sodales bibendum volutpat. Sed malesuada risus
      lorem, in elementum purus commodo eget. Mauris maximus congue efficitur.
      Cras vestibulum id metus sed pellentesque. Curabitur a purus pretium,
      condimentum magna ac, pellentesque diam. Nulla facilisi. Nullam consequat,
      dui sed bibendum faucibus, metus mauris commodo tortor, eget mollis nunc
      augue eu elit. Ut nec fringilla odio, eu scelerisque tellus.
    </Normaltekst>
    <Snakkeboble className={"section"} pilHoyre={true}>
      Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </Snakkeboble>
    <Normaltekst className={"section"}>
      Proin nec luctus justo. Pellentesque et dapibus libero. Phasellus non elit
      eget justo mattis venenatis. In hac habitasse platea dictumst. Proin nunc
      ipsum, ornare eu pretium in, aliquet non velit. Nullam efficitur tincidunt
      leo, vel tempus nibh consectetur sed. Etiam porttitor finibus erat varius
      rhoncus. Sed ac augue imperdiet, porta tellus vitae, aliquam est.
    </Normaltekst>
    <Normaltekst className={"section"}>
      Nunc eget consectetur felis, id scelerisque sapien. Ut id feugiat nulla,
      ut cursus sem. In viverra felis vitae aliquet finibus. Praesent congue,
      est sed laoreet eleifend, massa diam bibendum nibh, id mattis ex tortor et
      nulla. Quisque vel malesuada ante, et pharetra erat. Morbi imperdiet ex
      non est pharetra, at vulputate mi eleifend. Proin pulvinar nec libero at
      interdum. Nunc ut tempor mi. Pellentesque lectus elit, vehicula quis
      tristique vel, pretium vitae elit.
    </Normaltekst>

    <Button>Søk ...</Button>
  </div>
);
