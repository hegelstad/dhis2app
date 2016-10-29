import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';

const data = {
    name: 'Sierra Leone',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' },
                        { name: 'nested child 3' },
                        { name: 'nested child 4' },
                        { name: 'nested child 5' },
                        { name: 'nested child 6' },
                        { name: 'nested child 7' },
                        { name: 'nested child 8' },
                        { name: 'nested child 9' },
                        { name: 'nested child 10' },
                        { name: 'nested child 11' },
                        { name: 'nested child 12' }
                    ]
                }
            ]
        }
    ]
};

export default class TreeList extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render(){
        return (
            <div>
                <Treebeard
                    data={data}
                    style={style}
                    onToggle={this.onToggle} />
            </div>
        );
    }
}
