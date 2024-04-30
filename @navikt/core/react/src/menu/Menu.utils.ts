import type { CheckedState, Point, Polygon } from "./Menu.types";

export {
  whenMouse,
  isPointerInGraceArea,
  getCheckedState,
  isIndeterminate,
  getOpenState,
};

function getOpenState(open: boolean) {
  return open ? "open" : "closed";
}

function isIndeterminate(checked?: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate";
}

function getCheckedState(checked: CheckedState) {
  return isIndeterminate(checked)
    ? "indeterminate"
    : checked
      ? "checked"
      : "unchecked";
}

/**
 * Determine if a point is inside of a polygon.
 */
function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    // prettier-ignore
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

function isPointerInGraceArea(event: React.PointerEvent, area?: Polygon) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}

function whenMouse<E>(
  handler: React.PointerEventHandler<E>,
): React.PointerEventHandler<E> {
  return (event) =>
    event.pointerType === "mouse" ? handler(event) : undefined;
}
