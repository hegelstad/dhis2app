import React from 'react';

// convert format date to a format which is useful for api calls
export const formatDate = (moment) => {
    let date = "";
    date += moment.get('year') + '-';
    let m = moment.get('month') + 1;
    date += m + '-' + moment.get('date');
    return date;
}

// since there is no api call for fetching ONLY singletons, load all events, and remove the ones
// without trackedEntityInstance
export function extractSingletons(events) {
    var singletons = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].trackedEntityInstance == null)
            singletons.push(events[i]);
    }
    return singletons;
}

// compares two singleton events. we assume the events are duplicates if they are EXACTLY the same, and they are 
// enrolled in the same program
function equalSingletons(singleton1, singleton2) {
    //console.log(singleton1);
    if (singleton1.program == singleton2.program) {
        var dataValues1 = singleton1.dataValues;
        var dataValues2 = singleton2.dataValues;
        var counter = 0;
        if (dataValues1.length == dataValues2.length) {
            for (let i = 0; i < dataValues1.length; i++) {
                for (let j = 0; j < dataValues2.length; j++) {
                    if (dataValues1[i].dataElement == dataValues2[j].dataElement)
                        if (dataValues1[i].value == dataValues2[j].value) {
                            counter++;
                        }

                }
            }
            if (counter == dataValues1.length)
                return true;
        } else
            return false;
    } else
        return false;
}

// find the name of the dataElement, only to use that after to replace the id of the dataElement
function findDataElement(dataElements, criteria) {
    for (let i = 0; i < dataElements.length; i++) {
        if (dataElements[i].value == criteria)
            return dataElements[i].label;
    }
    return null;
}

// convert singleton event to display event id, and data elements using their actual name (instead of their ids)
function convertSingleton(singleton, dataElements) {
    var newData = '{ "event": "' + String(singleton.event) + '", ';
    var DV = singleton.dataValues;
    for (let i = 0; i < DV.length; i++) {
        newData += '"' + String(findDataElement(dataElements, DV[i].dataElement)).replace(/ /g, '') + '": "' + String(DV[i].value) + '", ';
    }
    newData = newData.replace(/,\s*$/, "") //remove last comma.
    newData += '}';
    return newData;
}

// convert set of singletons
function convertData(singletons, dataElements) {
    var newSingletons = '[';
    for (let i = 0; i < singletons.length; i++) {
        newSingletons += convertSingleton(singletons[i], dataElements) + ', ';
    }
    newSingletons = newSingletons.replace(/,\s*$/, "") //remove last comma.
    newSingletons += ']';
    return JSON.parse(newSingletons);
}

// extract the keys from data, to be able to show singletons using AccordionList
function getKeysFromDuplicateSet(duplicateSet) {
    var keysSet = [];
    for (let i = 0; i < duplicateSet.length; i++) {
        var singleton = duplicateSet[i];
        for (var key in singleton)
            if (!keysSet.includes(key))
                keysSet.push(key);
    }
    return keysSet;
}

// creating columns for Accordion (for React Table actually)
function makeColumnsfromSet(duplicateSet) {
    var keysSet = getKeysFromDuplicateSet(duplicateSet);
    var columns = [];
    var dupl = {
        header: 'Duplicate?',
        render: props =>
            <span>
                <input
                    type="checkbox"
                    onChange={(val) => { console.log(val) } } // Binds function to this
                    />
            </span>
    };
    columns.push(dupl);
    for (let i = 0; i < keysSet.length; i++) {
        var h = keysSet[i];
        var a = keysSet[i].replace(/\s+/g, '');
        var newColumn = {
            header: h,
            accessor: a
        }
        columns.push(newColumn);
    }
    return columns;
}

export function makeColumns(duplicates) {
    var columns = [];
    for (let i = 0; i < duplicates.length; i++)
        columns.push(makeColumnsfromSet(duplicates[i]));
    return columns;
}

// find duplicates within one clinic
export function duplicates(singletons, dataElements) {
    // console.log(singletons);
    var duplicates = [];
    var marked = new Array(singletons.length).fill(0);
    for (let i = 0; i < singletons.length; i++) {
        var dupes = [];
        dupes.push(singletons[i]);
        for (let j = i + 1; j < singletons.length; j++) {
            if (marked[j] == 0) {
                if (equalSingletons(singletons[i], singletons[j])) {
                    marked[i] = 1;
                    marked[j] = 1;
                    dupes.push(singletons[j]);
                }
            }

        }
        if (dupes.length >= 2)
            duplicates.push(dupes);
    }
    var convertedDuplicates = [];
    for (let i = 0; i < duplicates.length; i++) {
        var convertedDup = convertData(duplicates[i], dataElements);
        convertedDuplicates.push(convertedDup);
        makeColumns(convertedDup);
    }
    return convertedDuplicates;
}
