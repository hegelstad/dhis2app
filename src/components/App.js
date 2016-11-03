import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit, loadOrganisationUnitsTree } from '../api';
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';
import WelcomeComponent from './WelcomeComponent';
import MergeComponent from './MergeComponent';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        // Too keep most of this simple we gather most of the state in the root component
        // We would use Redux as well if so required by the applications constraints, if not it will only slow us down
        this.state = {
            isShowingWelcomeScreen: true,
            isLoading: true,
            isError: false,
            errorMessage: "",
            treeData: null,
            cursor: null
        };

        // Bind the functions that are passed around to the component
        this.onToggle = this.onToggle.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onRetry = this.onRetry.bind(this);
    }

    componentDidMount() {
        this.loadTree();
    }

    loadTree() {
        loadOrganisationUnitsTree()
            .then((treeData) => {
                treeData.toggled = true;
                treeData.children[0].active = true;
                this.setState({
                    isLoading: false,
                    treeData: treeData,
                    cursor: treeData.children[0]
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: "Fetching data failed - check DHIS CORS  "
                });
            });
    }

    onToggle(node, toggled) {
        if(this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    onClear() {
        // Set the component state to hide the welcome component
        this.setState({ isShowingWelcomeScreen: false });
    }

    onRetry() {
        this.setState({
            isLoading: true,
            isError: false,
            errorMessage: ""
        });
        this.loadTree();
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

        // If else, we render the app which includes the treelist and the component container
        return (
            <div className="container">
                <div className="left-content">
                    <p>Choose an organisation unit:</p>
                    <div className="treelist">
                        <Treebeard
                            data={this.state.treeData}
                            style={style}
                            onToggle={this.onToggle} />
                    </div>
                </div>
                <div className="middle-dividor" />
                <div className="right-content">
                    <div className="component-wrapper">
                        {this.state.isShowingWelcomeScreen
                            ? <WelcomeComponent onClear={this.onClear}/>
                            : <MergeComponent cursor={this.state.cursor} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
