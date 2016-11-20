import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { mockdata } from './TEIComponent.mockdata';
import { fakeAsyncCall } from '../utils/TEI';
import ProgramDropdownList from './ProgramDropdownList';
import { loadTrackedEntityInstances } from '../api'

class TEIComponent extends Component {
    constructor(...args) {
        super(...args);

        const columns = [ //columns must be defined before state initialization.
                {
                    header: 'Name',
                    accessor: 'name' // String-based value accessors !
                },
                {
                    header: 'Age',
                    accessor: 'age',
                    render: props =>
                        <span>
                            {`${props.value} ${this.state.data[props.index].checked} `}
                            <input
                                type="checkbox"
                                checked={this.state.data[props.index].checked}
                                onChange={() => { // Binds function to this
                                    let element = this.state.data.slice(props.index, props.index+1);
                                    element[0].checked = !props.row.checked;
                                    this.setState({
                                        data: [
                                            ...this.state.data.slice(0, props.index),
                                            ...element,
                                            ...this.state.data.slice(props.index + 1)
                                        ]
                                    })
                                }}
                            />
                        </span> // Custom cell components!
                },
                {
                    header: 'Friend Name',
                    accessor: 'friend.name'
                },
                {
                    header: 'Friend Age',
                    accessor: 'friend.age'
                }
            ]


        this.state = {
            isComponentHydrating: false,
            data: mockdata,
            columns: columns,
            program: "",
            programId: ""
        };

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(event) {
        console.log(event);

        this.setState({
            program: this.props.programData[event].displayName,
            programId: this.props.programData[event].id
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.isAppHydrating;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cursor !== this.state.cursor) {
            this.setState({ isComponentHydrating: true });
            this.getData(nextProps.cursor);
        } else {
            this.setState({ isComponentHydrating: false });
        }
    }

    getData(cursor) {
        // If fakeAsyncCall returns when this component is unmounted, an error is thrown.
        // Solutions, cancel promise when unmounting, use redux or move state and call to App component.
        //https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
        fakeAsyncCall(cursor.id)
            .then(data => {
                this.saveData(data);
            })
            .catch(nodata => {
                this.saveData(nodata);
            });
    }

    
    
    //loadTEIS(this.props.cursor.id, this.state.programId);

    saveData(data) {
        this.setState({
            isComponentHydrating: false,
            id: data
        });
    }

    render() {
        if (this.state.isComponentHydrating) {
            return <div className="loading">Loading data...</div>;
        }
      
        return (
            <div>
                <ReactTable
                    data={this.state.data}
                    columns={this.state.columns}
                    minRows={5}
                    pageSize={5}
                    pageSizeOptions={[5, 10]} // The available page size options
                />
                <div>name: {this.props.cursor.name}</div>
                <div>id: {this.props.cursor.id}</div>
                <div>reversed id: {this.state.id}</div>
                <br />
                <ProgramDropdownList
                    title={"Programs"}
                    list={this.props.programData}
                    i={0}
                    onSelect={this.onSelect}
                />
                <br />
                <br />
                <div className="selectedProgram">
                    <div>Program: {this.state.program}</div>
                    <div>Program: {this.state.programId}</div>
                </div>
            </div>
        );
    }
}

export default TEIComponent;
