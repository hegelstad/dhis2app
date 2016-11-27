import { loadClinicIDArrayFromChiefdomOrganisationUnit, loadPrograms, loadOrganisationUnitsTree, loadTrackedEntityInstances } from '../api';
import { sortTree } from '../utils/sortTree.js';

/*
 * Action types
 */

export const MODE_TOGGLE = 'MODE_TOGGLE';
export const TREELIST_CURSOR_SET = 'TREELIST_CURSOR_SET';
export const TREELIST_DATA_SET = 'TREELIST_DATA_SET';
export const TREELIST_ERROR_SET = 'TREELIST_ERROR_SET';
export const TREELIST_ERROR_CLEAR = 'TREELIST_ERROR_CLEAR';
export const TEI_DATA_SET = 'TEI_DATA_SET';
export const PROGRAM_DATA_SET = 'PROGRAM_DATA_LOAD';
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

const setTreeData = (treeData) => {
    return {
        type: TREELIST_DATA_SET,
        treeData
    };
}

export const setTreeError = () => {
    return {
        type: TREELIST_ERROR_SET
    };
}

export const clearTreeError = () => {
    return {
        type: TREELIST_ERROR_CLEAR
    };
}

const setTEIData = (TEIData) => {
    return {
        type: TEI_DATA_SET,
        TEIData
    }
}

const setProgramData = (programData) => {
    return {
        type: PROGRAM_DATA_SET,
        programData
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
export const loadProgramData = () => {
    return dispatch => {
        return loadPrograms()
            .then(programData => {
                dispatch(setProgramData(programData))
            })
            .catch(error => {
                console.log(error)
            });
    }
}

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
        return loadOrganisationUnitsTree()
            .then(treeData => {
                dispatch(processTreeData(treeData))
            })
            .catch(error => {
                console.log(error)
            });
    }
}

/*
 * This function sorts the treeData and toggles the first node.
 */
const processTreeData = (treeData) => {
    return dispatch => {
        sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
        treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
        dispatch(setTreeData(treeData));
    }
}
