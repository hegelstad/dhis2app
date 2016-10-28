import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit, loadOrganisationUnitsWORKINPROGRESS, process, traverse } from '../api';
import List from './List';
import Form from './Form';
import TreeList from './TreeList';
import { createSubSection, parseData } from '../utils/ReadTree';
import { Treebeard } from 'react-treebeard';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
            isLoading: true,
            listLoading: true,
            items: [],
            
        };

        // Bind the functions that are passed around to the component
        this.onItemClick = this.onItemClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadOrganisationUnits();
        this.loadTree();
    }


    loadTree() {
        loadOrganisationUnitsWORKINPROGRESS()
            .then(({ id, displayName, children }) => {
                this.setState({
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

    onSubmit(formData) {
        // Set the component state to saving
        this.setState({ isSaving: true });

        // Save the organisation unit to the api
        saveOrganisationUnit(formData)
            .then(() => this.loadOrganisationUnits())
            .catch(() => alert(`Could save organisation unit ${item.displayName}`))
            .then(() => this.setState({ isSaving: false })); // After either success or failure set the isSaving state to false
    }

    render() {
        // If the component state is set to isLoading we hide the app and show a loading message
        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
       
       
        if (this.state.listLoading){
           // Implemented a mock tree if it wasn't fully loaded,
           // but there seemed to be some problems with then later on refreshing the complete tree..
           /*const mockData = {
                name: 'loading...',
                id: 0,
                loading: true,
                toggled: true}*/

            return(
            <div >
               Loading...
            </div>);
        }

        var dataToTree = parseData({
            id: this.state.listID,
            displayName: this.state.listDN,
            children: this.state.listCH
        });

        return (
            <div className="app">
                <TreeList 
                    data = {dataToTree}
s                />

                <List
                    onItemClick={this.onItemClick}
                    items={this.state.items}
                />*/
                {this.state.isSaving ? <div>Saving organisation unit</div> : <Form onSubmit={this.onSubmit} />}
            </div>
        );
    }
}
