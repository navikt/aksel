import React from 'react';
import classnames from 'classnames';

import './styles.less';

const overflowCls = (state) => classnames('overflow-detector', {
    'overflow-detector--shadow-left': state.overflowLeft,
    'overflow-detector--shadow-right': state.overflowRight
});

class OverflowDetector extends React.Component {
    constructor(props) {
        super(props);

        this.scroller = React.createRef();
        this.inner = React.createRef();

        this.state = {
            overflowLeft: false,
            overflowRight: false
        };

        window.addEventListener('resize', this.checkOverflow);
    }

    componentDidMount() {
        this.checkOverflow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkOverflow);
    }

    checkOverflow = () => {
        const scroller = this.scroller.current;
        const inner = this.inner.current;
        let overflowLeft = false;
        let overflowRight = false;

        if (scroller.offsetWidth < inner.offsetWidth) {
            if (scroller.scrollLeft !== 0) {
                overflowLeft = true;
            }
            if ((scroller.scrollLeft + scroller.offsetWidth) < inner.offsetWidth) {
                overflowRight = true;
            }
        }

        this.setState({
            overflowLeft,
            overflowRight
        });
    }

    render() {
        return (
            <div className={overflowCls(this.state)}>
                <div
                    className="overflow-detector__scroller"
                    onScroll={this.checkOverflow}
                    ref={this.scroller}
                    tabIndex="0"
                    role="region"
                >
                    <div
                        className="overflow-detector__inner"
                        ref={this.inner}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default OverflowDetector;
