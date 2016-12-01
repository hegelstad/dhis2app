import Fuse from 'fuse.js';

// Might be redundant now with redux:
export function fakeAsyncCall(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(s), 3000);
    });
}

export function teiDuplicateFinder(boolSwitch, OrgUnit, threshold) {
    /*
        Function finding duplicates within a given org unit.
        Utilizing Fuse.js.

        Solution might not be optimal due to having to search through the data twice,
        although, the first search limits the scope of the second by so much that the computation
        cost for the second search is negligible.
    */

    /* First step is to rewrite our JSON structure, 
        for easier access by multiple components later on*/
        
    var newTEIS = []
    for (let tei = 0; tei < OrgUnit.length; tei++) {
        var entry = OrgUnit[tei].attributes;

        var collection = {
                trackedEntityInstance: OrgUnit[tei].trackedEntityInstance}

        for (let attri = 0; attri < entry.length; attri ++){
            var val = (entry[attri].displayName).replace(/ /g, '');
            collection[val] = entry[attri].value

        }
        newTEIS.push(collection);
    }

   /* FUSE.JS implementation
    option parameter, decides what keys to search within,
    threshold etc. */
    var options = {
    shouldSort: true,
    caseSensitve: true,
    tokenize: true,
    location: 0,
    distance: 20,
    maxPatternLength: 32,
    keys: [
        'Lastname',
        'Firstname',
        ]
    };

    options.threshold = threshold;

    /* Second step iterates through the list of all objects,
        finds the first and last name and then searches the entire list
        for duplicates of these. First by the last name, we search the list
        of surnames for matching first name. */

    var duplicates = []
    for (let tei = 0; tei < newTEIS.length; tei++) {
        var entry = newTEIS[tei];
        var firstname = "";
        var lastname = "";

        if (entry.Firstname) {
            firstname = entry.Firstname;
        }

        if (entry.Lastname) {
            lastname = entry.Lastname;
        }

        var fuse = new Fuse(newTEIS, options);
        var output = fuse.search(lastname);
        var fuse1 = new Fuse(output, options);
        var output1 = fuse1.search(firstname);

        if (output1.length > 1) {
            duplicates.push(output1)
        }
    }

    if (boolSwitch === "Deep"){
        return thoroughSearch(duplicates);
    } else {
        return duplicates;
    }

}

function thoroughSearch(duplicates) {
    /* The thoroughSearch is called on the results of the basic search performed
        in the function teiDuplicateFinder (above). it searches with a strict
        threshold of 0.3 on the attributes: Maidenname, Nationalidentifier and TBnumber.
        Properties we consider to be stable in the sense that they are less prone to error
        than other attributes and are "strong" identifiers of a person. */

    var baseOptions = {
    caseSensitve: false,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    };

    const keys =  ['Maidenname', 'Nationalidentifier', 'TBnumber'];

    var trueDuplicates = [];
    for (let key = 0; key < keys.length; key++){

        for (let i = 0; i < duplicates.length; i++) {
            var set = duplicates[i];
            baseOptions.keys = [keys[key]];
            var fuse3 = new Fuse(set, baseOptions);
            var output;

            for (let j = 0; j < set.length; j++ ) {
                var tei = set[j]
                if (tei[keys[key]]) {
                    output = fuse3.search(tei[keys[key]]);
                    if (output.length > 1) {
                        trueDuplicates.push(output);
                        break;
                    }

                }
            }
        }
    }
    return trueDuplicates
}
