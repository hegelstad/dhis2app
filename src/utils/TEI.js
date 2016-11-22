
import Fuse from 'fuse.js';

export function fakeAsyncCall(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(reverseString(s)), 1000);
    });
}



export function teiDuplicateFinder(OrgUnit) {
    /* 
        Function finding duplicates within a given org unit.
    */
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


   // FUSE.JS IMPLEMENTATION
    var options = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    keys: [
        'attributes.Firstname',
        'attributes.Lastname'
    ]
    };

    
    var duplicates = []
    for (let tei = 0; tei < newTEIS.length; tei++) {
        var entry = newTEIS[tei].attributes;
        var firstname = "";
        var lastname = "";
        
        for (let atri = 0; atri < entry.length; atri++) {
            var key = entry[atri];

            if (key.Firstname) {
                firstname = key.Firstname;

            } else if (key.Lastname) {
                lastname = key.Lastname;
            }
        }

        var fuse = new Fuse(newTEIS, options); // "list" is the item array
        var output = fuse.search(firstname);
        var fuse1 = new Fuse(output, options)
        var output1 = fuse1.search(lastname);

        if (output1.length > 1){
            duplicates.push(output1)
        }
    }

    console.log(duplicates)
    return duplicates;
}


export function teiClinic(first_OU, second_OU) {
    /* 
        Function checking for duplicates within two clinics, first_OU and second_OU.
        TODO: Should probably return a list of duplicates.
    */

    var duplicates = [];
    // First for loop is for the person to be checked against the second loop
    for (let tei1 = 0; tei1 < first_OU.length; tei1++){
        var entry = first_OU[tei1].attributes;
        var first_id = first_OU[tei1].trackedEntityInstance;

        var firstName = "";
        var lastName = "";


        for (let attribute = 0; attribute < entry.length; attribute++){
            var displayName = entry[attribute].displayName;

            if (displayName === "First name") {
                firstName = entry[attribute].value;
            } else if (displayName === "Last name") {
                lastName = entry[attribute].value;
            }
        }

        // Checks entries against first person
        for (let tei2 = 0; tei2 < second_OU.length; tei2++){
            var check = second_OU[tei2].attributes;
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