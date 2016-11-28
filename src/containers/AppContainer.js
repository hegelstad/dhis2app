import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { setError,
         clearError,
         loadAndSetTEIS } from '../actions/actions';
// Containers
import TreelistContainer from './TreelistContainer';
import ToggleContainer from './ToggleContainer';
import ModeContainer from './ModeContainer';

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        // If the component state is set to isError we show the current error message
        if (this.props.error) {
            return (
                <div className="loading">
                    {`${this.props.error}  `}
                    <button onClick={() => this.props.clearError()}>Retry</button>
                </div>
            );
        }

        // If else, we render the app which includes the toggle, the treelist and the component container
        return (
            <div className="container">
                <div className="container-top">
                    <ToggleContainer/>
                </div>
                <div className="container-bottom">
                    <div className="content-left">
                        <p>Choose an organisation unit:</p>
                        <div className="treelist">
                            <TreelistContainer />
                        </div>
                        { this.props.treelistError }
                    </div>
                    <div className="middle-dividor" />
                    <div className="content-right">
                        <div className="component-wrapper">
                            <ModeContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Shorthand notation.
export default connect(
    state => ({
        error: state.error,
        treelistError: state.tree.error
    }),
    { setError,
      clearError,
      loadAndSetTEIS }
)(AppContainer);
