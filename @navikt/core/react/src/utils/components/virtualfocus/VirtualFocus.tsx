import React, { useState } from "react";
import { useId } from "../../../utils-external";
import {
  VirtualFocusDescendantsProvider,
  VirtualFocusInternalContextProvider,
  useVirtualFocusDescendantInitializer,
} from "./Context";
import { VirtualFocusAnchor } from "./parts/VirtualFocusAnchor";
import { VirtualFocusContent } from "./parts/VirtualFocusContent";
import { VirtualFocusItem } from "./parts/VirtualFocusItem";

type VirtualFocusProps = {
  children: React.ReactNode;
  /**
   * Whether to cause focus to loop around when it hits the first or last element
   * @default false
   **/
  loop?: boolean;
};

/**
 * A component that manages a virtual focus using the 'up' and 'down'
 * arrow keys as well as selection with 'Return'.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/virtualfocus)
 * @see 🏷️ {@link AccordionProps}
 *
 * @example
 * ```jsx
 * <VirtualFocus>
 *   <VirtualFocus.Anchor
 *     role="combobox"
 *     onSelect={() => {
 *       console.log("you selected the anchor");
 *     }}
 *     onActive={() => {
 *       console.log("the anchor is now virtually focused");
 *     }}
 *   >
 *     <input type="text" />
 *   </VirtualFocus.Anchor>
 *   <VirtualFocus.Content>
 *     <VirtualFocus.Item
 *       onSelect={() => {
 *         console.log("you selected the item");
 *       }}
 *       onActive={() => {
 *         console.log("the item is now virtually focused");
 *       }}
 *     >
 *       <p>item 1</p>
 *     </VirtualFocus.Item>
 *     <VirtualFocus.Item
 *       onSelect={() => {
 *         console.log("you selected the item");
 *       }}
 *       onActive={() => {
 *         console.log("the item is now virtually focused");
 *       }}
 *     >
 *       <p>item 2</p>
 *     </VirtualFocus.Item>
 *   </VirtualFocus.Content>
 * </VirtualFocus>
 * ```
 */
export const VirtualFocus = ({ children, loop = false }: VirtualFocusProps) => {
  const descendants = useVirtualFocusDescendantInitializer();
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);

  return (
    <VirtualFocusInternalContextProvider
      virtualFocusIdx={virtualFocusIdx}
      setVirtualFocusIdx={setVirtualFocusIdx}
      loop={loop}
      uniqueId={useId()}
    >
      <VirtualFocusDescendantsProvider value={descendants}>
        {children}
      </VirtualFocusDescendantsProvider>
    </VirtualFocusInternalContextProvider>
  );
};

VirtualFocus.Anchor = VirtualFocusAnchor;
VirtualFocus.Item = VirtualFocusItem;
VirtualFocus.Content = VirtualFocusContent;

export default VirtualFocus;
