import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingletonComponent from '../components/SingletonComponent';
import TEIComponent from '../components/TEIComponent';

class ModeContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let currentMode = null;

        if (this.props.isToggled) {
            currentMode = <TEIComponent cursor={this.props.cursor} />;
            // programData={this.state.programData};
        } else {
            currentMode = <SingletonComponent cursor={this.props.cursor} />;
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
        cursor: state.tree.cursor
    }
}

export default connect(mapStateToProps)(ModeContainer);
