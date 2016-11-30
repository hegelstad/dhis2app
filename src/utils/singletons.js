export const formatDate = (moment) => {
    let date = "";
    date += moment.get('year') + '-';
    let m = moment.get('month') + 1;
    date += m + '-' + moment.get('date');
    return date;
}

export function extractSingletons(events) {
    var singletons = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].trackedEntityInstance == null)
            singletons.push(events[i]);
    }
    return singletons;
}

// export function checkForDuplicates(duplicates, threshold, singleton){
//     console.log(duplicates, singleton);
//     if(duplicates.length == 0)
//         return 0;
//     var a = FuzzySet([], true, 0);
//     for (let i = 0; i < duplicates.length; i++){
//         console.log("adding ", duplicates[i]);
//         a.add(duplicates[i]);
//     }
//     if (a.get(singleton) == null)
//         return 0;
//     if (a.get(singleton)[0][0] >= threshold)
//         return 1;
//     else
//         return 0;
// }

// export function extractDataValues(duplicateSet, dataElement){
//     var arrayDV = [];
//     for (let i=0; i < duplicateSet.length; i++){
//         var sDV = duplicateSet[i].dataValues;
//         for (let j = 0; j < sDV.length; j++){
//             if(sDV[j].dataElement == dataElement){
//                 arrayDV.push(sDV[j].value);
//             }
//         }
//     }
//     return arrayDV;
// }

// export function duplicates(singletons, threshold, dataElement){
//     var duplicates = [];
//     var duplicatesValues = [];
//     var retValue;
//     var r = [];
//     var setOfDuplicates = [];
//     var singletonDV;
//     for (let i=0; i < singletons.length; i++){
//         singletonDV = singletons[i].dataValues;
//         console.log("i: ", i);
//         console.log(singletons[i]);
//         for (let j = 0; j < singletonDV.length; j++)
//             if (singletonDV[j].dataElement == dataElement){
//                 var found = false;
//                 for (let k = 0; k < duplicates.length; k++){
//                     if (checkForDuplicates(extractDataValues(duplicates[k], dataElement), threshold, singletonDV[j].value)){
//                         found = true;
//                         console.log("found duplicate");
//                         duplicates[k].push(singletons[i]);
//                         break;
//                     }
//                 }
//                 if(found == false){
//                     console.log("didn't find duplicate");
//                     duplicates.push([singletons[i]]);
//                 }
//                 console.log(duplicates);
//             }

//     };
//    return duplicates;
// //     console.log(checkForDuplicates(['11'],0.6,"13"));
// //     return checkForDuplicates(['11'],0.6,"13");
//     // var a = FuzzySet(['0'], true, 0);
//     // console.log(a.get("0"));
//     // return a.get("1");
// }

function equalSingletons(singleton1, singleton2) {
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

                    // else
                    //     break;
                }
            }
            // someone erased all the duplicates, the condition is to be edited
            if (counter  > 2)
                return true;
        } else
            return false;
    } else
        return false;
}


function findDataElement(dataElements, criteria) {
    for (let i = 0; i < dataElements.length; i++) {
        if (dataElements[i].value == criteria)
            return dataElements[i].label;
    }
    return null;
}

export function convertSingleton(singleton, dataElements){
    var newData = '{ "event": "' + String(singleton.event) + '", ';
    var DV = singleton.dataValues;
    for (let i = 0; i < DV.length; i++){
        newData += '"' + String(findDataElement(dataElements, DV[i].dataElement)) + '": "' + String(DV[i].value) + '", ';
    }
    newData = newData.replace(/,\s*$/, "") //remove last comma.
    newData += '}'
    //problem:
    var json = JSON.stringify(newData);
    json = JSON.parse(json);
    return json;
}

export function convertData(singletons, dataElements) {
    var newSingletons = '{ "events": [';
    for (let i = 0; i < singletons.length; i++) {
       newSingletons += convertSingleton(singletons[i], dataElements) + ', ';
    }
    newSingletons = newSingletons.replace(/,\s*$/, "") //remove last comma.
    newSingletons += ']}';
    var json = JSON.stringify(newSingletons);
    console.log(JSON.parse(json));
}

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
    for (let i = 0; i < duplicates.length; i++){
    //     console.log('dupl length', duplicates.length);
    //     console.log('dupl[0]', duplicates[0].length);
        convertedDuplicates.push(convertData(duplicates[i], dataElements));
        }
    console.log(convertedDuplicates);
    return convertedDuplicates;
}
