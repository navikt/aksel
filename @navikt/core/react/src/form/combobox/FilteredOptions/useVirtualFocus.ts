import { useState } from "react";

export type VirtualFocusType = {
  activeElement: HTMLElement | undefined;
  getElementById: (id: string) => HTMLElement | undefined;
  isFocusOnTheTop: () => boolean;
  isFocusOnTheBottom: () => boolean;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
  moveFocusToElement: (id: string) => void;
  moveFocusToTop: () => void;
  moveFocusToBottom: () => void;
};

const useVirtualFocus = (
  containerRef: HTMLElement | null,
): VirtualFocusType => {
  const [activeElement, setActiveElement] = useState<HTMLElement | undefined>(
    undefined,
  );

  const getListOfAllChildren = (): HTMLElement[] =>
    Array.from(containerRef?.children ?? []) as HTMLElement[];
  const getElementsAbleToReceiveFocus = () =>
    getListOfAllChildren().filter(
      (child) => child.getAttribute("data-no-focus") !== "true",
    );

  const getElementById = (id: string) =>
    getListOfAllChildren().find((element) => element.id === id);
  const isFocusOnTheTop = () =>
    activeElement
      ? getElementsAbleToReceiveFocus().indexOf(activeElement) === 0
      : false;
  const isFocusOnTheBottom = () => {
    const elementsAbleToReceiveFocus = getElementsAbleToReceiveFocus();
    return activeElement
      ? elementsAbleToReceiveFocus.indexOf(activeElement) ===
          elementsAbleToReceiveFocus.length - 1
      : false;
  };

  const _moveFocusAndScrollTo = (_element?: HTMLElement) => {
    setActiveElement(_element);
    _element?.scrollIntoView?.({ block: "nearest" });
  };

  const moveFocusUp = () => {
    if (!activeElement) {
      return;
    }
    const elementsAbleToReceiveFocus = getElementsAbleToReceiveFocus();
    const _currentIndex = elementsAbleToReceiveFocus.indexOf(activeElement);
    const elementAbove = elementsAbleToReceiveFocus[_currentIndex - 1];
    if (_currentIndex === 0) {
      setActiveElement(undefined);
    } else {
      _moveFocusAndScrollTo(elementAbove);
    }
  };

  const moveFocusDown = () => {
    const elementsAbleToReceiveFocus = getElementsAbleToReceiveFocus();
    if (!activeElement) {
      _moveFocusAndScrollTo(elementsAbleToReceiveFocus[0]);
      return;
    }
    const _currentIndex = elementsAbleToReceiveFocus.indexOf(activeElement);
    if (_currentIndex === elementsAbleToReceiveFocus.length - 1) {
      return;
    }

    _moveFocusAndScrollTo(elementsAbleToReceiveFocus[_currentIndex + 1]);
  };

  const moveFocusToTop = () => _moveFocusAndScrollTo(undefined);
  const moveFocusToBottom = () => {
    const elementsAbleToReceiveFocus = getElementsAbleToReceiveFocus();
    return _moveFocusAndScrollTo(
      elementsAbleToReceiveFocus[elementsAbleToReceiveFocus.length - 1],
    );
  };
  const moveFocusToElement = (id: string) => {
    const _element = getElementsAbleToReceiveFocus().find(
      (_focusableElement) => _focusableElement.getAttribute("id") === id,
    );
    if (_element) {
      setActiveElement(_element);
    }
  };

  return {
    activeElement,
    getElementById,
    isFocusOnTheTop,
    isFocusOnTheBottom,
    moveFocusUp,
    moveFocusDown,
    moveFocusToElement,
    moveFocusToTop,
    moveFocusToBottom,
  };
};

export default useVirtualFocus;
