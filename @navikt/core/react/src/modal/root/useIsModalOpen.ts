import React, { useEffect } from "react";

function useIsModalOpen(modalRef: HTMLDialogElement | null) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (!modalRef) {
      return;
    }

    setIsOpen(modalRef.open); // eslint-disable-line react-hooks/set-state-in-effect

    const observer = new MutationObserver(() => {
      setIsOpen(modalRef.open);
    });

    observer.observe(modalRef, {
      attributes: true,
      attributeFilter: ["open"],
    });

    return () => {
      observer.disconnect();
    };
  }, [modalRef]);

  return isOpen;
}

export { useIsModalOpen };
