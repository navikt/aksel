import React from 'react';
import { Systemtittel, Undertittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import {
    Input,
    Checkbox,
    Radio,
    TextareaControlled,
    CheckboksPanelGruppe,
    SkjemaGruppe,
    Fieldset,
    FancyFeiloppsummering
} from 'NavFrontendModules/nav-frontend-skjema';
import Knapp, { Hovedknapp, Flatknapp } from 'NavFrontendModules/nav-frontend-knapper';
import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import Spinner from 'NavFrontendModules/nav-frontend-spinner';

import './styles.less';

const isNumeric = (value) => {
    const n = value.toString().replace(',', '.');
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class FormValidationExampleD extends React.Component {
    constructor(props){
        super(props);

        this.validators = {
            choices: [
                {
                    test: (v) => v && v.length,
                    failText: 'Du må velge minst èn ting'
                }
            ],
            address: [
                {
                    test: (v) => v && v.length,
                    failText: 'Du må oppgi en gateadresse'
                }
            ],
            zip: [
                {
                    test: (v) => v && v.length,
                    failText: 'Du må oppgi et postnummer'
                },
                {
                    test: (v) => isNumeric(v),
                    failText: 'Postnummer må være et tall'
                },
                {
                    test: (v) => v.length === 4,
                    failText: 'Postnummer må ha 4 siffer'
                }
            ],
            city: [
                {
                    test: (v) => v && v.length,
                    failText: 'Du må oppgi en gateadresse'
                }
            ]
        };

        this.state = {
            fields: {
                choices: {
                    value: [],
                    errorMsg: '',
                    valid: true
                },
                address: {
                    value: '',
                    errorMsg: '',
                    valid: true
                },
                zip: {
                    value: '',
                    errorMsg: '',
                    valid: true
                },
                city: {
                    value: '',
                    errorMsg: '',
                    valid: true
                }
            },
            submitAttempt: false,
            submitSuccess: false,
            resetCounter: 10
        };

        this.feiloppsummering = React.createRef();
    }

    handleChange = (value, name) => {
        if (name === 'choices') {
            let choices = this.state.fields.choices.value.slice();
            const index = choices.indexOf(value);

            if (index === -1) {
                choices.push(value);
            } else {
                choices.splice(index, 1);
            }

            value = choices;
        }

        const invalid = (this.state.submitAttempt) ? this.validateField(name, value) : false;
        const newFields = Object.assign(this.state.fields, {
            [name]: {
                value,
                errorMsg: (invalid) ? invalid.failText : this.state.fields[name].errorMsg,
                valid: !invalid
            }
        });

        this.setState({ fields: newFields });

        // const hasErrors = this.validateAll();
        // if (this.state.submitAttempt && !hasErrors) {
        //     this.setState({
        //         submitAttempt: false
        //     });
        // }
    }

    reset = (e) => {
        if (e) e.preventDefault();
        if (this.timer) window.clearInterval(this.timer);

        this.setState({
            fields: {
                choices: {
                    value: [],
                    errorMsg: '',
                    valid: true
                },
                address: {
                    value: '',
                    errorMsg: '',
                    valid: true
                },
                zip: {
                    value: '',
                    errorMsg: '',
                    valid: true
                },
                city: {
                    value: '',
                    errorMsg: '',
                    valid: true
                }
            },
            submitAttempt: false,
            submitSuccess: false,
            resetCounter: 10
        });
    }

    submit = (e) => {
        e.preventDefault();
        const invalid = this.validateAll();

        if (invalid) {
            this.setState({
                submitAttempt: true
            }, () => { if (this.feiloppsummering) this.feiloppsummering.current.focus() });
        } else {
            this.setState({
                submitAttempt: false,
                submitting: true,
            });

            new Promise((resolve, reject) => {
                // Fake 1 sec submit request
                window.setTimeout(() => resolve('200 OK'), 1000);
            }).then(() => {
                this.setState({
                    submitting: false,
                    submitSuccess: true
                });

                this.timer = window.setInterval(() => {
                    if (this.state.resetCounter > 1) {
                        this.setState({
                            resetCounter: this.state.resetCounter - 1
                        });
                    } else {
                        this.reset();
                    }
                }, 1000);
            });
        }
    }

    validateField = (name, value) => {
        return this.validators[name].find(validator => !validator.test(value));
    }

    validateAll = () => {
        let fields = {};
        
        Object.keys(this.validators).map(key => {
            const value = this.state.fields[key].value;
            const invalid = this.validateField(key, value);
            fields = Object.assign(fields, {
                [key]: {
                    value,
                    errorMsg: (invalid) ? invalid.failText : this.state.fields[key].errorMsg,
                    valid: !invalid
                }
            });
        });

        console.log(fields);

        this.setState({
            fields
        });

        const hasErrors = !!Object.keys(fields).filter((key) => !fields[key].valid).length;

        return hasErrors;
    }

    getForm = () => {
        return (
            <form>
                <CheckboksPanelGruppe
                    legend={'Hva vil du ha levert?'}
                    checkboxes={[
                        {
                            label: 'Eplejuice',
                            value: 'juice1',
                            checked: (this.state.fields.choices.value.indexOf('juice1') !== -1),
                            id: 'd-choices'
                        },
                        {
                            label: 'Appelsinjuice',
                            value: 'juice2',
                            checked: (this.state.fields.choices.value.indexOf('juice2') !== -1)
                        },
                        {
                            label: 'Melk',
                            value: 'melk',
                            checked: (this.state.fields.choices.value.indexOf('melk') !== -1)
                        },
                        {
                            label: 'Ananasjuice',
                            value: 'juice3',
                            checked: (this.state.fields.choices.value.indexOf('juice3') !== -1)
                        }
                    ]}
                    onChange={(e, value) => this.handleChange(value, 'choices')}
                    feil={(!this.state.fields.choices.valid) ? { feilmelding: this.state.fields.choices.errorMsg } : undefined }
                />
                <Ingress>Leveringsadresse</Ingress>
                <SkjemaGruppe
                    feil={(!this.state.fields.address.valid) ? { feilmelding: this.state.fields.address.errorMsg } : undefined }
                >
                    <Input
                        id="d-address"
                        label="Adresse"
                        value={this.state.fields.address.value}
                        onChange={(e) => this.handleChange(e.currentTarget.value, 'address')}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe
                    feil={(!this.state.fields.zip.valid) ? { feilmelding: this.state.fields.zip.errorMsg } : undefined }
                >
                    <Input
                        id="d-zip"
                        label="Postnummer"
                        value={this.state.fields.zip.value}
                        onChange={(e) => this.handleChange(e.currentTarget.value, 'zip')}
                        bredde="XS"
                        style={{ 'marginRight': '2rem' }}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe
                    feil={(!this.state.fields.city.valid) ? { feilmelding: this.state.fields.city.errorMsg } : undefined }
                >
                    <Input
                        id="d-city"
                        label="Poststed"
                        value={this.state.fields.city.value}
                        onChange={(e) => this.handleChange(e.currentTarget.value, 'city')}
                    />
                </SkjemaGruppe>
                <div className="fields postnr-sted">
                    <div className="postnr-sted__postnr">
                        
                    </div>
                    <div className="postnr-sted__poststed">
                        
                    </div>
                </div>
                <br/>
                <br/>
            </form>
        );
    }

    getReceipt = () => {
        return (
            <div className="receipt">
                <Undertittel>Skjema sendt!</Undertittel>
                <p>
                    Skjema tilbakestilles om {this.state.resetCounter} sekunder...
                </p>
                <br/>
                <Knapp onClick={this.reset}>Tilbake</Knapp>
            </div>
        );
    }

    render(){

        const visFeiloppsummering = !!Object.keys(this.state.fields).filter(
            (key) => this.state.fields[key].errorMsg.length
        ).length && this.state.submitAttempt;

        const feil = Object.keys(this.state.fields).filter((key) => this.state.fields[key].errorMsg.length).map((key) => ({
            feilmelding: this.state.fields[key].errorMsg,
            valid: this.state.fields[key].valid,
            key: `d-${key}`
        }));

        console.log(feil);

        return (
            <div className="form-validation-pattern">
                <Systemtittel>Mitt skjema</Systemtittel>
                <br/>
                <br/>
                {
                    (!this.state.submitSuccess && !this.state.submitting) &&
                    this.getForm()
                }
                {
                    visFeiloppsummering &&
                    <FancyFeiloppsummering
                        innerRef={this.feiloppsummering}
                        feil={feil}
                    >
                        <Undertittel>For å gå videre må du rette opp følgende:</Undertittel>
                    </FancyFeiloppsummering>
                }
                {
                    (!this.state.submitSuccess && !this.state.submitting) &&
                    <div>
                        <div style={{display:'flex'}}>
                            <Hovedknapp onClick={this.submit}>Fullfør</Hovedknapp>
                            <Flatknapp onClick={this.reset}>Nullstill</Flatknapp>
                        </div>
                    </div>
                }
                {
                    this.state.submitting && 
                    <div className="spinner-container">
                        <div align="center">
                            <Spinner transparent /><br/><br/>Sender inn...
                        </div>
                    </div>
                }
                {this.state.submitSuccess && this.getReceipt()}
            </div>
        );
    }
}

export default FormValidationExampleD;
