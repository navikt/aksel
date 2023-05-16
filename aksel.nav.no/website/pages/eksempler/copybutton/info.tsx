import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Hr />
      <Row text="Addresse 1:"> Osloveien 99, 0111 Oslo</Row>
      <Row text="Addresse 2:"> Bergenveien 99, 2233 Bergen</Row>
      <Row text="Telefon:">4040404040</Row>
      <Row text="E-mail:">nav@naversen.no</Row>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "Ved utlisting av mye relevant innhold, kan CopyButton brukes for å enklere kopiere informasjonen.",
};

const Hr = () => (
  <span className="border-t-1 border-t-border-divider my-1 w-full" />
);

const Row = ({ children, text }: any) => (
  <>
    <div className="grid grid-cols-[1fr_4fr_auto] items-center gap-2">
      <span>{text}</span>
      <span>{children}</span>
      <CopyButton size="small" copyText={children} />
    </div>
    <Hr />
  </>
);
