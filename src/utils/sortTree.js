export function sortTree(array) {
    for (let i=0; i < array.length; i++) {
        sortChildren(array[i]);
    }
}

/* Recursive function for sorting nested objects with children.
    used to sort our tree list displaying countries / chiefdoms / clinics 
    */

function sortChildren(node) {
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            sortChildren(node.children[i]);
        }
        node.children.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }
}
