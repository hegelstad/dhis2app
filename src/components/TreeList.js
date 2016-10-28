import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';



export default class TreeList extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
        this.data = this.props.data;
        console.log(this.props);
        console.log("in constructor " + this.props.data);
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render(){
        return (
            <Treebeard
                data={this.data}
                onToggle={this.onToggle}
            />
        );
    }
}




// Required datastructure example:
/*
const data2 = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
    ]
};*/