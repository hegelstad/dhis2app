// API calls
import { loadClinicIDArrayFromChiefdomOrganisationUnit,
         loadPrograms,
         loadDataElements,
         loadEvents,
         loadOrganisationUnitsTree,
         loadTrackedEntityInstances } from '../api';
// Utilities
import { sortTree } from '../utils/sortTree.js';
import { formatDate, extractSingletons, duplicates } from '../utils/singletons.js';
import { teiDuplicateFinder } from '../utils/TEI';


/*
 * Action types
 */

export const MODE_TOGGLE = 'MODE_TOGGLE';

export const TREELIST_CURSOR_SET = 'TREELIST_CURSOR_SET';
export const TREELIST_DATA_SET = 'TREELIST_DATA_SET';
export const TREELIST_ERROR_SET = 'TREELIST_ERROR_SET';
export const TREELIST_ERROR_CLEAR = 'TREELIST_ERROR_CLEAR';

export const TEI_DUPLICATE_DATA_SET = 'TEI_DUPLICATE_DATA_SET';
export const TEI_DUPLICATE_DATA_REMOVE = 'TEI_DUPLICATE_DATA_REMOVE';
export const TEI_DUPLICATE_SEARCHING = 'TEI_DUPLICATE_SEARCHING';

export const PROGRAM_DATA_SET = 'PROGRAM_DATA_LOAD';
export const PROGRAM_CURSOR_SET = 'PROGRAM_CURSOR_SET';

export const SINGLETON_DATA_ELEMENTS_SET = 'SINGLETON_DATA_ELEMENTS_SET';
export const SINGLETON_EVENTS_SET = 'SINGLETON_EVENTS_SET';
export const SINGLETON_STARTDATE_SET = 'SINGLETON_STARTDATE_SET';
export const SINGLETON_ENDDATE_SET = 'SINGLETON_ENDDATE_SET';

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

export const setTreeError = (message) => {
    return {
        type: TREELIST_ERROR_SET,
        message
    };
}

export const clearTreeError = () => {
    return {
        type: TREELIST_ERROR_CLEAR
    };
}

const setDuplicates = (duplicates) => {
    return {
        type: TEI_DUPLICATE_DATA_SET,
        duplicates
    }
}

export const removeDuplicates = () => {
    return {
        type: TEI_DUPLICATE_DATA_REMOVE
    }
}

export const setDuplicatesAreLoading = () => {
    return {
        type: TEI_DUPLICATE_SEARCHING
    }
}

const setProgramData = (programData) => {
    return {
        type: PROGRAM_DATA_SET,
        programData
    }
}

export const setProgramCursor = (program) => {
    return {
        type: PROGRAM_CURSOR_SET,
        program
    }
}

const setSingletonDataElements = (dataElements) => {
    return {
        type: SINGLETON_DATA_ELEMENTS_SET,
        dataElements
    }
}

const setSingletonEvents = (singletonEvents) => {
    return {
        type: SINGLETON_EVENTS_SET,
        singletonEvents
    }
}

export const setStartDate = (startDate) => {
    startDate = formatDate(startDate);
    return {
        type: SINGLETON_STARTDATE_SET,
        startDate
    }
}

export const setEndDate = (endDate) => {
    endDate = formatDate(endDate);
    return {
        type: SINGLETON_ENDDATE_SET,
        endDate
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

export const loadSingletonDataElements = () => {
    return dispatch => {
        return loadDataElements()
            .then(dataElements => {
                dispatch(setSingletonDataElements(dataElements))
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const loadSingletonEvents = (orgUnitID, programID, startDate, endDate) => {
    return dispatch => {
        return loadEvents(orgUnitID, programID, startDate, endDate)
            .then(events => {
                let singletons = extractSingletons(events)
                dispatch(setSingletonEvents(singletons))
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const performSearch = (modus, organisationUnit, threshold) => {
    return dispatch => {
        dispatch(setDuplicatesAreLoading()) // set searching to true.
        return loadClinicIDArrayFromChiefdomOrganisationUnit(organisationUnit)
            .then(arrayOfClinicIds => {
                console.log(`Loading TEIS from these Ids: [${arrayOfClinicIds}].`);

                let resultArray = [];

                // Mapping function
                let mapItemToPromise = (item) => {
                    return loadTrackedEntityInstances(item) // Loads tracked entity instances.
                        .then(data => {
                            resultArray = resultArray.concat(data) // Add new instances to resultArray.
                        });
                    };

                // Create a promise for each item in the array.
                let promises = arrayOfClinicIds.map(mapItemToPromise);

                // Makes sure each promise is resolved before continuing.
                let results = Promise.all(promises);

                // When (ALL) the results are in, perform the search.
                results.then(results => {
                    let duplicates = teiDuplicateFinder(modus, resultArray, threshold)
                    dispatch(setDuplicates(duplicates))
                });
            })
            .catch(error => {
                dispatch(setError("Loading TEIS failed."))
                console.log(error)
            });
    }
}

export const loadAndSetTreeData = () => {
    return dispatch => {
        return loadOrganisationUnitsTree()
            .then(treeData => {
                sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
                treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
                dispatch(setTreeData(treeData));
            })
            .catch(error => {
                console.log(error)
            });
    }
}
