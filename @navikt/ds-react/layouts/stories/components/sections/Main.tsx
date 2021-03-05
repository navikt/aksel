import * as React from "react";
import {
  Button,
  Cell,
  Grid,
  Heading,
  Link,
  Paragraph,
} from "../../../../index";
import Veilederpanel from "nav-frontend-veilederpanel";

export const MainHighlight = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"}>
        Quis autem
      </Heading>
    )}
    <Paragraph>
      Sed ullamcorper quam eget lorem volutpat, quis cursus risus fermentum.
      Quisque varius ornare nulla, ut condimentum sapien dapibus non. Nullam
      eget interdum nibh
    </Paragraph>
  </div>
);

export const Main = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"}>
        Quis autem
      </Heading>
    )}
    <Paragraph className={"section"}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.
    </Paragraph>
    <Grid className={"section"}>
      <Cell xs={6}>
        <Link href={"#"}>Ea voluptate</Link>
      </Cell>
      <Cell xs={6}>
        <Link href={"#"}>Quis autem</Link>
      </Cell>
    </Grid>
    <Paragraph className={"section"}>
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
      consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.{" "}
    </Paragraph>
    <Paragraph className={"section"}>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </Paragraph>
    <Heading level={2} size={"xl"}>
      Nulla pariatur?
    </Heading>
    <Paragraph className={"section"}>
      Etiam viverra neque sit amet libero dapibus tincidunt. Pellentesque quis
      imperdiet erat. Morbi sodales bibendum volutpat. Sed malesuada risus
      lorem, in elementum purus commodo eget. Mauris maximus congue efficitur.
      Cras vestibulum id metus sed pellentesque.
    </Paragraph>
    <table className={"section tabell tabell--stripet"}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fornavn</th>
          <th>Etternavn</th>
          <th>Rolle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Jean-Luc</td>
          <td>Picard</td>
          <td>Kaptein</td>
        </tr>
        <tr>
          <td>2</td>
          <td>William</td>
          <td>Riker</td>
          <td>Kommandør</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Geordi</td>
          <td>La Forge</td>
          <td>Sjefsingeniør</td>
        </tr>
      </tbody>
    </table>
    <Paragraph className={"section"}>
      Curabitur a purus pretium, condimentum magna ac, pellentesque diam. Nulla
      facilisi. Nullam consequat, dui sed bibendum faucibus, metus mauris
      commodo tortor, eget mollis nunc augue eu elit. Ut nec fringilla odio, eu
      scelerisque tellus.
    </Paragraph>
    <Paragraph className={"section"}>
      Proin nec luctus justo. Pellentesque et dapibus libero. Phasellus non elit
      eget justo mattis venenatis. In hac habitasse platea dictumst. Proin nunc
      ipsum, ornare eu pretium in, aliquet non velit. Nullam efficitur tincidunt
      leo, vel tempus nibh consectetur sed. Etiam porttitor finibus erat varius
      rhoncus. Sed ac augue imperdiet, porta tellus vitae, aliquam est.
    </Paragraph>
    <Paragraph className={"section"}>
      Nunc eget consectetur felis, id scelerisque sapien. Ut id feugiat nulla,
      ut cursus sem. In viverra felis vitae aliquet finibus.
    </Paragraph>
    <Button>Søk ...</Button>
  </div>
);

export const MainTwo = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"}>
        Quis autem
      </Heading>
    )}
    <Paragraph>
      Sed ullamcorper quam eget lorem volutpat, quis cursus risus fermentum.
      Quisque varius ornare nulla, ut condimentum sapien dapibus non. Nullam
      eget interdum nibh
    </Paragraph>
    <Veilederpanel svg={undefined}>
      In a ante sed nisl placerat pharetra nec eget ex.
    </Veilederpanel>
    <Paragraph>
      Cras tempor eros sed dapibus egestas. Curabitur bibendum quam quis lectus
      pretium lacinia. Nunc consequat ac augue quis laoreet. Donec porta, erat
      vitae blandit egestas, arcu metus pharetra nulla, et laoreet risus purus
      convallis turpis. Integer quis vehicula nulla, id ullamcorper urna.
      Integer rutrum imperdiet dolor, vel luctus nibh hendrerit id. Integer
      aliquam feugiat purus et imperdie
    </Paragraph>
  </div>
);

export const MainThree = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"}>
        Quis autem
      </Heading>
    )}
    <Paragraph>
      Sed ullamcorper quam eget lorem volutpat, quis cursus risus fermentum.
      Quisque varius ornare nulla, ut condimentum sapien dapibus non. Nullam
      eget interdum nibh
    </Paragraph>
    <Veilederpanel svg={undefined}>
      In a ante sed nisl placerat pharetra nec eget ex.
    </Veilederpanel>
    <Paragraph>
      Cras tempor eros sed dapibus egestas. Curabitur bibendum quam quis lectus
      pretium lacinia. Nunc consequat ac augue quis laoreet. Donec porta, erat
      vitae blandit egestas, arcu metus pharetra nulla, et laoreet risus purus
      convallis turpis. Integer quis vehicula nulla, id ullamcorper urna.
      Integer rutrum imperdiet dolor, vel luctus nibh hendrerit id. Integer
      aliquam feugiat purus et imperdie
    </Paragraph>
  </div>
);
