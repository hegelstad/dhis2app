import React, { Component } from 'react';
// Utils
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit, loadOrganisationUnitsTree } from '../api';
import { sortChildren as sortTree } from '../utils/sortTree.js';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';
// Components
import SingletonComponent from './SingletonComponent';
import TEIComponent from './TEIComponent';
import ToggleComponent from './ToggleComponent';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        // Too keep most of this simple we gather most of the state in the root component
        // We would use Redux as well if so required by the applications constraints, if not it will only slow us down
        this.state = {
            isLoading: true,
            isError: false,
            errorMessage: "",
            treeData: null,
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
    }

    loadTree() {
        loadOrganisationUnitsTree()
            .then(treeData => {
                sortTree(treeData); // Sort the tree data to get all regions in the right order.
                treeData.toggled = true; // Toggle the root node to expand the tree.
                treeData.children[0].active = true; // Select the first child of the root node to be selected.
                this.setState({
                    isLoading: false,
                    treeData: treeData,
                    cursor: treeData.children[0] // Set the cursor to the node that was set to active.
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: "Fetching data failed - check DHIS CORS  "
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
            isLoading: true,
            isError: false,
            errorMessage: ""
        });
        this.loadTree();
    }

    // Toggle between singleton and TEI modes
    onToggleButton() {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        if (this.state.isLoading) {
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
                                data={this.state.treeData}
                                style={style}
                                onToggle={this.onToggle} />
                        </div>
                    </div>
                    <div className="middle-dividor" />
                    <div className="content-right">
                        <div className="component-wrapper">
                            {this.state.isToggled
                                ? <TEIComponent />
                                : <SingletonComponent cursor={this.state.cursor} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
