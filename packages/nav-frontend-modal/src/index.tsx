import * as React from "react";
import * as PT from "prop-types";
import classnames from "classnames";
import Modal from "react-modal";
import { Props } from "react-modal";
import Lukknapp from "nav-frontend-lukknapp";

import "nav-frontend-modal-style";

const cls = (className) => classnames("modal", className);

/**
 * Modalen bruker `react-modal`, se [github siden](https://github.com/reactjs/react-modal) for mer informasjon.
 *
 */

export interface ModalProps extends Props {
  /**
   * Bestemmer om modalen skal være synlig
   */
  isOpen: boolean;
  /**
   * En beskrivelse av formålet med modalen, blir satt som `aria-label`
   */
  contentLabel: string;
  /**
   * Innholdet i modalen
   */
  children: React.ReactNode;
  /**
   * Funksjon som blir kalt i det modalen ønsker å lukkes
   */
  onRequestClose: () => void;
  /**
   * Bestemmer om modalen selv skal legge til en lukkeknapp
   */
  closeButton?: boolean;
  /**
   * Funksjon som blir kalt når modalen har blitt åpnet. Kan brukes for å sette fokus på ett element
   */
  onAfterOpen?: () => void;
  /**
   * Om klikk på overlay skal lukke modalen
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * Tall som beskriver hvor lenge modalen venter før den lukkes
   */
  closeTimeoutMS?: number;
  /**
   * Klasse for content-taggen
   */
  contentClass?: string;
  /**
   * Klasse som legges til dialog
   */
  className?: string;
}

class ModalWrapper extends React.Component<ModalProps, {}> {
  closeButtonRef: Lukknapp | null | undefined;

  modalRef!: Modal | null;

  static setAppElement(element) {
    Modal.setAppElement(element);
  }

  static defaultProps = {
    closeButton: true,
    shouldCloseOnOverlayClick: true,
    closeTimeoutMS: 0,
    contentClass: undefined,
    onAfterOpen: undefined,
  };

  constructor(props: ModalProps) {
    super(props);
    this.onRequestClose = this.onRequestClose.bind(this);
  }

  onRequestClose(evt) {
    const { onRequestClose, shouldCloseOnOverlayClick } = this.props;
    if (shouldCloseOnOverlayClick || evt.type === "keydown") {
      onRequestClose();
    } else if (this.closeButtonRef) {
      this.closeButtonRef.focus();
    } else if (
      this.modalRef &&
      (this.modalRef as any).portal &&
      (this.modalRef as any).portal.refs.content
    ) {
      (this.modalRef as any).portal.refs.content.focus();
    }
  }

  render() {
    const {
      children,
      closeButton,
      shouldCloseOnOverlayClick,
      contentClass,
      ...props
    } = this.props;

    const lukkModalLabel = "Lukk";

    return (
      <Modal
        {...props}
        className={cls(props.className)}
        onRequestClose={this.onRequestClose}
        overlayClassName="modal__overlay"
        shouldCloseOnOverlayClick
        ref={(modalRef) => {
          this.modalRef = modalRef;
        }}
      >
        <section className={contentClass}>{children}</section>
        {closeButton && (
          <Lukknapp
            overstHjorne
            className={classnames({
              "modal__lukkknapp--shake": shouldCloseOnOverlayClick,
            })}
            ariaLabel={lukkModalLabel}
            onClick={props.onRequestClose}
            ref={(closeButtonRef) => {
              this.closeButtonRef = closeButtonRef;
            }}
          >
            {lukkModalLabel}
          </Lukknapp>
        )}
      </Modal>
    );
  }
}

(ModalWrapper as React.ComponentClass).propTypes = {
  /**
   * Bestemmer om modalen skal være synlig
   */
  isOpen: PT.bool,
  /**
   * En beskrivelse av formålet med modalen, blir satt som `aria-label`
   */
  contentLabel: PT.string,
  /**
   * Innholdet i modalen
   */
  children: PT.node,
  /**
   * Funksjon som blir kalt i det modalen ønsker å lukkes
   */
  onRequestClose: PT.func,
  /**
   * Bestemmer om modalen selv skal legge til en lukkeknapp
   */
  closeButton: PT.bool,
  /**
   * Funksjon som blir kalt når modalen har blitt åpnet. Kan brukes for å sette fokus på ett element
   */
  onAfterOpen: PT.func,
  /**
   * Om klikk på overlay skal lukke modalen
   */
  shouldCloseOnOverlayClick: PT.bool,
  /**
   * Tall som beskriver hvor lenge modalen venter før den lukkes
   */
  closeTimeoutMS: PT.number,
  /**
   * Klasse for content-taggen
   */
  contentClass: PT.string,
  /**
   * Klasse som legges til dialog
   */
  className: PT.string,
};

export default ModalWrapper;
