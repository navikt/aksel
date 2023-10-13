import { useFloatingPortalNode } from "@floating-ui/react";
import cl from "clsx";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useProvider } from "../provider";
import { Detail, Heading } from "../typography";
import { mergeRefs, useId } from "../util";
import ModalBody from "./ModalBody";
import { ModalContext } from "./ModalContext";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { getCloseHandler, useBodyScrollLock } from "./ModalUtils";
import dialogPolyfill, { needPolyfill } from "./dialog-polyfill";
import { ModalProps } from "./types";

interface ModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDialogElement>
  > {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

/**
 * A component that displays a modal dialog.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/modal)
 * @see 🏷️ {@link ModalProps}
 *
 * @example
 * State change with `useRef`
 * ```jsx
 * const ref = useRef<HTMLDialogElement>(null);
 * <Button onClick={() => ref.current?.showModal()}>Open modal</Button>
 * <Modal
 *   ref={ref}
 *   header={{
 *     label: "Optional label",
 *     icon: <FileIcon aria-hidden />,
 *     heading: "My heading",
 *   }}
 * >
 *   <Modal.Body>
 *     <BodyLong>Hello world</BodyLong>
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button>Save</Button>
 *     <Button type="button" variant="tertiary" onClick={() => ref.current?.close()}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 * @example
 * State change with `useState`
 * ```jsx
 * const [open, setOpen] = useState(false);
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   aria-labelledby="modal-heading"
 * >
 *   <Modal.Header>
 *     <Heading level="1" size="large" id="modal-heading">My heading</Heading>
 *   </Modal.Header>
 *   <Modal.Body>
 *     <BodyLong>Hello world</BodyLong>
 *   </Modal.Body>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      header,
      children,
      open,
      onBeforeClose,
      onCancel,
      width,
      portal,
      className,
      "aria-labelledby": ariaLabelledby,
      style,
      ...rest
    }: ModalProps,
    ref
  ) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const mergedRef = useMemo(() => mergeRefs([modalRef, ref]), [ref]);
    const ariaLabelId = useId();
    const rootElement = useProvider()?.rootElement;
    const portalNode = useFloatingPortalNode({ root: rootElement });

    if (useContext(ModalContext)) {
      console.error("Modals should not be nested");
    }

    useEffect(() => {
      // If using portal, modalRef.current will not be set before portalNode is set.
      // If not using portal, modalRef.current is available first.
      // We check both to avoid activating polyfill twice when not using portal.
      if (needPolyfill && modalRef.current && portalNode) {
        dialogPolyfill.registerDialog(modalRef.current);
      }
    }, [modalRef, portalNode]);

    useEffect(() => {
      // We need to have this in a useEffect so that the content renders before the modal is displayed,
      // and in case `open` is true initially.
      // We need to check both modalRef.current and portalNode to make sure the polyfill has been activated.
      if (modalRef.current && portalNode && open !== undefined) {
        if (open && !modalRef.current.open) {
          modalRef.current.showModal();
        } else if (!open && modalRef.current.open) {
          modalRef.current.close();
        }
      }
    }, [modalRef, portalNode, open]);

    useBodyScrollLock(modalRef, portalNode);

    const isWidthPreset =
      typeof width === "string" && ["small", "medium"].includes(width);

    const component = (
      <dialog
        {...rest}
        ref={mergedRef}
        className={cl("navds-modal", className, {
          "navds-modal--polyfilled": needPolyfill,
          "navds-modal--autowidth": !width,
          [`navds-modal--${width}`]: isWidthPreset,
        })}
        style={{
          ...style,
          ...(!isWidthPreset ? { width } : {}),
        }}
        onCancel={(event) => {
          // FYI: onCancel fires when you press Esc
          if (onBeforeClose && onBeforeClose() === false) {
            event.preventDefault();
          } else if (onCancel) onCancel(event);
        }}
        aria-labelledby={
          !ariaLabelledby && !rest["aria-label"] && header
            ? ariaLabelId
            : ariaLabelledby
        }
      >
        <ModalContext.Provider
          value={{
            closeHandler: getCloseHandler(modalRef, header, onBeforeClose),
          }}
        >
          {header && (
            <ModalHeader>
              {header.label && (
                <Detail className="navds-modal__label">{header.label}</Detail>
              )}
              <Heading
                size={header.size ?? "medium"}
                level="1"
                id={ariaLabelId}
              >
                <span className="navds-modal__header-icon">{header.icon}</span>
                {header.heading}
              </Heading>
            </ModalHeader>
          )}

          {children}
        </ModalContext.Provider>
      </dialog>
    );

    if (portal) {
      if (portalNode) return createPortal(component, portalNode);
      return null;
    }
    return component;
  }
) as ModalComponent;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
