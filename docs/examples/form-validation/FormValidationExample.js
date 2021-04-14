import React from "react";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import {
  Input,
  CheckboksPanelGruppe,
  SkjemaGruppe,
  Feiloppsummering,
} from "nav-frontend-skjema";
import Knapp, { Hovedknapp, Flatknapp } from "nav-frontend-knapper";
import Spinner from "nav-frontend-spinner";

import "./styles.less";

const isNumeric = (value) => {
  const n = value.toString().replace(",", ".");
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class FormValidationExample extends React.Component {
  constructor(props) {
    super(props);

    this.validators = {
      choices: [
        {
          test: (v) => v && v.length,
          failText: "Du må velge minst én ting",
        },
      ],
      address: [
        {
          test: (v) => v && v.length,
          failText: "Du må oppgi en gateadresse",
        },
      ],
      zip: [
        {
          test: (v) => v && v.length,
          failText: "Du må oppgi et postnummer",
        },
        {
          test: (v) => isNumeric(v),
          failText: "Postnummer må være et tall",
        },
        {
          test: (v) => v.length === 4,
          failText: "Postnummer må ha 4 siffer",
        },
      ],
      city: [
        {
          test: (v) => v && v.length,
          failText: "Du må oppgi et poststed",
        },
      ],
    };

    this.state = {
      fieldValues: {
        choices: [],
        address: "",
        zip: "",
        city: "",
      },
      errors: {
        choices: undefined,
        address: undefined,
        zip: undefined,
        city: undefined,
      },
      submitAttempt: false,
      submitSuccess: false,
      resetCounter: 10,
    };

    this.feiloppsummering = React.createRef();
  }

  getForm = (feil) => (
    <form onSubmit={this.submit}>
      <CheckboksPanelGruppe
        legend="Hva vil du ha levert?"
        checkboxes={[
          {
            label: "Eplejuice",
            value: "juice1",
            checked: this.state.fieldValues.choices.indexOf("juice1") !== -1,
            id: "b-choices",
          },
          {
            label: "Appelsinjuice",
            value: "juice2",
            checked: this.state.fieldValues.choices.indexOf("juice2") !== -1,
          },
          {
            label: "Melk",
            value: "melk",
            checked: this.state.fieldValues.choices.indexOf("melk") !== -1,
          },
          {
            label: "Ananasjuice",
            value: "juice3",
            checked: this.state.fieldValues.choices.indexOf("juice3") !== -1,
          },
        ]}
        onChange={(e, value) => this.handleChange(value, "choices")}
        feil={this.state.errors.choices ? this.state.errors.choices : undefined}
      />
      <br />
      <br />
      <SkjemaGruppe legend="Leveringsadresse">
        <Input
          id="b-address"
          label="Adresse"
          value={this.state.fieldValues.address}
          onChange={(e) => this.handleChange(e.currentTarget.value, "address")}
          feil={
            this.state.errors.address ? this.state.errors.address : undefined
          }
        />
        <div className="fields postnr-sted">
          <div className="postnr-sted__postnr">
            <Input
              id="b-zip"
              label="Postnummer (4 siffer)"
              value={this.state.fieldValues.zip}
              onChange={(e) => this.handleChange(e.currentTarget.value, "zip")}
              feil={this.state.errors.zip ? this.state.errors.zip : undefined}
            />
          </div>
          <div className="postnr-sted__poststed">
            <Input
              id="b-city"
              label="Poststed"
              value={this.state.fieldValues.city}
              onChange={(e) => this.handleChange(e.currentTarget.value, "city")}
              feil={this.state.errors.city ? this.state.errors.city : undefined}
            />
          </div>
        </div>
      </SkjemaGruppe>
      {feil && !!feil.length && (
        <Feiloppsummering
          innerRef={this.feiloppsummering}
          tittel="For å gå videre må du rette opp følgende:"
          feil={feil}
        />
      )}
      <div>
        <div className="form-buttons" style={{ display: "flex" }}>
          <Hovedknapp type="submit">Fullfør</Hovedknapp>
          <Flatknapp onClick={this.reset}>Nullstill</Flatknapp>
        </div>
      </div>
    </form>
  );

  getReceipt = () => (
    <div className="receipt">
      <Undertittel>Skjema sendt!</Undertittel>
      <p>
        Skjema tilbakestilles om&nbsp;
        {this.state.resetCounter}&nbsp; sekunder...
      </p>
      <br />
      <Knapp onClick={this.reset}>Tilbake</Knapp>
    </div>
  );

  validateField = (name) =>
    this.validators[name].find(
      (validator) => !validator.test(this.state.fieldValues[name])
    );

  validateAll = () => {
    const errors = {};

    Object.keys(this.validators).forEach((key) => {
      const failedValidator = this.validateField(key);
      if (failedValidator) errors[key] = failedValidator.failText;
    });

    return Object.keys(errors).length ? errors : false;
  };

  submit = (e) => {
    e.preventDefault();
    const errors = this.validateAll();

    if (errors) {
      this.setState(
        {
          errors,
          submitAttempt: true,
        },
        () => this.feiloppsummering.current.focus()
      );
    } else {
      this.setState({
        submitAttempt: false,
        submitting: true,
      });

      new Promise((resolve) => {
        // Fake 1 sec submit request
        window.setTimeout(() => resolve("200 OK"), 1000);
      }).then(() => {
        this.setState({
          submitting: false,
          submitSuccess: true,
        });

        window.setTimeout(() => {
          this.timer = window.setInterval(() => {
            if (this.state.resetCounter > 1) {
              this.setState({
                resetCounter: this.state.resetCounter - 1,
              });
            } else {
              this.reset();
            }
          }, 1000);
        }, 3000);
      });
    }
  };

  reset = (e) => {
    if (e) e.preventDefault();
    if (this.timer) window.clearInterval(this.timer);

    this.setState({
      fieldValues: {
        choices: [],
        address: "",
        zip: "",
        city: "",
      },
      errors: {
        choices: undefined,
        address: undefined,
        zip: undefined,
        city: undefined,
      },
      submitAttempt: false,
      submitSuccess: false,
      resetCounter: 10,
    });
  };

  handleChange = (value, name) => {
    let val = value;

    if (name === "choices") {
      const choices = this.state.fieldValues.choices.slice();
      const index = choices.indexOf(val);

      if (index === -1) {
        choices.push(val);
      } else {
        choices.splice(index, 1);
      }

      val = choices;
    }

    const newValues = Object.assign(this.state.fieldValues, {
      [name]: val,
    });

    const invalid = this.validateField(name);

    if (this.state.submitAttempt) {
      const newErrors = Object.assign(this.state.errors, {
        [name]: invalid ? invalid.failText : undefined,
      });

      this.setState({
        fieldValues: newValues,
        errors: newErrors,
      });
    } else {
      this.setState({
        fieldValues: newValues,
      });
    }

    const hasErrors = this.validateAll();

    if (this.state.submitAttempt && !hasErrors) {
      this.setState({
        submitAttempt: false,
      });
    }
  };

  render() {
    const feil = Object.keys(this.state.errors)
      .filter((key) => this.state.errors[key])
      .map((key) => ({
        skjemaelementId: `b-${key}`,
        feilmelding: this.state.errors[key],
      }));

    return (
      <div className="form-validation-pattern">
        <Systemtittel>Mitt skjema</Systemtittel>
        <br />
        <br />
        <div aria-live="assertive">
          {!this.state.submitSuccess &&
            !this.state.submitting &&
            this.getForm(feil)}
          {this.state.submitting && (
            <div className="spinner-container">
              <div align="center">
                <Spinner transparent />
                <br />
                <br />
                Sender inn...
              </div>
            </div>
          )}
          {this.state.submitSuccess && this.getReceipt()}
        </div>
      </div>
    );
  }
}

export default FormValidationExample;
