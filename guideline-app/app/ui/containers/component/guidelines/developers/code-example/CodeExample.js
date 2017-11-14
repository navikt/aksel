import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import Tabbar from './../../../../../components/tabbar/Tabbar';
import {
    getHtmlCodeForComponent,
    getReactCodeForComponent,
    getCSSCodeForComponent
} from '../../../../../../utils/dom/code-sampling.utils';
import './styles.less';

class CodeExample extends Component {

    componentWillMount() {
        this.tabbarItems = this.getTabbarItems();
        this.state = {
            activeTabbarItem:
                this.tabbarItems.find((item) => item.defaultActive) ||
                this.tabbarItems.find((item) => item.show === true)
        };
    }

    getCodeToDisplayForTabFn(tabName) {
        switch (tabName) {
            case 'react':
                return (type, modifiers, children) => (getReactCodeForComponent(type, modifiers, children));
            case 'html':
                return (type, modif, children) => (getHtmlCodeForComponent(type, modif, children));
            case 'css':
                return (ref) => (getCSSCodeForComponent(ref));
            case 'js':
                // eslint-disable-next-line react/prop-types
                return () => (this.props.componentData.tabOptions.js.code);
            default:
                return () => {};
        }
    }

    getTabbarItems() {
        const tabOptions = this.props.componentData.tabOptions;
        const namesOfAllPossibleTabOptions = Object.keys(tabOptions);
        const options = namesOfAllPossibleTabOptions
            .filter((tabName) => (tabOptions[tabName].show === true))
            .map((tabName) => ({
                codeToDisplay: this.getCodeToDisplayForTabFn(tabName),
                ...tabOptions[tabName]
            }));
        return options;
    }

    getCodeToDisplay() {
        const type = this.props.activeType;
        const modifiers = this.props.activeMultipleChoiceModifiers;
        const children = type.children;
        const domRef = this.props.activeRef;
        const activeTabbarItem = this.state.activeTabbarItem;

        if (activeTabbarItem.label === 'CSS') {
            return activeTabbarItem.codeToDisplay(domRef);
        }
        return activeTabbarItem.codeToDisplay(type, modifiers, children);
    }

    changeActiveCodeOption(activeTabbarItem) {
        this.setState({ activeTabbarItem });
    }

    renderHighlightedCode = (code, lang) => (
        <Highlight className={lang}>
            { code }
        </Highlight>
    );

    render() {
        const activeTabbarItem = this.state.activeTabbarItem;
        const highlightedCode = this.renderHighlightedCode(this.getCodeToDisplay(), activeTabbarItem.hljs);

        return (
            <div className="codeExample">
                <Tabbar
                    items={this.tabbarItems}
                    onActiveItemChange={(item) => this.changeActiveCodeOption(item)}
                />

                { highlightedCode }
            </div>
        );
    }
}

CodeExample.propTypes = {
    activeType: PT.shape({
        component: PT.func
    }).isRequired,
    activeRef: PT.shape({}).isRequired,
    activeMultipleChoiceModifiers: PT.arrayOf(PT.shape({})),
    componentData: PT.shape({}).isRequired
};

CodeExample.defaultProps = {
    activeMultipleChoiceModifiers: []
};

// eslint-disable-next-line no-class-assign
CodeExample = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(CodeExample);

export default CodeExample;
