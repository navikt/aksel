import Floating from "../floating/Floating";

export type MenuContentType = React.ElementRef<typeof Floating.Content>;

export type Point = { x: number; y: number };
export type Polygon = Point[];
export type SubmenuSide = "left" | "right";
export type GraceIntent = { area: Polygon; submenuSide: SubmenuSide };
