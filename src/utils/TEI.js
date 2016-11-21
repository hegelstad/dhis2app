export function fakeAsyncCall(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(reverseString(s)), 1000);
    });
}

function reverseString(s) {
    return s.split('').reverse().join('');
}


export function teiList(OrgUnit) {
    /*
        Function finding duplicates within a given org unit.
        TODO: Return the duplicates as a list.
    */
    var duplicates = [];
    // First for loop is for the person to be checked against the second loop
    for (let tei1 = 0; tei1 < OrgUnit.length; tei1++){
        var entry = OrgUnit[tei1].attributes;
        var first_id = OrgUnit[tei1].trackedEntityInstance;

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
        for (let tei2 = tei1 + 1; tei2 < OrgUnit.length; tei2++){
            var check = OrgUnit[tei2].attributes;
            var second_id = OrgUnit[tei2].trackedEntityInstance;

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
