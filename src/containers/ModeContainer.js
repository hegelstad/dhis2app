import React, { Component } from 'react';
import { connect } from 'react-redux';
// Containers
import SingletonContainer from './SingletonContainer';
import TEIContainer from './TEIContainer';

class ModeContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                { this.props.isToggled // Show singleton (false) or TEI (true) mode.
                    ? <TEIContainer/>
                    : <SingletonContainer/>
                }
            </div>
        );
    }
}

// Shorthand notation.
export default connect(
    state => ({
        isToggled: state.isToggled
    })
)(ModeContainer);
