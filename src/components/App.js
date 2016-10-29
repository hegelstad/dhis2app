import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit, loadOrganisationUnitsWORKINPROGRESS } from '../api';
import TreeList from './TreeList';
import WelcomeComponent from './WelcomeComponent';
import { createSubSection, parseData } from '../utils/ReadTree';

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
            isSaving: false,
            isLoading: true,
            listLoading: true,
            items: [],
            listID: null,
            listDN: null,
            listCH: null
        };

        // Bind the functions that are passed around to the component
        this.onItemClick = this.onItemClick.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentDidMount() {
        this.loadTree();
    }

    loadTree() {
        loadOrganisationUnitsWORKINPROGRESS()
            .then(({ id, displayName, children }) => {
                this.setState({
                    isLoading: false,
                    listLoading: false,
                    listID: id,
                    listDN: displayName,
                    listCH: children,
                });
            });
    }

    loadOrganisationUnits() {
        // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
        loadOrganisationUnits()
            .then((organisationUnits) => {
                this.setState({
                    isLoading: false,
                    items: organisationUnits,
                });
            });
    }

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

    onClear() {
        // Set the component state to hide the welcome component
        this.setState({ isShowingWelcomeScreen: false });
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        if (this.state.isLoading) {
            return (
                <div className="loading">Loading data...</div>
                /*const mockData = {
                     name: 'loading...',
                     id: 0,
                     loading: true,
                     toggled: true}*/
            );
        }

        var dataToTree = parseData({
            id: this.state.listID,
            displayName: this.state.listDN,
            children: this.state.listCH
        });

        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
        return (
            <div className="container">
                <div className="left-content">
                    <p>Choose an organisation unit:</p>
                    <div className="treelist">
                        <TreeList data = {dataToTree}/>
                    </div>
                </div>
                <div className="middle-dividor"></div>
                <div className="right-content">
                    <div className="component-wrapper">
                        {this.state.isShowingWelcomeScreen
                            ? <WelcomeComponent onClear={this.onClear}/>
                        : <div ></div>}
                    </div>
                </div>
            </div>
        );
    }
}
