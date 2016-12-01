/**
 * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
 * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
 *
 * `basicAuth` contains the username and password to send with the request as
 * the basic authentication token. This is only needed when you develop locally
 * and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
 * You obviously should not do this for your production apps.
 */
const serverUrl = 'https://play.dhis2.org/demo/api';
const basicAuth = `Basic ${btoa('admin:district')}`;

/**
 * Default options object to send along with each request
 */
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
    }
};

/**
 * Returns a post object with the body set to the parameter data.
 */
const postOptions = (data) => {
    return {
        method: 'POST',
        headers: {
            Authorization: basicAuth,
            'Content-Type': 'application/json',
            body: data
        }
    }
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

/**
 * Doesn't work, documentation doesn't cover adding namespaces.
 */
const makeNamespaceIfNotExists = (namespace, key) => {
    return fetch(`${serverUrl}/26/dataStore/${namespace}`, fetchOptions)
        .then(response => response.json())
        .then(response => {
            if(response.httpStatusCode === 404) {
                console.log("Namespace doesn't exist. Adding namespace and key.");
                const data = {
                    "foo":"bar"
                }
                return fetch(`${serverUrl}/26/dataStore/${namespace}/${key}`, postOptions(data))
                    .then(response => response.json())
                    .then(response => console.log(response));
            }
        });
}

/**
 * Function that takes an array of dataSets and maps them to a function that
 * uploads each set one by one to the dataStore.
 */
export function postDuplicateSets(dataSets) {
    makeNamespaceIfNotExists("CleanUpCrew", "duplicates");
    return;
    // Mapping function
    let mapItemToPromise = (set) => {
        return fetch(`${serverUrl}/26/dataStore/"CleanUpCrew"/${set.id}`, postOptions(set.data))
            .then(onlySuccessResponses)
            .then(response => response.json())
            .then(console.log(response))
        };

    // Create a promise for each item in the array.
    let promises = dataSets.map(mapItemToPromise);

    // Makes sure each promise is resolved before continuing.
    let results = Promise.all(promises);

    // When (ALL) the results are in, log a notification.
    results.then(console.log("finished"));
}

/**
 * Loads the organisation units as a tree structure from the server.
 * The server renames som values to fit with the Treebard component.
 */
export function loadOrganisationUnitsTree() {
    // Load all of the organisation units and their children with id and displayName
    return fetch(`${serverUrl}/organisationUnits.json?level=1&paging=false&fields=id,level,displayName~rename(name),children[id,level,displayName~rename(name),children[id,level,displayName~rename(name),children[id,level,displayName~rename(name)]]]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
}

/**
 * Loads an array of ids of clinics from a chiefdom org.
 */
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

/**
 * Loads a single given organisation unit.
 */
export function loadOrganisationUnit(organisationUnit) {
    // Returns a given organisation unit.
    return fetch(`${serverUrl}/organisationUnits/${organisationUnit}.json`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json());
}

/**
 * Loads a organisation unit's tracked entity instances.
 */
export function loadTrackedEntityInstances(orgUnit) {
    return fetch(`${serverUrl}/trackedEntityInstances.json?ou=${orgUnit}&fields=trackedEntityInstance,attributes[value,displayName]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ trackedEntityInstances }) => trackedEntityInstances);
}

/**
 * Loads all programs.
 */
export function loadPrograms() {
    return fetch(`${serverUrl}/25/programs.json`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ programs }) => programs);
}

/**
 * Loads events from a given organisationUnit within a time frame.
 */
export function loadEvents(orgUnitID, startDate, endDate){
    return fetch(`${serverUrl}/events.json?orgUnit=${orgUnitID}&startDate=${startDate}&endDate=${endDate}&fields=event,program,trackedEntityInstance,orgUnit,dataValues[dataElement,value]`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ events }) => events);
}

/**
 * Loads data elements.
 */
export function loadDataElements(){
    return fetch(`${serverUrl}/dataElements.json?fields=id~rename(value),name~rename(label)&paging=false`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ dataElements }) => dataElements);
}
