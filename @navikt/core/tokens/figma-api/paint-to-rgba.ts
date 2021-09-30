import { Paint } from "figma-api";

const parseColor = ({ color, opacity }: Paint) => {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255
  )}, ${Math.round(color.b * 255)}, ${opacity ?? 1})`;
};

export default parseColor;
