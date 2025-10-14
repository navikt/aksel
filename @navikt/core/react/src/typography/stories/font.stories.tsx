import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

interface FontProps {
  weight: (typeof fontWeights)[number];
  family: "Source Sans Pro" | "Source Sans 3";
  cyrillic?: boolean;
  samisk?: boolean;
  showDefault?: boolean;
  mixed?: boolean;
  italic?: boolean;
}

const lorem =
  "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const cyrillicAlphabet =
  "А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я";

const samisk = "á c č đ h i ŋ o š ŧ u z ž";

function seededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const shuffle = () => {
  const array = (lorem + cyrillicAlphabet + samisk).split("");
  const random = seededRandom(99);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};

const FontComponent = ({ showDefault = true, ...props }: FontProps) => {
  return (
    <div
      style={{
        fontWeight: props.weight,
        fontFamily: props.family,
        fontStyle: props.italic ? "italic" : undefined,
      }}
    >
      {showDefault && (
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      )}
      {props?.cyrillic && (
        <>
          <h3>cyrillic</h3>
          <p>{cyrillicAlphabet}</p>
        </>
      )}
      {props?.samisk && (
        <>
          <h3>samisk</h3>
          <p>{samisk}</p>
        </>
      )}
      {props?.mixed && (
        <>
          <h3>mixed</h3>
          <p>{shuffle()}</p>
        </>
      )}
    </div>
  );
};

const meta: Meta<typeof FontComponent> = {
  title: "ds-react/Typography/Font",
  component: FontComponent,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof FontComponent>;

export const Default: Story = {
  args: {
    weight: 400,
    family: "Source Sans 3",
    cyrillic: true,
    samisk: true,
    mixed: true,
    italic: false,
  },
};

export const Italic: Story = {
  args: {
    weight: 400,
    family: "Source Sans 3",
    cyrillic: true,
    samisk: true,
    mixed: true,
    italic: true,
  },
};

export const Cyrillic: Story = {
  args: {
    weight: 400,
    family: "Source Sans 3",
    cyrillic: true,
    showDefault: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Samisk: Story = {
  args: {
    weight: 400,
    family: "Source Sans 3",
    samisk: true,
    showDefault: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const Mixed: Story = {
  args: {
    weight: 400,
    family: "Source Sans 3",
    showDefault: false,
    mixed: true,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const FontWeight: Story = {
  render: () => {
    return (
      <>
        {fontWeights.map((weight) => (
          <React.Fragment key={weight}>
            <h2>{weight}</h2>
            <FontComponent
              key={weight}
              weight={weight}
              family="Source Sans 3"
            />
          </React.Fragment>
        ))}
      </>
    );
  },
};

export const FontFamily: Story = {
  render: (args) => {
    return (
      <>
        <h2>Source Sans Pro</h2>
        <FontComponent weight={args.weight} family="Source Sans Pro" mixed />
        <h2>Source Sans 3</h2>
        <FontComponent weight={args.weight} family="Source Sans 3" mixed />
      </>
    );
  },
  args: {
    weight: 400,
  },
};
