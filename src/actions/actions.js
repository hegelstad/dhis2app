import { loadOrganisationUnitsTree } from '../api';
import { sortTree } from '../utils/sortTree.js';

/*
 * Action types
 */

export const MODE_TOGGLE = 'MODE_TOGGLE';
export const TREELIST_CURSOR_SET = 'TREELIST_CURSOR_SET';
export const TREELIST_DATA_SET = 'TREELIST_DATA_SET';


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
            treeData => dispatch(setTreeData(treeData)),
            error => console.log(error)
        );
    };
}

const processTreeDataAndSetValidTreelistCursor = (treeData) => {
    return dispatch => {
        sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
        dispatch(setTreeData(treeData));
        treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
        // If the first element in array has children, mark the first child as active/selected.
        if (treeData.organisationUnits[0].children[0]) {
            treeData.organisationUnits[0].children[0].active = true; // Select the first child of the root node to be selected.
            dispatch(setTreelistCursor(treeData.organisationUnits[0].children[0])) // Set the cursor to the node that was set to active.
        } else { // Else, mark the first element as active to avoid a null error.
            treeData.organisationUnits[0].active = true; // Select the first child of the root node to be selected.
            dispatch(setTreelistCursor(treeData.organisationUnits[0])) // Set the cursor to the node that was set to active.
        }
    }
}

const setTreeData = (treeData) => {
    return {
        type: TREELIST_DATA_SET,
        treeData
    };
}
