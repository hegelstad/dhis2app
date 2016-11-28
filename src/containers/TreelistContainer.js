import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { setTreelistCursor,
         loadAndSetTreeData,
         setTreeError,
         clearTreeError,
         loadAndSetTEIS,
         loadSingletonEvents } from '../actions/actions';
// Treebeard
import { Treebeard } from 'react-treebeard';
import style from '../css/treelist-style.js';

class TreelistContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cursor: null
        }

        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        this.props.loadAndSetTreeData();
    }

    // Function ran when you select any node in the tree.
    onToggle(node, toggled) {
        if(this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({
            cursor: node
        }); // ^Treebeard-logic.

        // Set the selected cursor in the redux state.
        this.props.setTreelistCursor(node);

        // Check which level the node is before loading data.
        if(node.level === 3 || node.level === 4) {
            this.props.loadAndSetTEIS(node.id); // Load TEI-related data if valid node level.
            this.props.clearTreeError(); // Clear the error text.
        } else {
            console.log("Select a chiefdom or clinic to load data.");
            this.props.setTreeError("Please select a chiefdom or clinic to check for duplicates."); // Set an error if the node level is wrong.
        }

        if(!this.props.currentMode) { // If current mode equals to singleton mode.
            if(node.level === 4) { // If a clinic is being selected.
                this.props.clearTreeError(); // Clear the error text if right level is selected.
            } else {
                console.log("Select a clinic to load data.");
                this.props.setTreeError("Please select a clinic to check for duplicates.");
            }
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
        treeData: state.tree.treeData,
        currentMode: state.isToggled,
        cursor: state.tree.cursor,
        program: state.program,
        singleton: state.singleton
    }),
    { setTreelistCursor,
      loadAndSetTreeData,
      setTreeError,
      clearTreeError,
      loadAndSetTEIS }
)(TreelistContainer);
