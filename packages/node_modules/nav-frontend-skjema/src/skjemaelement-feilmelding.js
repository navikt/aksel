import React, { Component } from 'react';
import PT from 'prop-types';

class SkjemaelementFeilmelding extends Component {

    renderFeil() {
        return (<div className="skjemaelement__feilmelding">{this.props.feil.feilmelding}</div>);
    }

    render() {
        const { feil } = this.props;
        return (
            <div role="alert" aria-live="assertive">
                {feil && this.renderFeil()}
            </div>
        );
    }
}

export const skjemaelementFeilmeldingShape = PT.shape({
    feilmelding: PT.oneOfType([
        PT.string,
        PT.node // For å slippe igjennom FormattedMessage fra react-intl
    ]).isRequired
});

SkjemaelementFeilmelding.propTypes = {
  /**
     * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
     */
    feil: skjemaelementFeilmeldingShape
};

SkjemaelementFeilmelding.defaultProps = {
    feil: undefined
};

export default SkjemaelementFeilmelding;
