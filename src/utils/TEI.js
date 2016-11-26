import Fuse from 'fuse.js';

export function fakeAsyncCall(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(s), 3000);
    });
}

export function teiDuplicateFinder(OrgUnit) {
    /*
        Function finding duplicates within a given org unit.
        Utilizing Fuse.js.

        Solution might not be optimal due to having to search through the data twice,
        although, the first search limits the scope of the second by so much that the computation
        cost for the second search is negligible.
    */

    /* First step is to rewrite our JSON structure, to a more easily
        accessible format. Seems to improve the rate of true-positives. although
        although it's not optimal.*/
    var newTEIS = []
    for (let tei = 0; tei < OrgUnit.length; tei++) {
        var entry = OrgUnit[tei].attributes;

        var collection = []
        for (let attri = 0; attri < entry.length; attri ++){
            let newObj = {
                [(entry[attri].displayName).replace(/ /g, '')]: entry[attri].value,
            }
            collection.push(newObj);

        }
        newTEIS.push(
            {
                trackedEntityInstance: OrgUnit[tei].trackedEntityInstance,
                attributes: collection
            });
    }

   /* FUSE.JS implementation
    option parameter, decides what keys to search within,
    threshold etc. */
    var options = {
    shouldSort: true,
    caseSensitve: false,
    tokenize: false,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    keys: [
        'attributes.Firstname',
        'attributes.Lastname',
    ]
    };

    /* Second step iterates through the list of all objects,
        finds the first and last name and then searches the entire list
        for duplicates of these. First by the last name, we search the list
        of surnames for matching first name. */

    var duplicates = []
    for (let tei = 0; tei < newTEIS.length; tei++) {
        var entry = newTEIS[tei].attributes;
        var firstname = "";
        var lastname = "";
        var gender = "";

        for (let atri = 0; atri < entry.length; atri++) {
            var key = entry[atri];

            if (key.Firstname) {
                firstname = key.Firstname;

            } else if (key.Lastname) {
                lastname = key.Lastname;
            }
        }

        var fuse = new Fuse(newTEIS, options);
        var output = fuse.search(lastname);
        var fuse1 = new Fuse(output, options)
        var output1 = fuse1.search(firstname);


        if (output1.length > 1) {
            duplicates.push(output1)
        }
    }
    console.log(duplicates);
    return duplicates;
}

export function teiClinic(OrgUnit) {
    /*

        This is the manual implementation, not utilizing Fuse.js, currently this function is
        not being used, but could prove useful if we decide to search for duplicates
        by other metrics than the first and last name of the person.

        TODO: If we want to implement this fully, we need a fuzzy matching algorithm,
            and some further refinement. For our current needs, the above Fuse.js implementation
            seems to be all we need.
    */

    var duplicates = [];
    // First for loop is for the person to be checked against the second loop
    for (let tei1 = 0; tei1 < OrgUnit.length; tei1++){
        var entry = OrgUnit[tei1].attributes;
        var first_id = OrgUnit[tei1].trackedEntityInstance;

        var firstName = "";
        var lastName = "";
        var gender = "";


        for (let attribute = 0; attribute < entry.length; attribute++){
            var displayName = entry[attribute].displayName;

            if (displayName === "First name") {
                firstName = entry[attribute].value;
            } else if (displayName === "Last name") {
                lastName = entry[attribute].value;
            }
        }

        // Checks entries against first person
        for (let tei2 = 0; tei2 < OrgUnit.length; tei2++){
            var check = OrgUnit[tei2].attributes;
            var second_id = first_OU[tei1].trackedEntityInstance;

            var firstCheck = "";
            var lastCheck = "";

            for (let checkAttri = 0; checkAttri < check.length; checkAttri++){
                var checkName = check[checkAttri].displayName;

                if (checkName === "First name") {
                    if (firstName === check[checkAttri].value) {
                        firstCheck = check[checkAttri].value;
                    }

                } else if (checkName === "Last name") {
                    if (lastName === check[checkAttri].value){
                        lastCheck = check[checkAttri].value;
                    }
                }
            }

            if (firstCheck != "" && lastCheck != ""){

                duplicates.push({
                    displayName: "name",
                    value: firstName + " " + lastName,
                    trackedEntityInstance: first_id
                });

                duplicates.push({
                    displayName: "name",
                    value: firstCheck + " " + lastCheck,
                    trackedEntityInstance: second_id
                });

            }
        }
    }
    return duplicates;
}
