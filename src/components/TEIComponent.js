import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { mockdata } from './TEIComponent.mockdata';

class TEIComponent extends Component {
    constructor(...args) {
        super(...args);

        const columns = [
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
            data: mockdata,
            columns: columns
        };
    }

    render() {
        return (
            <ReactTable
                data={this.state.data}
                columns={this.state.columns}
                minRows={5}
                pageSize={5}
                pageSizeOptions={[5, 10]} // The available page size options
            />
        );
    }
}

export default TEIComponent;
