// import { loadOrganisationUnitsTree } from '../api';
// import { sortTree } from '../utils/sortTree.js';
//
// export const loadTree = () => {
//     loadOrganisationUnitsTree()
//         .then(treeData => {
//             sortTree(treeData.organisationUnits); // Sort the tree data to get all regions in the right order.
//             treeData.organisationUnits[0].toggled = true; // Toggle the root node to expand the tree.
//             // If the first element in array has children, mark the first child as active/selected.
//             if (treeData.organisationUnits[0].children[0]) {
//                 treeData.organisationUnits[0].children[0].active = true; // Select the first child of the root node to be selected.
//                 this.setState({
//                     cursor: treeData.organisationUnits[0].children[0] // Set the cursor to the node that was set to active.
//                 });
//             } else { // Else, mark the first element as active to avoid a null error.
//                 treeData.organisationUnits[0].active = true; // Select the first child of the root node to be selected.
//                 this.setState({
//                     cursor: treeData.organisationUnits[0] // Set the cursor to the node that was set to active.
//                 });
//             }
//             this.setState({
//                 isLoadingTree: false,
//                 treeData: treeData.organisationUnits
//             });
//         })
//         .catch(error => {
//             console.log(error);
//             this.setState({
//                 isLoadingTree: false,
//                 isError: true,
//                 errorMessage: "Fetching data failed - check DHIS CORS  "
//             });
//         });
// }
