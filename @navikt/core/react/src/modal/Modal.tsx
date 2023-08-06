import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import cl from "clsx";
import ReactModal from "react-modal";

import { Button, mergeRefs, useProvider } from "..";
import ModalContent, { ModalContentType } from "./ModalContent";
import { XMarkIcon } from "@navikt/aksel-icons";

export interface ModalProps {
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Open state for modal
   */
  open: boolean;
  /**
   * Callback for modal wanting to close
   */
  onClose: () => void;
  /**
   * If modal should close on overlay click (click outside Modal)
   * @default true
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * User defined classname for modal
   */
  className?: string;
  /**
   * User defined classname for modal
   */
  overlayClassName?: string;
  /**
   * Removes close-button(X) when false
   * @default true
   */
  closeButton?: boolean;
  /**
   *
   */
  shouldCloseOnEsc?: boolean;
  /**
   * Allows custom styling of ReactModal, in accordance with their typing
   */
  style?: ReactModal.Styles;
  /**
   * Callback for setting parent element modal will attach to
   */
  parentSelector?(): HTMLElement;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-modal"?: boolean;
  /**
   * Sets aria-label on modal
   * @warning This should be set if not using 'aria-labelledby' or 'aria-describedby'
   */
  "aria-label"?: string;
}

interface ModalComponent
  extends ModalLifecycle,
    React.ForwardRefExoticComponent<
      ModalProps & React.RefAttributes<ReactModal>
    > {
  Content: ModalContentType;
}

type ModalLifecycle = {
  setAppElement: (element: any) => void;
};

/**
 * A component that displays a modal dialog.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/modal)
 * @see 🏷️ {@link ModalProps}
 *
 * @example
 * ```jsx
 * const [open, setOpen] = useState(false);
 *
 * <Modal
 *   open={open}
 *   aria-label="Modal demo"
 *   onClose={() => setOpen((x) => !x)}
 *   aria-labelledby="modal-heading"
 * >
 *   <Modal.Content>
 *     <Heading spacing level="1" size="large" id="modal-heading">
 *       Viktig info
 *     </Heading>
 *     <BodyLong spacing>
 *       Hallo!
 *     </BodyLong>
 *   </Modal.Content>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<ReactModal, ModalProps>(
  (
    {
      children,
      open,
      onClose,
      className,
      overlayClassName,
      shouldCloseOnOverlayClick = true,
      shouldCloseOnEsc = true,
      closeButton = true,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      "aria-modal": ariaModal,
      "aria-label": contentLabel,
      style,
      parentSelector,
      ...rest
    },
    ref
  ) => {
    const modalRef = useRef<ReactModal | null>(null);
    const mergedRef = useMemo(() => mergeRefs([modalRef, ref]), [ref]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rootElement = useProvider()?.rootElement;
    const appElement = useProvider()?.appElement;

    useEffect(() => {
      appElement && Modal.setAppElement(appElement);
    }, [appElement]);

    const onModalCloseRequest = (e) => {
      if (shouldCloseOnOverlayClick || e.type === "keydown") {
        onClose();
      } else if (buttonRef.current) {
        buttonRef.current.focus();
      }
    };

    const getParentSelector = () => {
      if (parentSelector) {
        return parentSelector;
      }
      return rootElement !== undefined
        ? () => rootElement as HTMLElement
        : undefined;
    };

    return (
      <ReactModal
        {...rest}
        parentSelector={getParentSelector()}
        style={style}
        isOpen={open}
        ref={mergedRef}
        className={cl("navds-modal", className)}
        overlayClassName={cl("navds-modal__overlay", overlayClassName)}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        shouldCloseOnEsc={shouldCloseOnEsc}
        onRequestClose={(e) => onModalCloseRequest(e)}
        aria={{
          describedby: ariaDescribedBy,
          labelledby: ariaLabelledBy,
          modal: ariaModal,
        }}
        contentLabel={contentLabel}
      >
        {children}
        {closeButton && (
          <Button
            className={cl("navds-modal__button", {
              "navds-modal__button--shake": shouldCloseOnOverlayClick,
            })}
            size="small"
            variant="tertiary-neutral"
            ref={buttonRef}
            onClick={onClose}
            icon={<XMarkIcon title="Lukk modalvindu" />}
          />
        )}
      </ReactModal>
    );
  }
) as ModalComponent;

Modal.setAppElement = (element) => ReactModal.setAppElement(element);
Modal.Content = ModalContent;

export default Modal;
