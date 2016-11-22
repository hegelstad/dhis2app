import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTreelistCursor, loadAndSetTreeData } from '../actions/actions';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';

class TreelistContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cursor: null,
        }
        
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount () {
        this.props.loadAndSetTreeData();
    }

    // Function required by Treebeard.
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
        return (
            <Treebeard
                style={style}
                data={this.props.treeData}
                onToggle={this.onToggle} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        treeData: state.tree.treeData
    }
}

export default connect(
    mapStateToProps,
    { setTreelistCursor, loadAndSetTreeData } // Shorthand notation.
)(TreelistContainer);
