import React, { Component } from 'react';

// Utils
import { saveOrganisationUnit, loadOrganisationUnits, loadPrograms ,deleteOrganisationUnit, loadOrganisationUnitsTree, loadTrackedEntityInstances } from '../api';

// Containers
import TreelistContainer from '../containers/TreelistContainer';
import ToggleContainer from '../containers/ToggleContainer';
import ModeContainer from '../containers/ModeContainer';

import { teiList } from '../utils/TEI';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        // Too keep most of this simple we gather most of the state in the root component
        // We would use Redux as well if so required by the applications constraints, if not it will only slow us down
        this.state = {
            isLoadingTree: true,
            isLoadingPrograms: true,
            isError: false,
            errorMessage: "",
            // programData: null,
        };

        // Bind the functions that are passed around to the component
        this.onRetry = this.onRetry.bind(this);
        // this.onToggleButton = this.onToggleButton.bind(this);
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

                this.setState({
                    isError: true,
                    errorMessage: "Failed to fetch TEIS"
                });
            });
        }

    // Retry loading
    onRetry() {
        this.setState({
            isLoadingTree: true,
            isLoadingPrograms: true,
            isError: false,
            errorMessage: ""
        });
        this.loadTree();
        this.loadProgs();
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        // if (this.state.isLoadingTree || this.state.isLoadingPrograms) {
        //     return (
        //         <div className="loading">Loading data...</div>
        //     );
        // }

        // If the component state is set to isError we show the current error message
        if (this.state.isError) {
            return (
                <div className="loading">
                    {this.state.errorMessage}
                    <button onClick={this.onRetry}>Retry</button>
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
                            <ModeContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
