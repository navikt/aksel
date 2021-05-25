import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import {
  EventThrottler,
  guid,
  autobind,
  requestAnimationFrame,
} from "nav-frontend-js-utils";
import {
  Label,
  SkjemaGruppeFeilContext,
  SkjemaGruppeFeilContextProps,
} from ".";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import "nav-frontend-skjema-style";

const inputCls = (className, harFeil) =>
  classNames(className, "skjemaelement__input textarea--medMeta", {
    "skjemaelement__input--harFeil": harFeil,
  });

const tellerTekstCls = (remaining) =>
  classNames("teller-tekst", {
    "teller-tekst--overflow": remaining < 0,
  });

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Ledetekst for tekstområdet
   */
  label?: React.ReactNode;
  /**
   * Ekstrainformasjon under overskrift
   */
  description?: React.ReactNode;
  /**
   * Maks antal tegn som kan skrives inn i tekstområdet
   */
  maxLength?: number;
  /**
   * Teksten som er skrevet inn i tekstområdet.
   */
  value: string;
  /**
   * Klassenavn for tekstomnrådet
   */
  textareaClass?: string;
  /**
   * Id for tekstområdet, settes til name eller random guid hvis prop ikke er satt
   */
  id?: string;
  /**
   * Navn for tekstområdet, settes til id eller random guid hvis prop ikke er satt
   */
  name?: string;
  /**
   * OnChange er pliktig
   */
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil?: React.ReactNode | boolean;
  tellerTekst?: (antallTegn: number, maxLength: number) => React.ReactNode;
  textareaRef?: (textarea: HTMLTextAreaElement | null) => any;
}

interface TextareaDefaultProps {
  maxLength: number;
  textareaClass: string;
  tellerTekst: (antallTegn: number, maxLength: number) => React.ReactNode;
}

type PropsWithDefault = TextareaProps & TextareaDefaultProps;

/**
 * Selvekspanderende tekstområde med teller
 */
class Textarea extends React.Component<TextareaProps> {
  private mirror: HTMLDivElement | null = null;

  private tekstomrade: HTMLTextAreaElement | null = null;

  private textareaId: string = this.props.id || guid();

  private maxTegnId?: string = this.props.maxLength ? guid() : undefined;

  private descriptionId?: string = this.props.description ? guid() : undefined;

  private describedbyId: string = [this.descriptionId, this.maxTegnId]
    .filter((id) => !!id)
    .join(" ");

  static propTypes = {
    /**
     * Ledetekst for tekstområdet
     */
    label: PT.node,
    /**
     * Ekstrainformasjon under overskrift
     */
    description: PT.node,
    /**
     * Maks antal tegn som kan skrives inn i tekstområdet
     */
    maxLength: PT.number,
    /**
     * Teksten som er skrevet inn i tekstområdet.
     */
    value: PT.string.isRequired,
    /**
     * Klassenavn for tekstomnrådet
     */
    textareaClass: PT.string,
    /**
     * Id for tekstområdet, settes til name eller random guid hvis prop ikke er satt
     */
    id: PT.string,
    /**
     * Navn for tekstområdet, settes til id eller random guid hvis prop ikke er satt
     */
    name: PT.string,
    /**
     * Optional onChange handler
     */
    onChange: PT.func.isRequired,
    /**
     * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
     */
    feil: PT.oneOfType([PT.node, PT.bool]),
    /**
     * Funksjon for å generere tellerteksten som vises nede i høyre hjørne
     */
    tellerTekst: PT.func,
    /**
     * Referanse til selve textareafeltet. Brukes for eksempel til å sette fokus
     */
    textareaRef: PT.func,
  };

  static defaultProps = {
    maxLength: 2000,
    textareaClass: "",
    id: undefined,
    name: undefined,
    feil: undefined,
    // eslint-disable-next-line no-use-before-define
    tellerTekst: defaultTellerTekst,
    textareaRef: undefined,
    label: "",
    description: "",
  };

  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    // @ts-ignore
    requestAnimationFrame.call(window, this.updateHeight, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.updateHeight();
    }
  }

  updateHeight() {
    if (this.mirror && this.tekstomrade) {
      this.mirror.textContent = `${this.tekstomrade.value} `;
      // eslint-disable-next-line no-param-reassign
      this.tekstomrade.style.height = `${this.mirror.offsetHeight + 25}px`;
    }
  }

  render() {
    const {
      label,
      description,
      maxLength,
      textareaClass,
      id,
      name,
      feil,
      tellerTekst,
      textareaRef,
      onChange,
      ...other
    } = this.props as PropsWithDefault;
    const antallTegn = other.value.length;

    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => {
          const feilmelding = context.feil || feil;
          const feilmeldingId = context.feilmeldingId || guid();

          return (
            <div className="skjemaelement textarea__container">
              {label && <Label htmlFor={this.textareaId}>{label}</Label>}
              {description && (
                <div
                  className="skjemaelement__description"
                  id={this.descriptionId}
                >
                  {description}
                </div>
              )}
              <div className="textarea--medMeta__wrapper">
                {!!this.props.maxLength && (
                  <span id={this.maxTegnId} className="sr-only">
                    Tekstområde med plass til {this.props.maxLength} tegn.
                  </span>
                )}
                <EventThrottler
                  event="resize"
                  callback={this.updateHeight}
                  delay={100}
                >
                  <textarea
                    ref={(textarea) => {
                      this.tekstomrade = textarea;
                      if (textareaRef !== undefined) textareaRef(textarea);
                    }}
                    onChange={onChange}
                    className={inputCls(textareaClass, feilmelding)}
                    id={this.textareaId}
                    name={name}
                    style={{ height: "30px" }}
                    aria-invalid={!!feilmelding}
                    aria-errormessage={feilmelding ? feilmeldingId : undefined}
                    aria-describedby={this.describedbyId}
                    {...other}
                  />
                </EventThrottler>
                <Teller
                  antallTegn={antallTegn}
                  maxLength={maxLength}
                  tellerTekst={tellerTekst}
                />
              </div>
              {!context.feil && !!feil && (
                <SkjemaelementFeilmelding id={feilmeldingId}>
                  {typeof feilmelding !== "boolean" && feilmelding}
                </SkjemaelementFeilmelding>
              )}
              <div
                className="textareamirror"
                ref={(mirror) => {
                  this.mirror = mirror;
                }}
                aria-hidden="true"
              />
            </div>
          );
        }}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

interface TellerProps {
  antallTegn: number;
  maxLength: number;
  tellerTekst: (antallTegn: number, maxLength: number) => React.ReactNode;
}

const Teller = (props: TellerProps) => {
  if (props.maxLength <= 0) {
    return null;
  }
  return (
    <p className="textarea--medMeta__teller">
      {props.tellerTekst(props.antallTegn, props.maxLength)}
    </p>
  );
};

function defaultTellerTekst(antallTegn, maxLength) {
  const difference = maxLength - antallTegn;
  return (
    <span className={tellerTekstCls(difference)} aria-live="polite">
      {difference >= 0 && `Du har ${difference} tegn igjen`}
      {difference < 0 && `Du har ${Math.abs(difference)} tegn for mye`}
    </span>
  );
}

export default Textarea;
