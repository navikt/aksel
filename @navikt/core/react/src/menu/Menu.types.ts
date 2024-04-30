import Floating from "../overlays/floating/Floating";

export type Point = { x: number; y: number };
export type Polygon = Point[];
export type SubMenuSide = "left" | "right";
export type GraceIntent = { area: Polygon; side: SubMenuSide };

export type CheckedState = boolean | "indeterminate";

export type MenuContentElementRef = React.ElementRef<typeof Floating.Content>;
