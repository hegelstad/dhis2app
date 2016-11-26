import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingletonContainer from './SingletonContainer';
import TEIContainer from './TEIContainer';

class ModeContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let currentMode = null;

        if (this.props.isToggled) {
            currentMode = <TEIContainer/>;
        } else {
            currentMode = <SingletonContainer/>;
        }

        return (
            <div>
                { currentMode }
            </div>
        );
    }
}

// Example to show the power of ES6.
// const mapStateToProps = (state) => {
//     return { applicationMode: state.applicationMode };
// }
const mapStateToProps = (state) => {
    return {
        isToggled: state.isToggled,
    }
}

export default connect(mapStateToProps)(ModeContainer);
