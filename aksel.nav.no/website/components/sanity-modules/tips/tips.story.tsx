import Tips from "./index";
import { SanityT } from "@/lib";

export default {
  title: "Components/Tips",
  component: Tips,
};

const mockData: SanityT.Schema.tips & { _key: string } = {
  _key: "eb522d23896b",
  _type: "tips",
  body: [
    {
      _key: "86a3e733e9bb",
      _type: "block",
      children: [
        {
          _key: "5d65a8d0f1760",
          _type: "span",
          marks: [],
          text: "Cupidatat nostrud occaecat incididunt elit adipisicing consequat eu ex anim qui officia mollit.",
        },
        {
          _key: "5d65a8d0f1760",
          _type: "span",
          marks: [],
          text: "Sint incididunt non incididunt ipsum ad esse officia.",
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  eksperiment: false,
};

export const TipsDemo = () => <Tips node={mockData as any} />;
export const TipsDemoAksel = () => (
  <div className="aksel-artikkel bg-surface-subtle">
    <Tips node={mockData as any} />
  </div>
);

export const TipsDemoExperiment = () => (
  <Tips node={{ ...mockData, eksperiment: true } as any} />
);
