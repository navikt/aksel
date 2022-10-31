import { InnholdsKort } from "./InnholdsKort";

export default {
  title: "Components/Cards",
  component: InnholdsKort,
};

const mockData = {
  _key: "eb522d23896b",
  _type: "innholdskort",
  body: [
    {
      _key: "86a3e733e9bb",
      _type: "block",
      children: [
        {
          _key: "5d65a8d0f1760",
          _type: "span",
          marks: [],
          text: "NAV gjør den vanskelige jobben slik at det blir enklere for meg. Jeg ser at de viser hele bredden av hva som tilbys samtidig som det prioriteres for meg og med meg. Jeg opplever empati, økt kunnskap, selvtillit og håp.",
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  lenke: "brukerinnsikt/prinsipp1",
  title: "3. NAV er min støttespiller",
};

export const InnholdsKortDemo = () => <InnholdsKort node={mockData as any} />;
