import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTreelistCursor,
         loadAndSetTreeData,
         setTreeError,
         clearTreeError,
         loadAndSetTEIS } from '../actions/actions';
import { loadOrganisationUnit } from '../api';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';
// React-spinnere
import Spinner from 'react-spinner';

class TreelistContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cursor: null
        }

        this.onToggle = this.onToggle.bind(this);
    }

    componentWillMount() {
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
        // Set the selected cursor in the redux state.
        this.props.setTreelistCursor(node);
        // Check which level the node is.
        if(node.level === 3 || node.level === 4) {
            this.props.loadAndSetTEIS(node.id); // Load data if valid node level.
            this.props.clearTreeError();
        } else {
            console.log("Select a chiefdom or clinic to load data");
            this.props.setTreeError(); // Set an error if the node level is wrong.
        }
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

// Shorthand notation.
export default connect(
    state => ({
        treeData: state.tree.treeData
    }),
    { setTreelistCursor,
      loadAndSetTreeData,
      setTreeError,
      clearTreeError,
      loadAndSetTEIS }
)(TreelistContainer);
