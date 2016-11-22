import { loadClinicIDArrayFromChiefdomOrganisationUnit, loadPrograms, loadOrganisationUnitsTree, loadTrackedEntityInstances } from '../api';
import { sortTree } from '../utils/sortTree.js';

/*
 * Action types
 */

export const MODE_TOGGLE = 'MODE_TOGGLE';
export const TREELIST_CURSOR_SET = 'TREELIST_CURSOR_SET';
export const TREELIST_DATA_FETCHING = 'TREELIST_DATA_FETCHING';
export const TREELIST_DATA_SET = 'TREELIST_DATA_SET';
export const TEI_DATA_SET = 'TEI_DATA_SET';
export const ERROR_SET = 'ERROR_SET';
export const ERROR_CLEAR = 'ERROR_CLEAR';

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

const setTreeDataFetching = () => {
    return {
        type: TREELIST_DATA_FETCHING
    }
}

const setTreeData = (treeData) => {
    return {
        type: TREELIST_DATA_SET,
        treeData
    };
}

const setTEIData = (TEIData) => {
    return {
        type: TEI_DATA_SET,
        TEIData
    }
}

export const setError = (message) => {
    return {
        type: ERROR_SET,
        message
    };
}

export const clearError = () => {
    return {
        type: ERROR_CLEAR
    };
}


/*
 * Thunks
 */

export const loadAndSetTEIS = (organisationUnit) => {
    return dispatch => {
        return loadClinicIDArrayFromChiefdomOrganisationUnit(organisationUnit).then(
            arrayOfClinicIds => {
                console.log(`Loading TEIS from these Ids: [${arrayOfClinicIds}].`);

                let resultArray = [];

                // Mapping function
                let mapItemToPromise = (item) => {
                    return loadTrackedEntityInstances(item)
                        .then(data => {
                            resultArray = resultArray.concat(data)
                        });
                    };

                // Create a promise for each item in the array
                let promises = arrayOfClinicIds.map(mapItemToPromise);

                // Makes sure each promise is resolved before continuing.
                let results = Promise.all(promises);

                // When (ALL) the results are in, dispatch the data.
                results.then(() => dispatch(setTEIData(resultArray)));
            },
            error => {
                dispatch(setError("Loading TEIS failed."))
                console.log(error)
            }
        );
    }
}

export const loadAndSetTreeData = () => {
    return dispatch => {
        return loadOrganisationUnitsTree().then(
            treeData => dispatch(processTreeDataAndSetValidTreelistCursor(treeData)),
            error => console.log(error)
        );
    };
}

/*
 * This function sorts the treeData, toggles the first node and
 * marks the first children of the first node as active and sets
 * the cursor to the first child of the first node if it exists.
 */
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
        dispatch(setTreeData(treeData));
    }
}
