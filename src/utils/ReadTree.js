export function createSubSection(displayName='', id='') {
        return {
            name: displayName,
            id: id,
            toggled: false,
            children: []
        };
    }

export function parseData(data = {id, displayName, children}) {
         var newData = createSubSection(data.displayName, data.id);

        for (var c in data.children) {
            var cData = data.children[c];
            newData.children.push(
                createSubSection(cData.displayName, cData.id))

            for (var cc in data.children[c].children) {
                var ccData = data.children[c].children[cc];
                newData.children[c].children.push(
                    createSubSection(ccData.displayName, ccData.id))

                for (var ccc in data.children[c].children[cc].children) {
                    var cccData = data.children[c].children[cc].children[ccc];
                    newData.children[c].children[cc].children.push(
                       {name: cccData.displayName, id: cccData.id})
                }
            }
        }

        //Should sort them, and does so.. kinda. ish... ugh.
        newData.children.sort((a, b) => {
                return a.name > b.name});

        return newData
    }
