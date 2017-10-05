import React from 'react';
import PT from 'prop-types';

import { RouteWithSubRoutes } from '../../../../utils/routing/routes.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import './styles.less';

class ComponentMainPage extends React.Component {

    renderTitle() {
        if (window.location.hash !== '#/components') {
            return (<TitleByRoute routes={this.props.routes} />);
        }
        return (<h2>Components</h2>);
    }

    renderSubRoutes() {
        return (
            <div>
                {
                    this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes
                            key={i} // eslint-disable-line react/no-array-index-key
                            {...route}
                        />
                    ))
                }
            </div>
        );
    }

    render() {
        return (
            <div className="componentMainPage">
                { this.renderTitle() }
                { this.renderSubRoutes() }
            </div>
        );
    }
}

ComponentMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default ComponentMainPage;
