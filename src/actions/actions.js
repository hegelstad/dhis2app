export const SET_APPLICATION_MODE = 'SET_APPLICATION_MODE';

export const ApplicationModes = {
    SINGLETON_MODE: 'SINGLETON_MODE',
    TEI_MODE: 'TEI_MODE'
}

export function setApplicationMode(mode) {
    return { type: SET_APPLICATION_MODE, mode }
}
