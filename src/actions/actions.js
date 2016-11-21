import { loadOrganisationUnitsTree } from '../api';
import { sortTree } from '../utils/sortTree.js';

/*
 * Action types
 */

export const MODE_TOGGLE = 'MODE_TOGGLE';
export const TREELIST_CURSOR_SET = 'TREELIST_CURSOR_SET';
export const TREE_DATA_LOAD_AND_SET = 'TREE_DATA_LOAD_AND_SET';


/*
 * Action creators
 */

export const toggleMode = () => {
    return {
        type: MODE_TOGGLE
    };
}

export const setTreelistCursor = (cursor) => {
    return {
        type: TREELIST_CURSOR_SET,
        cursor
    };
}

export const loadAndSetTreeData = () => {
    return dispatch => {
        return loadOrganisationUnitsTree().then(
            treeData => console.log(treeData)
            //treeData => dispatch(processTreeDataAndSetValidTreelistCursor(treeData)),
            // error => console.log("ERROR IN loadAndSetTreeData in actions.js")
        );
    };
}

const processTreeDataAndSetValidTreelistCursor = (treeData) => {
    return dispatch => {
        sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
        treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
        // If the first element in array has children, mark the first child as active/selected.
        if (treeData.organisationUnits[0].children[0]) {
            treeData.organisationUnits[0].children[0].active = true; // Select the first child of the root node to be selected.
            dispatch(setTreelistCursor(treeData.organisationUnits[0].children[0])) // Set the cursor to the node that was set to active.
        } else { // Else, mark the first element as active to avoid a null error.
            treeData.organisationUnits[0].active = true; // Select the first child of the root node to be selected.
            dispatch(setTreelistCursor(treeData.organisationUnits[0])) // Set the cursor to the node that was set to active.
        }
        dispatch(setTreeData(treeData))
    }
}

const setTreeData = (treeData) => {
    return {
        type: TREE_DATA_LOAD_AND_SET,
        treeData
    };
}
