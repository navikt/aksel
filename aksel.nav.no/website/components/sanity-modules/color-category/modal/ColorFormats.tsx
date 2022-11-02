import { SanityT } from "@/lib";
import { BodyShort } from "@navikt/ds-react";
import Color from "color";
import CopyButton from "../../code/CopyButton";

const format = (
  val: "hex" | "rgb" | "cmyk" | "hsla",
  color: SanityT.Schema.ds_color
) => {
  switch (val) {
    case "hex":
      return Color(color.color_value).hex().toString();
    case "rgb":
      return Color(color.color_value).rgb().toString();
    case "hsla":
      return Color(color.color_value).hsl().round().toString();
    default:
      return color.color_value;
  }
};

const ColorFormats = ({ color }: { color: SanityT.Schema.ds_color }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="bg-canvas-background relative h-24 w-52">
        <BodyShort className="p-4" size="small">
          HEX:
        </BodyShort>
        <CopyButton content={format("hex", color)} inverted />
        <code className="text-medium absolute bottom-4 left-4">
          {format("hex", color)}
        </code>
      </div>
      <div className="bg-canvas-background relative h-24 w-52">
        <BodyShort className="p-4" size="small">
          RGB:
        </BodyShort>
        <CopyButton content={format("rgb", color)} inverted />
        <code className="text-medium absolute bottom-4 left-4">
          {format("rgb", color)}
        </code>
      </div>
      <div className="bg-canvas-background relative h-24 w-52">
        <BodyShort className="p-4" size="small">
          HSL:
        </BodyShort>
        <CopyButton content={format("hsla", color)} inverted />
        <code className="text-medium absolute bottom-4 left-4">
          {format("hsla", color)}
        </code>
      </div>
    </div>
  );
};

export default ColorFormats;
