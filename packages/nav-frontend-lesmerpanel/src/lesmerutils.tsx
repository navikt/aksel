export function scrollTo(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  const supportsScrollBehavior =
    "scrollBehavior" in document.documentElement.style;
  const options: ScrollToOptions = {
    top: element.offsetTop,
    left: 0,
    behavior: "smooth",
  };

  if (supportsScrollBehavior) {
    window.scrollTo(options);
  } else {
    window.scrollTo(options.left!, options.top!);
  }
}

export function erSynligIViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
