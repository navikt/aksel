import { Dispatch, SetStateAction, useState } from "react";

export type VirtualFocusType = {
  activeElement: HTMLElement | undefined;
  getElementById: (id: string) => HTMLElement | undefined;
  isFocusOnTheTop: boolean;
  isFocusOnTheBottom: boolean;
  setIndex: Dispatch<SetStateAction<number>>;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
  moveFocusToElement: (id: string) => void;
  moveFocusToTop: () => void;
  moveFocusToBottom: () => void;
};

const useVirtualFocus = (
  containerRef: HTMLElement | null,
): VirtualFocusType => {
  const [index, setIndex] = useState(-1);

  const listOfAllChildren: Array<HTMLElement> = containerRef?.children
    ? Array.prototype.slice.call(containerRef?.children)
    : [];
  const elementsAbleToReceiveFocus = listOfAllChildren.filter(
    (child) => child.getAttribute("data-no-focus") !== "true",
  );

  const activeElement = elementsAbleToReceiveFocus[index];
  const getElementById = (id: string) =>
    listOfAllChildren.find((element) => element.id === id);
  const isFocusOnTheTop = index === 0;
  const isFocusOnTheBottom = index === elementsAbleToReceiveFocus.length - 1;

  const scrollToOption = (newIndex: number) => {
    const indexOfElementToScrollTo = Math.min(
      Math.max(newIndex, 0),
      containerRef?.children.length || 0,
    );
    if (containerRef?.children[indexOfElementToScrollTo]) {
      const child = containerRef.children[indexOfElementToScrollTo];
      const { top, bottom } = child.getBoundingClientRect();
      const parentRect = containerRef.getBoundingClientRect();
      if (top < parentRect.top || bottom > parentRect.bottom) {
        child.scrollIntoView({ block: "nearest" });
      }
    }
  };

  const _moveFocusAndScrollTo = (_index: number) => {
    setIndex(_index);
    scrollToOption(_index);
  };
  const moveFocusUp = () => _moveFocusAndScrollTo(Math.max(index - 1, -1));
  const moveFocusDown = () =>
    _moveFocusAndScrollTo(
      Math.min(index + 1, elementsAbleToReceiveFocus.length - 1),
    );
  const moveFocusToTop = () => _moveFocusAndScrollTo(-1);
  const moveFocusToBottom = () =>
    _moveFocusAndScrollTo(elementsAbleToReceiveFocus.length - 1);
  const moveFocusToElement = (id: string) => {
    const thisElement = elementsAbleToReceiveFocus.find(
      (_element) => _element.getAttribute("id") === id,
    );
    const indexOfElement = thisElement
      ? elementsAbleToReceiveFocus.indexOf(thisElement)
      : -1;
    if (indexOfElement >= 0) {
      setIndex(indexOfElement);
    }
  };

  return {
    activeElement,
    getElementById,
    isFocusOnTheTop,
    isFocusOnTheBottom,
    setIndex,
    moveFocusUp,
    moveFocusDown,
    moveFocusToElement,
    moveFocusToTop,
    moveFocusToBottom,
  };
};

export default useVirtualFocus;
