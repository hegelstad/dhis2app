import React, { Component } from 'react';
// Utils
import { saveOrganisationUnit, loadOrganisationUnits, loadPrograms ,deleteOrganisationUnit, loadOrganisationUnitsTree, loadTrackedEntityInstances } from '../api';
import { sortTree } from '../utils/sortTree.js';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';
// Components
import SingletonComponent from './SingletonComponent';
import TEIComponent from './TEIComponent';
import ToggleComponent from './ToggleComponent';
import { teiDuplicateFinder } from '../utils/TEI';


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
            treeData: null,
            programData: null,
            cursor: null,
            isToggled: true // defaults to TEI mode. Singleton = false
        };

        // Bind the functions that are passed around to the component
        this.onToggle = this.onToggle.bind(this);
        this.onRetry = this.onRetry.bind(this);
        this.onToggleButton = this.onToggleButton.bind(this);
    }

    componentDidMount() {
        this.loadTree();
        this.loadProgs();
        this.loadTEIS();
    }

    loadTree() {
        loadOrganisationUnitsTree()
            .then(treeData => {
                sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
                treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
                // If the first element in array has children, mark the first child as active/selected.
                if (treeData.organisationUnits[0].children[0]) {
                    treeData.organisationUnits[0].children[0].active = true; // Select the first child of the root node to be selected.
                    this.setState({
                        cursor: treeData.organisationUnits[0].children[0] // Set the cursor to the node that was set to active.
                    });

                } else { // Else, mark the first element as active to avoid a null error.
                    treeData.organisationUnits[0].active = true; // Select the first child of the root node to be selected.
                    this.setState({
                        cursor: treeData.organisationUnits[0] // Set the cursor to the node that was set to active.
                    });
                }


                this.setState({
                    isLoadingTree: false,
                    treeData: treeData.organisationUnits
                });


            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoadingTree: false,
                    isError: true,
                    errorMessage: "Fetching data failed - check DHIS CORS  "
                });
            });
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
                teiDuplicateFinder(teis);
            })
            .catch(error => {
                console.log(error);

                this.setState({
                    isError: true,
                    errorMessage: "Failed to fetch TEIS"
                });
            });
        }


    // Treelist toggle function
    onToggle(node, toggled) {
        if(this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
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

    // Toggle between singleton and TEI modes
    onToggleButton() {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        if (this.state.isLoadingTree || this.state.isLoadingPrograms) {
            return (
                <div className="loading">Loading data...</div>
            );
        }

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
                    <ToggleComponent
                        isToggled={this.state.isToggled}
                        onToggleButton={this.onToggleButton} />
                </div>
                <div className="container-bottom">
                    <div className="content-left">
                        <p>Choose an organisation unit:</p>
                        <div className="treelist">
                            <Treebeard
                                style={style}
                                data={this.state.treeData}
                                onToggle={this.onToggle} />
                        </div>
                    </div>
                    <div className="middle-dividor" />
                    <div className="content-right">
                        <div className="component-wrapper">
                            {this.state.isToggled
                                ? <TEIComponent
                                    cursor={this.state.cursor}
                                    programData={this.state.programData}
                                    />
                                : <SingletonComponent cursor={this.state.cursor}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
