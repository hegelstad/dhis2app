/**
 * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
 * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
 *
 * `basicAuth` contains the username and password to send with the request as
 * the basic authentication token. This is only needed when you develop locally
 * and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
 * You obviously should not do this for your production apps.
 */
const serverUrl = 'https://play.dhis2.org/dev/api';
const basicAuth = `Basic ${btoa('admin:district')}`;

/**
 * Default options object to send along with each request
 */
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json',
    },
};

/**
 * `fetch` will not reject the promise on the a http request that is not 2xx, as
 * those requests could also return valid responses. We will only treat status
 * codes in the 200 range as successful and reject the other responses.
 */
function onlySuccessResponses(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}

export function loadOrganisationUnitsTree() {
    // Load all of the organisation units and their children with id and displayName
    return fetch(`${serverUrl}/26/organisationUnits.json?level=1&paging=false&fields=id,level,displayName~rename(name),children[id,level,displayName~rename(name),children[id,level,displayName~rename(name),children[id,level,displayName~rename(name)]]]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        // Error handling is done in App.js
    }

export function loadClinicIDArrayFromChiefdomOrganisationUnit(organisationUnit) {
    // Load the organisation units but only the first level and does not use paging
    return fetch(`${serverUrl}/organisationUnits/${organisationUnit}.json?paging=false`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        // pick the organisationUnits property from the payload
        .then(({id, level, children}) => {
            if (level === 4) {
                return [id];
            }
            let arrayOfIds = [];
            for (let key in children) {
                arrayOfIds.push(children[key].id);
            }
            return arrayOfIds;
        });
}

export function loadOrganisationUnit(organisationUnit) {
    // Returns a given organisation unit.
    return fetch(`${serverUrl}/organisationUnits/${organisationUnit}.json`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json());
}

// function loading in TEIS based on program and orgUnit.
export function loadTrackedEntityInstances(orgUnit) {
    return fetch(`${serverUrl}/trackedEntityInstances.json?ou=${orgUnit}&fields=trackedEntityInstance,attributes[value,displayName]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ trackedEntityInstances }) => trackedEntityInstances);
}

export function loadLevel(orgUnitID) {
    return fetch(`${serverUrl}/organisationUnits/${orgUnitID}.json?fields=level`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ level }) => level);
}

export function loadEvents(orgUnitID, programID, startDate, endDate){
    return fetch(`${serverUrl}/events.json?orgUnit=${orgUnitID}&program=${programID}&startDate=${startDate}&endDate=${endDate}&fields=event,program,trackedEntityInstance,orgUnit,dataValues[dataElement,value]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ events }) => events);
}

export function loadDataElements(){
    return fetch(`${serverUrl}/dataElements.json?fields=id~rename(value),name~rename(label)&paging=false`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ dataElements }) => dataElements);
}
