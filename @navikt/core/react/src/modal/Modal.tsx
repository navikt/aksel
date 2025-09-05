import { useFloatingPortalNode } from "@floating-ui/react";
import React, { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDateInputContext } from "../date/Date.Input";
import { useProvider } from "../provider/Provider";
import { useRenameCSS } from "../theme/Theme";
import { Detail, Heading } from "../typography";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useId } from "../util/hooks";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
import { ModalContextProvider, useModalContext } from "./Modal.context";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import {
  MouseCoordinates,
  coordsAreInside,
  getCloseHandler,
  useBodyScrollLock,
} from "./ModalUtils";
import dialogPolyfill, { needPolyfill } from "./dialog-polyfill";
import { ModalProps } from "./types";

interface ModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDialogElement>
  > {
  Root: React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDialogElement>
  >;
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
      closeOnBackdropClick,
      width,
      placement,
      portal,
      className,
      "aria-labelledby": ariaLabelledby,
      style,
      onClick,
      onMouseDown,
      ...rest
    }: ModalProps,
    ref,
  ) => {
    const { cn } = useRenameCSS();

    const polyfillClassName = useRef(cn("navds-modal--polyfilled"));

    const modalRef = useRef<HTMLDialogElement>(null);
    const mergedRef = useMergeRefs(modalRef, ref);

    const ariaLabelId = useId();
    const rootElement = useProvider()?.rootElement;
    const portalNode = useFloatingPortalNode({ root: rootElement });

    const dateContext = useDateInputContext(false);
    const isNested = useModalContext(false) !== undefined;
    if (isNested && !dateContext) {
      console.error("Modals should not be nested");
    }

    useEffect(() => {
      // If using portal, modalRef.current will not be set before portalNode is set.
      // If not using portal, modalRef.current is available first.
      // We check both to avoid activating polyfill twice when not using portal.
      if (needPolyfill && modalRef.current && portalNode) {
        dialogPolyfill.registerDialog(modalRef.current);

        // Force-add the "polyfilled" class in case of SSR (needPolyfill will always be false on the server)
        modalRef.current.classList.add(polyfillClassName.current);
      }
      // We set autofocus on the dialog element to prevent the default behavior where first focusable element gets focus when modal is opened.
      // This is mainly to fix an edge case where having a Tooltip as the first focusable element would make it activate when you open the modal.
      // We have to use JS because it doesn't work to set it with a prop (React bug?)
      // Currently doesn't seem to work in Chrome. See also Tooltip.tsx
      if (modalRef.current && portalNode) modalRef.current.autofocus = true;
    }, [portalNode]);

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
    }, [portalNode, open]);

    useBodyScrollLock(modalRef, portalNode, isNested);

    const isWidthPreset =
      typeof width === "string" && ["small", "medium"].includes(width);

    const mergedClassName = cn("navds-modal", className, {
      [polyfillClassName.current]: needPolyfill,
      "navds-modal--autowidth": !width,
      [`navds-modal--${width}`]: isWidthPreset,
      "navds-modal--top": placement === "top" && !needPolyfill,
    });

    const mergedStyle = {
      ...style,
      ...(!isWidthPreset ? { width } : {}),
    };

    const mouseClickStart = useRef<MouseCoordinates>({
      clientX: 0,
      clientY: 0,
    });
    const handleModalMouseDown: React.MouseEventHandler<HTMLDialogElement> = (
      event,
    ) => {
      mouseClickStart.current = event;
    };

    const shouldHandleModalClick = closeOnBackdropClick && !needPolyfill;

    /**
     * `closeOnBackdropClick` has issues on polyfill when nesting modals (DatePicker)
     */
    const handleModalClick = (
      endEvent: React.MouseEvent<HTMLDialogElement>,
    ) => {
      if (endEvent.target !== modalRef.current) {
        return;
      }

      const modalRect = modalRef.current.getBoundingClientRect();

      if (
        coordsAreInside(mouseClickStart.current, modalRect) ||
        coordsAreInside(endEvent, modalRect)
      ) {
        return;
      }

      if (onBeforeClose !== undefined && onBeforeClose() === false) {
        return;
      }

      modalRef.current.close();
    };

    /**
     * onCancel fires when you press `Esc`
     */
    const handleModalCancel = (
      event: React.SyntheticEvent<HTMLDialogElement, Event>,
    ) => {
      onBeforeClose && onBeforeClose() === false && event.preventDefault();
    };

    const mergedAriaLabelledBy =
      !ariaLabelledby && !rest["aria-label"] && header
        ? ariaLabelId
        : ariaLabelledby;

    const component = (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <dialog
        {...rest}
        ref={mergedRef}
        className={mergedClassName}
        style={mergedStyle}
        onCancel={composeEventHandlers(onCancel, handleModalCancel)}
        onClick={
          shouldHandleModalClick
            ? composeEventHandlers(onClick, handleModalClick)
            : onClick
        }
        onMouseDown={
          shouldHandleModalClick
            ? composeEventHandlers(onMouseDown, handleModalMouseDown)
            : onMouseDown
        }
        aria-labelledby={mergedAriaLabelledBy}
      >
        <ModalContextProvider
          closeHandler={getCloseHandler(modalRef, header, onBeforeClose)}
          ref={modalRef}
        >
          {header && (
            <ModalHeader>
              {header.label && (
                <Detail className={cn("navds-modal__label")}>
                  {header.label}
                </Detail>
              )}
              <Heading
                size={header.size ?? "medium"}
                level="1"
                id={ariaLabelId}
              >
                {header.icon && (
                  <span className={cn("navds-modal__header-icon")}>
                    {header.icon}
                  </span>
                )}
                {header.heading}
              </Heading>
            </ModalHeader>
          )}

          {children}
        </ModalContextProvider>
      </dialog>
    );

    if (portal) {
      if (portalNode) return createPortal(component, portalNode);
      return null;
    }
    return component;
  },
) as ModalComponent;

Modal.Root = Modal;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
