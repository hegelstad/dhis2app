import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTreelistCursor, loadAndSetTreeData } from '../actions/actions';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';

const data = {
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
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

class TreelistContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cursor: null,
            isLoading: true
        }
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount () {
        this.props.loadAndSetTreeData();
        this.setState({
            isLoading: false
        });
    }

    onToggle(node, toggled) {
        if(this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({
            cursor: node
        });
        this.props.setTreelistCursor(node);
    }

    render() {
        if (this.state.isLoading) {
            return <div></div>;
        } else {
            console.log(this.props.treeData);
            console.log(data);
            return (
                <div>
                    <Treebeard
                        style={style}
                        data={data}
                        onToggle={this.onToggle} />
                </div>
            );
        }
    }
}

// Example to show the power of ES6.
// const mapStateToProps = (state) => {
//     return { applicationMode: state.applicationMode };
// }
const mapStateToProps = (state) => {
    return {
        treeData: state.tree.treeData
    }
}

export default connect(
    mapStateToProps,
    { setTreelistCursor, loadAndSetTreeData }
)(TreelistContainer);
