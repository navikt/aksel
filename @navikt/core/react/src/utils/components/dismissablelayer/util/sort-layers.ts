type DismissableLayerElement = HTMLDivElement;

/**
 * Returns an array of layers sorted such that parents appear before their children.
 *
 * **Why**:
 * - mount order for parent-child relationships is unstable due to portals
 * - event handling relies on parents being before children in the array
 *
 * This function ensures that for any parent-child relationship, the parent layer
 * will always appear before its child layer in the returned array,
 * resulting in consistent behavior.
 *
 * @param layers - A set of DismissableLayerElements to be sorted.
 * @param branchedLayers - A map where each key is a parent layer and its value is a set of child layers.
 * @returns An array of DismissableLayerElements sorted by parent-child relationships.
 */
function getSortedLayers(
  layers: Set<DismissableLayerElement>,
  branchedLayers: Map<DismissableLayerElement, Set<DismissableLayerElement>>,
): DismissableLayerElement[] {
  const sorted: DismissableLayerElement[] = [];
  const visited = new Set<DismissableLayerElement>();
  const parentMap = new Map<DismissableLayerElement, DismissableLayerElement>();

  branchedLayers.forEach((children, parent) => {
    children.forEach((child) => {
      if (child !== parent) {
        parentMap.set(child, parent);
      }
    });
  });

  const walk = (layer: DismissableLayerElement) => {
    if (visited.has(layer)) {
      return;
    }

    const parent = parentMap.get(layer);
    if (parent && !visited.has(parent)) {
      walk(parent);
      if (visited.has(layer)) {
        return;
      }
    }

    visited.add(layer);
    sorted.push(layer);

    const children = branchedLayers.get(layer);
    if (children) {
      children.forEach(walk);
    }
  };

  layers.forEach(walk);

  return sorted;
}

export { getSortedLayers };
