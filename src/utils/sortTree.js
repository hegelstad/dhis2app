// Recursively sort each array of children
export function sortChildren(node) {
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            sortChildren(node.children[i]);
        }
        node.children.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }
}
