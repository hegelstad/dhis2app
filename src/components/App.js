import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit, loadOrganisationUnitsTree } from '../api';
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';
import WelcomeComponent from './WelcomeComponent';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isShowingWelcomeScreen: true,
            isLoading: true,
            data: null
        };

        // Bind the functions that are passed around to the component
        this.onToggle = this.onToggle.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentDidMount() {
        this.loadTree();
    }

    loadTree() {
        loadOrganisationUnitsTree()
            .then((treeData) => {
                this.setState({
                    isLoading: false,
                    data: treeData
                });
            });
    }

    onToggle(node, toggled) {
        if(this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
        console.log(node.name);
    }

/*
    onItemClick(item) {
        // Remove the item from the local list.
        // This will make it seem like it was deleted while we wait for the actual delete to complete.
        this.setState({
            items: this.state.items
                .filter(organisationUnit => item.id !== organisationUnit.id)
        });

        // Delete the organisationUnit from the server. If it fails show a message to the user.
        deleteOrganisationUnit(item)
            .catch(() => alert(`Could not delete organisation unit ${item.displayName}`))
            // In all cases (either success or failure) after deleting reload the list.
            .then(() => this.loadOrganisationUnits());
    }
*/

    onClear() {
        // Set the component state to hide the welcome component
        this.setState({ isShowingWelcomeScreen: false });
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        if (this.state.isLoading) {
            return (
                <div className="loading">Loading data...</div>
            );
        }

        // Render the app which includes the treelist and the component container.
        return (
            <div className="container">
                <div className="left-content">
                    <p>Choose an organisation unit:</p>
                    <div className="treelist">
                        <Treebeard
                            data={this.state.data}
                            style={style}
                            onToggle={this.onToggle} />
                    </div>
                </div>
                <div className="middle-dividor"></div>
                <div className="right-content">
                    <div className="component-wrapper">
                        {this.state.isShowingWelcomeScreen
                            ? <WelcomeComponent onClear={this.onClear}/>
                        : <div>placeholder</div>}
                    </div>
                </div>
            </div>
        );
    }
}
