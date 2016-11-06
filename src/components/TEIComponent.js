import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';

const data = [{
    name: '0 Tanner Linsley',
    age: 26,
    checked: false,
    friend: {
        name: 'Jason Maurer',
        age: 23
    }
},{
    name: '1 Banner Dansley',
    age: 19,
    checked: false,
    friend: {
        name: 'Jason Mraz',
        age: 30
    }
},{
    name: '2 Nikolai Hegelstad',
    age: 22,
    checked: false,
    friend: {
        name: 'Eirik Berg Nordheim',
        age: 25
    }
},{
    name: '3 Brad Pitt',
    age: 40,
    checked: true,
    friend: {
        name: 'Jason Mraz',
        age: 30
    }
},{
    name: '4 Nikolai Hegelstad',
    age: 22,
    checked: false,
    friend: {
        name: 'Eirik Berg Nordheim',
        age: 25
    }
},{
    name: '5 Brad Pitt',
    age: 40,
    checked: true,
    friend: {
        name: 'Jason Mraz',
        age: 30
    }
}]

const columns = [{
  header: 'Name',
  accessor: 'name' // String-based value accessors !
}, {
  header: 'Age',
  accessor: 'age',
  render: props =>
        <span>
            {`${props.value} ${data[props.index].checked} `}
            <input
                type="checkbox"
                defaultChecked={data[props.index].checked}
                onChange={() => {
                    //data[props.index] = !props.row.checked;
                    console.log(props);
                }}
            />
        </span> // Custom cell components!
}, {
  header: 'Friend Name',
  accessor: 'friend.name' // Custom value accessors!
}, {
  header: 'Friend Age',
  //header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

class TEIComponent extends Component {
    constructor(...args) {
        super(...args);

    }

    render() {
        return (
            <ReactTable
                data={data}
                columns={columns}
                minRows={5}
                pageSize={5}
                pageSizeOptions={[5, 10]} // The available page size options
            />
        );
    }
}

export default TEIComponent;
