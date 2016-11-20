/*
 * Action types
 */

export const SET_APPLICATION_MODE = 'SET_APPLICATION_MODE';

/*
 * Other constants
 */

export const ApplicationModes = {
    SINGLETON_MODE: 'SINGLETON_MODE',
    TEI_MODE: 'TEI_MODE'
}

/*
 * Action creators
 */

export const setApplicationMode = (mode) => {
    return {
        type: SET_APPLICATION_MODE,
        mode
    };
}
