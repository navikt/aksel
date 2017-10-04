import React from 'react';

import { RouteWithSubRoutes } from '../../../../utils/routing/routes.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import './styles.less';

export class ComponentMainPage extends React.Component {

    renderTitle() {
        if (window.location.hash !== '#/components') {
            return (<TitleByRoute routes={this.props.routes} />);
        }
        else {
            return (<h2>Components</h2>);
        }
    }

    renderSubRoutes() {
        return (
            <div>
                {
                    this.props.routes.map((route, i) => {
                        return (
                            <RouteWithSubRoutes
                                key={ i }
                                { ...route }
                            />
                        );
                    })
                }
            </div>
        )
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
