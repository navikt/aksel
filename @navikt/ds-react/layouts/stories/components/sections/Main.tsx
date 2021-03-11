import * as React from "react";
import {
  Button,
  Cell,
  Grid,
  Heading,
  Link,
  Paragraph,
} from "../../../../index";
import Snakkeboble from "nav-frontend-snakkeboble";

export const Main = ({ title = true }) => (
  <>
    <MainOne title={title} />
    <MainTwo title={title} />
    <MainThree title={title} />
  </>
);

export const MainOne = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"} id={"leo-quis"}>
        Leo quis
      </Heading>
    )}
    <Paragraph>
      Sed ullamcorper quam eget lorem volutpat, quis cursus risus fermentum.
      Quisque varius ornare nulla, ut condimentum sapien dapibus non. Nullam
      eget interdum nibh
    </Paragraph>
  </div>
);

export const MainTwo = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"} id={"proin-accumsan"}>
        Proin accumsan
      </Heading>
    )}
    <Paragraph className={"section"}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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
      consectetur, adipisci velit, sed quia non numquam eius modi tempora.
    </Paragraph>
    <Heading level={2} size={"large"} id={"nulla-pariatur"}>
      Nulla pariatur?
    </Heading>
    <Paragraph className={"section"}>
      Etiam viverra neque sit amet libero dapibus tincidunt. Pellentesque quis
      imperdiet erat. Morbi sodales bibendum volutpat.
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
      commodo tortor.
    </Paragraph>
    <Heading level={2} size={"large"} id={"luctus-justo"}>
      Luctus justo
    </Heading>
    <Paragraph className={"section"}>
      Nunc eget consectetur felis, id scelerisque sapien. Ut id feugiat nulla,
      ut cursus sem. In viverra felis vitae aliquet finibus.
    </Paragraph>
    <Button>Søk ...</Button>
  </div>
);

export const MainThree = ({ title = true }) => (
  <div>
    {title && (
      <Heading level={1} size={"xl"} id={"maecenas-in-pretium"}>
        Maecenas in pretium
      </Heading>
    )}
    <Paragraph>
      Sed ullamcorper quam eget lorem volutpat, quis cursus risus fermentum.
      Quisque varius ornare nulla, ut condimentum sapien dapibus non. Nullam
      eget interdum nibh
    </Paragraph>
    <Snakkeboble>Integer aliquam feugiat purus et imperdie</Snakkeboble>
    <Paragraph>
      Cras tempor eros sed dapibus egestas. Curabitur bibendum quam quis lectus
      pretium lacinia. Nunc consequat ac augue quis laoreet. Donec porta, erat
      vitae blandit egestas, arcu metus pharetra nulla, et laoreet risus purus
      convallis turpis.
    </Paragraph>
    <Snakkeboble pilHoyre={true}>
      Integer aliquam feugiat purus et imperdie
    </Snakkeboble>
    <Paragraph>
      Suspendisse potenti. Praesent at elit interdum, porttitor sem eget,
      blandit dolor.
    </Paragraph>
  </div>
);
