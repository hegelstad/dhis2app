import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setError, clearError } from '../actions/actions';

// Utils
import { saveOrganisationUnit, loadOrganisationUnits, loadPrograms ,deleteOrganisationUnit, loadOrganisationUnitsTree, loadTrackedEntityInstances } from '../api';

// Containers
import TreelistContainer from './TreelistContainer';
import ToggleContainer from './ToggleContainer';
import ModeContainer from './ModeContainer';

import { teiList } from '../utils/TEI';

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        // Too keep most of this simple we gather most of the state in the root component
        // We would use Redux as well if so required by the applications constraints, if not it will only slow us down
        this.state = {
            isLoadingPrograms: true,
            // programData: null,
        };

        // Bind the functions that are passed around to the component
        this.onRetry = this.onRetry.bind(this);
    }

    componentDidMount() {
        this.loadProgs();
        this.loadTEIS();
    }

    loadProgs() {
        loadPrograms()
            .then(programData => {
                this.setState({
                    isLoadingPrograms: false,
                    programData: programData
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoadingPrograms: false,
                    isError: true,
                    errorMessage: "Loading programs failed."
                });
            });
    }

    // function for loading in TEIS. NOT SURE WHERE TO PLACE THIS SHIT.
    loadTEIS() {
        loadTrackedEntityInstances("DiszpKrYNg8")
            .then(teis => {
//                console.log(teiList(teis));
            })
            .catch(error => {
                console.log(error);

            });
        }

    // Retry loading
    onRetry() {
        this.setState({
            isLoadingTree: true,
            isLoadingPrograms: true,
        });
        this.loadProgs();
    }

    render() {
        // If the component state is set to isError we show the current error message
        if (this.props.error) {
            return (
                <div className="loading">
                    {this.props.error}
                    <button onClick={() => this.props.clearError()}>Clear Error</button>
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
                    </div>
                    <div className="middle-dividor" />
                    <div className="content-right">
                        <div className="component-wrapper">
                            <button onClick={() => this.props.setError("Test 123")}>Set Error</button>
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
        error: state.error
    }),
    { setError, clearError }
)(AppContainer);
