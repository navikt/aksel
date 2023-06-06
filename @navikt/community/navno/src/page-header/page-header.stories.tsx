import { PageHeader } from ".";

export default {
  title: "ds-navno/PageHeader",
  component: PageHeader,
  argTypes: {
    variant: {
      defaultValue: "var1",
      control: {
        type: "radio",
        options: ["var1", "var1"],
      },
    },
  },
};
