import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import prettifyXml from 'prettify-xml';
import Highlight from 'react-highlight';
import './styles.less';

export class CodeExample extends Component {

    render() {
        const shallowComponent = shallow(<this.props.activeComponent>SomeChild</this.props.activeComponent>);
        const html = prettifyXml(shallowComponent.html());

        return (
            <div className="codeExample">
                <Highlight className='html'>
                    { html }
                </Highlight>
            </div>
        );
    }

}

CodeExample = connect((state) => ({
    activeComponent: state.sample.activeComponent,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(CodeExample);