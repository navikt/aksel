import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import cl from "clsx";
import dialogPolyfill, { needPolyfill } from "./dialog-polyfill";
import { Detail, Heading, mergeRefs, useId } from "..";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { getCloseHandler, useBodyScrollLock } from "./ModalUtils";
import { ModalContext } from "./ModalContext";
import ModalPortal from "./ModalPortal";

export interface ModalProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * Content for the header. Alteratively you can use <Modal.Header> instead for more control,
   * but then you have to set `aria-label` or `aria-labelledby` on the modal manually.
   */
  header?: {
    label?: string;
    icon?: React.ReactNode;
    heading: string;
    /**
     * Heading size
     * @default "medium"
     * */
    size?: "medium" | "small";
    /**
     * Removes close-button (X) when false
     * @default true
     */
    closeButton?: boolean;
  };
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Whether the modal should be visible or not.
   * Remember to use the `onClose` callback to keep your local state in sync.
   * You can also use `ref.current.openModal()` and `ref.current.close()`.
   */
  open?: boolean;
  /**
   * Called when the modal has been closed
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * Called when the user wants to close the modal (clicked the close button or pressed Esc).
   * @returns Whether to close the modal
   */
  onBeforeClose?: () => boolean | void;
  /**
   * Called when the user presses the Esc key, unless `onBeforeClose()` returns `false`.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * @default fit-content (up to 700px)
   * */
  width?: "medium" | "small" | number | `${number}${string}`;
  /**
   * Lets you render the modal into a different part of the DOM.
   * Will use `rootElement` from `Provider` if defined, otherwise `document.body`.
   */
  portal?: boolean;
  /**
   * User defined classname for modal
   */
  className?: string;
  /**
   * Sets aria-labelledby on modal.
   * No need to set this manually if the `header` prop is used. A reference to `header.heading` will be created automatically.
   * @warning If not using `header`, you should set either `aria-labelledby` or `aria-label`.
   */
  "aria-labelledby"?: string;
}

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

    if (useContext(ModalContext)) {
      console.error("Modals should not be nested");
    }

    useEffect(() => {
      if (needPolyfill && modalRef.current) {
        dialogPolyfill.registerDialog(modalRef.current);
      }
    }, [modalRef]);

    useEffect(() => {
      // We need to have this in a useEffect so that the content renders before the modal is displayed,
      // and in case `open` is true initially.
      if (modalRef.current && open !== undefined) {
        if (open && !modalRef.current.open) {
          modalRef.current.showModal();
        } else if (!open && modalRef.current.open) {
          modalRef.current.close();
        }
      }
    }, [modalRef, open]);

    useBodyScrollLock(modalRef, open);

    const isWidthPreset =
      typeof width === "string" && ["small", "medium"].includes(width);

    const component = (
      <dialog
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
        {...rest}
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
      return (
        <ModalPortal modalRef={modalRef} open={open}>
          {component}
        </ModalPortal>
      );
    }
    return component;
  }
) as ModalComponent;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
