export interface Positioned {
  horizontalPosition: number;
  direction: "left" | "right";
}

export const isVisible = ({ horizontalPosition }: Positioned): boolean =>
  horizontalPosition <= 100 && horizontalPosition >= 0;
