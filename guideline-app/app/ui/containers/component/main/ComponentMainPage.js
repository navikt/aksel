import React from 'react';
import PT from 'prop-types';

import SubRoutesWrapper from '../../../../utils/routing/subroutesWrapper.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import './styles.less';

class ComponentMainPage extends React.Component {

    renderTitle() {
        if (window.location.hash !== '#/components') {
            return (<TitleByRoute routes={this.props.routes} />);
        }
        return (<h2>Components</h2>);
    }

    render() {
        return (
            <div className="componentMainPage">
                { this.renderTitle() }
                <SubRoutesWrapper routes={this.props.routes} />
            </div>
        );
    }
}

ComponentMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default ComponentMainPage;
