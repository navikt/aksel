import React from 'react';

class OverflowDetector extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            overflowLeft: false,
            overflowRight: false
        };
    }

    
    
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default OverflowDetector;