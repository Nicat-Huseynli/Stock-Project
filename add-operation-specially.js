// Navbar
const navBtn = document.querySelector(".nav-btn")
const nav = document.querySelector("nav")
const navOverlay = document.querySelector(".nav-overlay")

navBtn.addEventListener("mouseover", ()=>{
    nav.style.display = "block"
    navOverlay.style.display = "block"
})


navOverlay.addEventListener("mouseover", () =>{
    nav.style.display = "none"
    navOverlay.style.display = "none"
})


// Input only number
const inputWeight = document.querySelector(".input-weight")
const inputPrice = document.querySelector(".input-price")
const inputNetPrice = document.querySelector(".input-net-price")

inputWeight?.addEventListener("input", function(e) {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
    }
});

inputPrice?.addEventListener("input", function(e) {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
    }
});

inputNetPrice?.addEventListener("input", function(e) {
    const regex = /^[0-9]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove any character that is not a number or a comma
    }
});


// const addNewOperation = document.querySelector(".add-new-operation");
// const tbody = document.querySelector("tbody");

// const deleteOverlay = document.querySelector(".delete-overlay");
// const deleteModal = document.querySelector(".delete-modal");
// const yes = document.querySelector(".yes");
// const no = document.querySelector(".no");

// let rowToDelete = null; // Track the row to delete

// // Function to handle the dynamic form behavior
// const handleOperationChange = (row) => {
//     const operationName = row.querySelector(".operation-name");
//     const receivedMoney = row.querySelector(".add-received-money");
//     const givenMoney = row.querySelector(".add-given-money");
//     const selectExecutor = row.querySelector(".executor-dropdown");
//     const selectProduct = row.querySelector(".product-dropdown");
//     const addWeight = row.querySelector(".add-weight");
//     const addDeductedWeight = row.querySelector(".add-deducted-weight");
//     const addRemainWeight = row.querySelector(".add-remain-weight");
//     const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
//     const addNetWeight = row.querySelector(".add-net-weight");
//     const addPrice = row.querySelector(".add-price");
//     const addAmount = row.querySelector(".add-amount");
//     const addNetAmount = row.querySelector(".add-net-amount");

//     operationName.addEventListener("change", () => {
//         const selectedOption = operationName.value;

//         switch (selectedOption) {
//             case "buying":
//             case "selling":
//                 receivedMoney.disabled = true;
//                 givenMoney.disabled = true;
//                 selectExecutor.disabled = true;
//                 selectProduct.disabled = false;
//                 addWeight.disabled = false;
//                 addDeductedWeight.disabled = false;
//                 addRemainWeight.disabled = false;
//                 addDeductedPercentage.disabled = false;
//                 addNetWeight.disabled = false;
//                 addPrice.disabled = false;
//                 addAmount.disabled = false;
//                 addNetAmount.disabled = false;
//                 break;
//             case "receive-money":
//                 receivedMoney.disabled = false;
//                 givenMoney.disabled = true;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = true;
//                 addWeight.disabled = true;
//                 addDeductedWeight.disabled = true;
//                 addRemainWeight.disabled = true;
//                 addDeductedPercentage.disabled = true;
//                 addNetWeight.disabled = true;
//                 addPrice.disabled = true;
//                 addAmount.disabled = true;
//                 addNetAmount.disabled = true;
//                 break;
//             case "give-money":
//                 receivedMoney.disabled = true;
//                 givenMoney.disabled = false;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = true;
//                 addWeight.disabled = true;
//                 addDeductedWeight.disabled = true;
//                 addRemainWeight.disabled = true;
//                 addDeductedPercentage.disabled = true;
//                 addNetWeight.disabled = true;
//                 addPrice.disabled = true;
//                 addAmount.disabled = true;
//                 addNetAmount.disabled = true;
//                 break;
//             default:
//                 receivedMoney.disabled = false;
//                 givenMoney.disabled = false;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = false;
//                 addWeight.disabled = false;
//                 addDeductedWeight.disabled = false;
//                 addRemainWeight.disabled = false;
//                 addDeductedPercentage.disabled = false;
//                 addNetWeight.disabled = false;
//                 addPrice.disabled = false;
//                 addAmount.disabled = false;
//                 addNetAmount.disabled = false;
//                 break;
//         }
//     });

//     operationName.dispatchEvent(new Event("change"));
// };

// addNewOperation.addEventListener("click", () => {
//     const newRow = document.createElement("tr");

//     newRow.innerHTML = `
//         <th scope="row" class="id-num">17</th>
//         <td>
//             <select  class="operation-name" name="">
//                 <option value="" hidden></option>
//                 <option value="buying">Alış</option>
//                 <option value="selling">Satış</option>
//                 <option value="receive-money">Pul Alma</option>
//                 <option value="give-money">Pul Vermə</option>
//             </select>
//         </td>
//         <td>
//             <select  class="customer-dropdown" name=""></select>
//         </td>
//         <td>
//             <select class="product-dropdown" name=""></select>
//         </td>
//         <td>
//             <select class="executor-dropdown" name=""></select>
//         </td>
//         <td>17.08.2024 <br>17:01:08</td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><input class="add-operation-weight" type="text"></td>
//         <td><i class="fa-solid fa-trash-can"></i></td>
//     `;

//     tbody.appendChild(newRow);

//     const customerDropdown = newRow.querySelector(".customer-dropdown");
//     fetch("http://localhost:5000/api/Person/GetPersonsDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = '<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>';
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             customerDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch customer data:", err));

//     const productDropdown = newRow.querySelector(".product-dropdown");
//     fetch("http://localhost:5000/api/Product/GetProductsDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = `<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>`;
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             productDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch product data:", err));

//     const executorDropdown = newRow.querySelector(".executor-dropdown");
//     fetch("http://localhost:5000/api/Employee/GetEmployeesDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = `<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>`;
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             executorDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch executor data:", err));

//     // Handle operation change for dynamic form behavior
//     handleOperationChange(newRow);

//     // Attach delete event listener
//     const trashCan = newRow.querySelector(".fa-trash-can");
//     trashCan.addEventListener("click", () => {
//         rowToDelete = newRow;
//         deleteOverlay.style.display = "block";
//         deleteModal.style.display = "block";
//     });

//     // Restrict input to numbers and dots
//     newRow.querySelectorAll(".add-operation-weight").forEach(input => {
//         input.addEventListener("input", (e) => {
//             const regex = /^[0-9.]*$/;
//             if (!regex.test(e.target.value)) {
//                 e.target.value = e.target.value.replace(/[^0-9.]/g, '');
//             }
//         });
//     });
// });

// // Handle the "Yes" button click to confirm deletion
// yes.addEventListener("click", () => {
//     if (rowToDelete) {
//         rowToDelete.remove();
//         rowToDelete = null;
//     }
//     deleteOverlay.style.display = "none";
//     deleteModal.style.display = "none";
// });

// // Handle the "No" button click to cancel deletion
// no.addEventListener("click", () => {
//     rowToDelete = null;
//     deleteOverlay.style.display = "none";
//     deleteModal.style.display = "none";
// });

// // Restrict input to numbers and dots for existing inputs
// document.querySelectorAll(".add-operation-weight").forEach(input => {
//     input.addEventListener("input", (e) => {
//         const regex = /^[0-9.]*$/;
//         if (!regex.test(e.target.value)) {
//             e.target.value = e.target.value.replace(/[^0-9.]/g, '');
//         }
//     });
// });

const addNewOperation = document.querySelector(".add-new-operation");
const tbody = document.querySelector("tbody");

const deleteOverlay = document.querySelector(".delete-overlay");
const deleteModal = document.querySelector(".delete-modal");
const yes = document.querySelector(".yes");
const no = document.querySelector(".no");

let rowToDelete = null; // Track the row to delete

// Function to handle the dynamic form behavior
// const handleOperationChange = (row) => {
//     const operationName = row.querySelector(".operation-name");
//     const receivedMoney = row.querySelector(".add-received-money");
//     const givenMoney = row.querySelector(".add-given-money");
//     const selectExecutor = row.querySelector(".executor-dropdown");
//     const selectProduct = row.querySelector(".product-dropdown");
//     const addWeight = row.querySelector(".add-weight");
//     const addDeductedWeight = row.querySelector(".add-deducted-weight");
//     const addRemainWeight = row.querySelector(".add-remain-weight");
//     const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
//     const addNetWeight = row.querySelector(".add-net-weight");
//     const addPrice = row.querySelector(".add-price");
//     const addAmount = row.querySelector(".add-amount");
//     const addNetAmount = row.querySelector(".add-net-amount");

//     const updateFields = () => {
//         const selectedOption = operationName.value;

//         switch (selectedOption) {
//             case "buying":
//             case "selling":
//                 receivedMoney.disabled = true;
//                 givenMoney.disabled = true;
//                 selectExecutor.disabled = true;
//                 selectProduct.disabled = false;
//                 addWeight.disabled = false;
//                 addDeductedWeight.disabled = false;
//                 addRemainWeight.disabled = false;
//                 addDeductedPercentage.disabled = false;
//                 addNetWeight.disabled = false;
//                 addPrice.disabled = false;
//                 addAmount.disabled = false;
//                 addNetAmount.disabled = false;
//                 break;
//             case "receive-money":
//                 receivedMoney.disabled = false;
//                 givenMoney.disabled = true;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = true;
//                 addWeight.disabled = true;
//                 addDeductedWeight.disabled = true;
//                 addRemainWeight.disabled = true;
//                 addDeductedPercentage.disabled = true;
//                 addNetWeight.disabled = true;
//                 addPrice.disabled = true;
//                 addAmount.disabled = true;
//                 addNetAmount.disabled = true;
//                 break;
//             case "give-money":
//                 receivedMoney.disabled = true;
//                 givenMoney.disabled = false;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = true;
//                 addWeight.disabled = true;
//                 addDeductedWeight.disabled = true;
//                 addRemainWeight.disabled = true;
//                 addDeductedPercentage.disabled = true;
//                 addNetWeight.disabled = true;
//                 addPrice.disabled = true;
//                 addAmount.disabled = true;
//                 addNetAmount.disabled = true;
//                 break;
//             default:
//                 receivedMoney.disabled = false;
//                 givenMoney.disabled = false;
//                 selectExecutor.disabled = false;
//                 selectProduct.disabled = false;
//                 addWeight.disabled = false;
//                 addDeductedWeight.disabled = false;
//                 addRemainWeight.disabled = false;
//                 addDeductedPercentage.disabled = false;
//                 addNetWeight.disabled = false;
//                 addPrice.disabled = false;
//                 addAmount.disabled = false;
//                 addNetAmount.disabled = false;
//                 break;
//         }
//     };

//     // Ensure the fields are updated based on the current value
//     updateFields();

//     // Add event listener to handle changes when the select is enabled
//     operationName.addEventListener("change", updateFields);
// };

// addNewOperation.addEventListener("click", () => {
//     const newRow = document.createElement("tr");

//     newRow.innerHTML = `
//         <td>
//             <select class="operation-name" name="" disabled>
//                 <option value="" hidden></option>
//                 <option value="buying">Alış</option>
//                 <option value="selling">Satış</option>
//                 <option value="receive-money">Pul Alma</option>
//                 <option value="give-money">Pul Vermə</option>
//             </select>
//         </td>
//         <td>
//             <select class="customer-dropdown" name="" disabled></select>
//         </td>
//         <td>
//             <select class="product-dropdown" name="" disabled></select>
//         </td>
//         <td>
//             <select class="executor-dropdown" name="" disabled></select>
//         </td>
//         <td><input class="add-weight" type="text" disabled></td>
//         <td><input class="add-deducted-weight" type="text" disabled></td>
//         <td><input class="add-deducted-percentage" type="text" disabled></td>
//         <td><input class="add-price" type="text" disabled></td>
//         <td><input class="add-given-money" type="text" disabled></td>
//         <td><input class="add-received-money" type="text" disabled></td>
//         <td><i class="fa-solid fa-trash-can"></i></td>
//     `;

//     tbody.appendChild(newRow);

//     // Fetch data and populate dropdowns
//     const customerDropdown = newRow.querySelector(".customer-dropdown");
//     fetch("http://localhost:5000/api/Person/GetPersonsDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = '<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>';
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             customerDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch customer data:", err));

//     const productDropdown = newRow.querySelector(".product-dropdown");
//     fetch("http://localhost:5000/api/Product/GetProductsDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = `<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>`;
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             productDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch product data:", err));

//     const executorDropdown = newRow.querySelector(".executor-dropdown");
//     fetch("http://localhost:5000/api/Employee/GetEmployeesDropdown")
//         .then(response => response.json())
//         .then(posts => {
//             let options = `<option value="" selected disabled hidden></option><option style="color: red;">Sıfırla ✘</option>`;
//             posts.forEach(item => {
//                 options += `<option value="${item.id}">${item.name}</option>`;
//             });
//             executorDropdown.innerHTML = options;
//         })
//         .catch(err => console.error("Failed to fetch executor data:", err));

//     // Handle operation change for dynamic form behavior
//     handleOperationChange(newRow);

//     // Attach delete event listener
//     const trashCan = newRow.querySelector(".fa-trash-can");
//     trashCan.addEventListener("click", () => {
//         rowToDelete = newRow;
//         deleteOverlay.style.display = "block";
//         deleteModal.style.display = "block";
//     });

//     // Restrict input to numbers and dots
//     newRow.querySelectorAll(".add-operation-weight").forEach(input => {
//         input.addEventListener("input", (e) => {
//             const regex = /^[0-9.]*$/;
//             if (!regex.test(e.target.value)) {
//                 e.target.value = e.target.value.replace(/[^0-9.]/g, '');
//             }
//         });
//     });
// });



// document.addEventListener("DOMContentLoaded", () => {
//     const tbody = document.querySelector("tbody");
//     const addNewOperation = document.querySelector(".add-new-operation");

//     const deleteOverlay = document.querySelector(".delete-overlay");
//     const deleteModal = document.querySelector(".delete-modal");
//     const yes = document.querySelector(".yes");
//     const no = document.querySelector(".no");

//     let rowToDelete = null; // Keep track of the row that should be deleted

//     // // Function to handle the dynamic form behavior
//     const handleOperationChange = (row) => {
//         const operationName = row.querySelector(".operation-name");
//         const receivedMoney = row.querySelector(".add-received-money");
//         const givenMoney = row.querySelector(".add-given-money");
//         const selectExecutor = row.querySelector(".executor-dropdown");
//         const selectProduct = row.querySelector(".product-dropdown");
//         const addWeight = row.querySelector(".add-weight");
//         const addDeductedWeight = row.querySelector(".add-deducted-weight");
//         const addRemainWeight = row.querySelector(".add-remain-weight");
//         const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
//         const addNetWeight = row.querySelector(".add-net-weight");
//         const addPrice = row.querySelector(".add-price");
//         const addAmount = row.querySelector(".add-amount");
//         const addNetAmount = row.querySelector(".add-net-amount");
        
//         operationName.addEventListener("change", () => {
//             const selectedOption = operationName.value;
//             console.log(selectedOption);

//             console.log(selectProduct.value);

//             switch (selectedOption) {
//                 case "1":
//                 case "2":
//                     receivedMoney.disabled = true;
//                     givenMoney.disabled = true;
//                     selectExecutor.disabled = true;
//                     selectProduct.disabled = false;
//                     addWeight.disabled = false;
//                     addDeductedWeight.disabled = false;
//                     // addRemainWeight.disabled = false;
//                     addDeductedPercentage.disabled = false;
//                     // addNetWeight.disabled = false;
//                     addPrice.disabled = false;
//                     // addAmount.disabled = false;
//                     // addNetAmount.disabled = false;
//                     break;
//                 case "3":
//                     receivedMoney.disabled = false;
//                     givenMoney.disabled = true;
//                     selectExecutor.disabled = false;
//                     selectProduct.disabled = true;
//                     addWeight.disabled = true;
//                     addDeductedWeight.disabled = true;
//                     // addRemainWeight.disabled = true;
//                     addDeductedPercentage.disabled = true;
//                     // addNetWeight.disabled = true;
//                     addPrice.disabled = true;
//                     // addAmount.disabled = true;
//                     // addNetAmount.disabled = true;
//                     break;
//                 case "4":
//                     receivedMoney.disabled = true;
//                     givenMoney.disabled = false;
//                     selectExecutor.disabled = false;
//                     selectProduct.disabled = true;
//                     addWeight.disabled = true;
//                     addDeductedWeight.disabled = true;
//                     // addRemainWeight.disabled = true;
//                     addDeductedPercentage.disabled = true;
//                     // addNetWeight.disabled = true;
//                     addPrice.disabled = true;
//                     // addAmount.disabled = true;
//                     // addNetAmount.disabled = true;
//                     break;
//                 default:
//                     // Enable all fields by default
//                     receivedMoney.disabled = false;
//                     givenMoney.disabled = false;
//                     selectExecutor.disabled = false;
//                     selectProduct.disabled = false;
//                     addWeight.disabled = false;
//                     addDeductedWeight.disabled = false;
//                     // addRemainWeight.disabled = false;
//                     addDeductedPercentage.disabled = false;
//                     // addNetWeight.disabled = false;
//                     addPrice.disabled = false;
//                     // addAmount.disabled = false;
//                     // addNetAmount.disabled = false;
//                     break;
//             }
//         });

//         // Trigger the change event to set the initial state
//         operationName.dispatchEvent(new Event("change"));
//     };

//     // Function to fetch and populate dropdown options
//     const populateDropdown = (dropdown, url) => {
//         fetch(url)
//             .then(response => response.json())
//             .then(posts => {
//                 let options = '<option value="" selected disabled hidden ></option>';
//                 posts.forEach(item => {
//                     options += `<option value="${item.id}">${item.name}</option>`;
//                 });
//                 dropdown.innerHTML = options;
//             })
//             .catch(err => console.error(`Failed to fetch data from ${url}:`, err));
//     };


//     const operationValue = localStorage.getItem("operation Value")
//     const customerValue = localStorage.getItem("customer Value")


//     // Function to add a new row to the table
//     const addRow = () => {
//         const newRow = document.createElement("tr");
//         newRow.classList.add("operation-row");

//         newRow.innerHTML = `
//             <td>
//                 <select disabled class="operation-name" name="" id="">
//                     <option selected value="${operationValue}">${operationValue}</option>
//                 </select>
//             </td>
//             <td>
//                 <select disabled class="customer-dropdown" name="" id="" >
//                     <option selected value="${customerValue}">${customerValue}</option> 
//                 </select></td>

//             <td><select class="product-dropdown" name="" id=""></select></td>
//             <td><select class="executor-dropdown" name="" id=""></select></td>
//             <td><input class="add-weight add-operation-weight" type="text"></td>
//             <td><input class="add-deducted-weight add-operation-weight" type="text"></td>
//             <td><input class="add-deducted-percentage add-operation-weight" type="text"></td>
//             <td><input class="add-price add-operation-weight" type="text"></td>
//             <td><input class="add-given-money add-operation-weight" type="text"></td>
//             <td><input class="add-received-money add-operation-weight" type="text"></td>
//             <td><i class="fa-solid fa-trash-can"></i></td>
//         `;

//         // Append the new row to the table body
//         tbody.appendChild(newRow);

//         // Populate dropdowns
//         // populateDropdown(newRow.querySelector(".customer-dropdown"), "http://localhost:5000/api/Person/GetPersonsDropdown");
//         populateDropdown(newRow.querySelector(".product-dropdown"), "http://localhost:5000/api/Product/GetProductsDropdown");
//         populateDropdown(newRow.querySelector(".executor-dropdown"), "http://localhost:5000/api/Employee/GetEmployeesDropdown");

//         // Attach event listeners for the new row
//         handleOperationChange(newRow);

//         // Add event listener for the delete action
//         const trashCan = newRow.querySelector(".fa-trash-can");
//         trashCan.addEventListener("click", () => {
//             rowToDelete = newRow;
//             deleteOverlay.style.display = "block";
//             deleteModal.style.display = "block";
//         });
//     };

//     // Event listener for the "Yes" button to confirm deletion
//     yes.addEventListener("click", () => {
//         if (rowToDelete) {
//             rowToDelete.remove(); // Remove the selected row from the table
//             rowToDelete = null; // Reset the rowToDelete variable
//         }
//         deleteOverlay.style.display = "none";
//         deleteModal.style.display = "none";
//     });

//     // Event listener for the "No" button to cancel deletion
//     no.addEventListener("click", () => {
//         rowToDelete = null; // Reset the rowToDelete variable
//         deleteOverlay.style.display = "none";
//         deleteModal.style.display = "none";
//     });

//     // Add event listener for the "Add New Operation" button
//     addNewOperation.addEventListener("click", addRow);

//     // Initialize the existing rows
//     const existingRows = document.querySelectorAll(".operation-row");
//     existingRows.forEach(row => {
//         handleOperationChange(row);

//         // Add event listener for the delete action
//         const trashCan = row.querySelector(".fa-trash-can");
//         trashCan.addEventListener("click", () => {
//             rowToDelete = row;
//             deleteOverlay.style.display = "block";
//             deleteModal.style.display = "block";
//         });
//     });

//     // Handle number-only input
//     document.addEventListener("input", (e) => {
//         if (e.target.matches(".add-operation-weight")) {
//             const regex = /^[0-9.]*$/;
//             if (!regex.test(e.target.value)) {
//                 e.target.value = e.target.value.replace(/[^0-9.]/g, '');
//             }
//         }
//     });
// });



document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");
    const addNewOperation = document.querySelector(".add-new-operation");

    const deleteOverlay = document.querySelector(".delete-overlay");
    const deleteModal = document.querySelector(".delete-modal");
    const yes = document.querySelector(".yes");
    const no = document.querySelector(".no");

    let rowToDelete = null; // Keep track of the row that should be deleted

    // Function to handle the dynamic form behavior
    const handleOperationChange = (row) => {
        const operationName = row.querySelector(".operation-name");
        const receivedMoney = row.querySelector(".add-received-money");
        const givenMoney = row.querySelector(".add-given-money");
        const selectExecutor = row.querySelector(".executor-dropdown");
        const selectProduct = row.querySelector(".product-dropdown");
        const addWeight = row.querySelector(".add-weight");
        const addDeductedWeight = row.querySelector(".add-deducted-weight");
        const addRemainWeight = row.querySelector(".add-remain-weight");
        const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
        const addNetWeight = row.querySelector(".add-net-weight");
        const addPrice = row.querySelector(".add-price");
        const addAmount = row.querySelector(".add-amount");
        const addNetAmount = row.querySelector(".add-net-amount");

        operationName.addEventListener("change", () => {
            const selectedOption = operationName.value;
            console.log(selectedOption);

            switch (selectedOption) {
                case "1":
                case "2":
                    receivedMoney.disabled = true;
                    givenMoney.disabled = true;
                    selectExecutor.disabled = true;
                    selectProduct.disabled = false;
                    addWeight.disabled = false;
                    addDeductedWeight.disabled = false;
                    addDeductedPercentage.disabled = false;
                    addPrice.disabled = false;
                    break;
                case "3":
                    receivedMoney.disabled = false;
                    givenMoney.disabled = true;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = true;
                    addWeight.disabled = true;
                    addDeductedWeight.disabled = true;
                    addDeductedPercentage.disabled = true;
                    addPrice.disabled = true;
                    break;
                case "4":
                    receivedMoney.disabled = true;
                    givenMoney.disabled = false;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = true;
                    addWeight.disabled = true;
                    addDeductedWeight.disabled = true;
                    addDeductedPercentage.disabled = true;
                    addPrice.disabled = true;
                    break;
                default:
                    receivedMoney.disabled = false;
                    givenMoney.disabled = false;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = false;
                    addWeight.disabled = false;
                    addDeductedWeight.disabled = false;
                    addDeductedPercentage.disabled = false;
                    addPrice.disabled = false;
                    break;
            }
        });

        // Trigger the change event to set the initial state
        operationName.dispatchEvent(new Event("change"));
    };

    // Function to fetch and populate dropdown options
    const populateDropdown = (dropdown, url) => {
        fetch(url)
            .then(response => response.json())
            .then(posts => {
                let options = '<option value="" selected disabled hidden ></option>';
                posts.forEach(item => {
                    options += `<option value="${item.id}">${item.name}</option>`;
                });
                dropdown.innerHTML = options;
            })
            .catch(err => console.error(`Failed to fetch data from ${url}:`, err));
    };

    const operationText = localStorage.getItem("operation Value Text");
    const customerText = localStorage.getItem("customer Value Text");

    const operationValue = localStorage.getItem("operation Value");
    const customerValue = localStorage.getItem("customer Value");

    // Function to add a new row to the table
    const addRow = (isFirstRow = false) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("operation-row");

        // If it's the first row, populate it with the values from localStorage
        const operationDropdownHtml = isFirstRow
            ? `<option selected value="${operationValue}">${operationText}</option>`
            : `<option value="" disabled selected hidden></option>`;

        const customerDropdownHtml = isFirstRow
            ? `<option selected value="${customerValue}">${customerText}</option>`
            : `<option value="" disabled selected hidden></option>`;

        newRow.innerHTML = `
            <td>
                <select disabled class="operation-name" name="" id="">
                    <option selected value="${operationValue}">${operationText}</option>
                </select>
            </td>
            <td>
                <select disabled class="customer-dropdown" name="" id="">
                    <option selected value="${customerValue}">${customerText}</option>
                </select>
            </td>
            <td><select class="product-dropdown" name="" id=""></select></td>
            <td><select class="executor-dropdown" name="" id=""></select></td>
            <td><input class="add-weight add-operation-weight" type="text"></td>
            <td><input class="add-deducted-weight add-operation-weight" type="text"></td>
            <td><input class="add-deducted-percentage add-operation-weight" type="text"></td>
            <td><input class="add-price add-operation-weight" type="text"></td>
            <td><input class="add-given-money add-operation-weight" type="text"></td>
            <td><input class="add-received-money add-operation-weight" type="text"></td>
            <td><i class="fa-solid fa-trash-can"></i></td>
        `;

        tbody.appendChild(newRow);

        populateDropdown(newRow.querySelector(".product-dropdown"), "http://localhost:5000/api/Product/GetProductsDropdown");
        populateDropdown(newRow.querySelector(".executor-dropdown"), "http://localhost:5000/api/Employee/GetEmployeesDropdown");

        handleOperationChange(newRow);

        const trashCan = newRow.querySelector(".fa-trash-can");
        trashCan.addEventListener("click", () => {
            rowToDelete = newRow;
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    };

    yes.addEventListener("click", () => {
        if (rowToDelete) {
            rowToDelete.remove();
            rowToDelete = null;
        }
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });

    no.addEventListener("click", () => {
        rowToDelete = null;
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });

    addNewOperation.addEventListener("click", () => addRow());

    // Add the first row with pre-filled values
    addRow(true);

    const existingRows = document.querySelectorAll(".operation-row");
    existingRows.forEach(row => {
        handleOperationChange(row);

        const trashCan = row.querySelector(".fa-trash-can");
        trashCan.addEventListener("click", () => {
            rowToDelete = row;
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    document.addEventListener("input", (e) => {
        if (e.target.matches(".add-operation-weight")) {
            const regex = /^[0-9.]*$/;
            if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            }
        }
    });
});


document.querySelector(".save-operation-btn").addEventListener("click", (e) => {
    e.preventDefault();

    // Collect all the operation rows
    const operationRows = document.querySelectorAll(".operation-row");

    let requestBody = [];

    // Loop through each operation row to gather data
    operationRows.forEach((row) => {
        const selectElement = row.querySelector(".operation-name");
        const customerDropdown = row.querySelector(".customer-dropdown");
        const productDropdown = row.querySelector(".product-dropdown");
        const executorDropdown = row.querySelector(".executor-dropdown");
        const addWeight = row.querySelector(".add-weight");
        const addDeductedWeight = row.querySelector(".add-deducted-weight");
        const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
        const addPrice = row.querySelector(".add-price");
        const addGivenMoney = row.querySelector(".add-given-money");
        const addReceivedMoney = row.querySelector(".add-received-money");

        // Extract values for each row
        const selectedValue = selectElement.value;
        const selectedCustomer = customerDropdown.value;
        const selectedProduct = productDropdown.value;
        const selectedExecutor = executorDropdown.value;
        const selectedWeight = addWeight.value;
        const selectedDeductedWeight = addDeductedWeight.value;
        const selectedDeductedPercentage = addDeductedPercentage.value;
        const selectedPrice = addPrice.value;
        const selectedGivenMoney = addGivenMoney.value;
        const selectedReceivedMoney = addReceivedMoney.value;

        // Push the operation data into the requestBody array
        requestBody.push({
            operationTypeId: selectedValue != 0 ? selectedValue : 0,
            personId: selectedCustomer != 0 ? selectedCustomer : "1",
            productId: selectedProduct != 0 ? selectedProduct : "1",
            employeeId: selectedExecutor != 0 ? selectedExecutor : "1",
            weight: selectedWeight != 0 ? selectedWeight : 0,
            deductedWeight: selectedDeductedWeight != 0 ? selectedDeductedWeight : 0,
            deductedPercentage: selectedDeductedPercentage != 0 ? selectedDeductedPercentage : 0,
            pricePerUnit: selectedPrice != 0 ? selectedPrice : 0,
            moneyGive: selectedGivenMoney != 0 ? selectedGivenMoney : 0,
            moneyGet: selectedReceivedMoney != 0 ? selectedReceivedMoney : 0,
            isGift: true
        });
    });

    // Log the request body to check the data
    console.log("Request body:", JSON.stringify(requestBody));
    console.log(requestBody);

    // Now that we have an array of operations, we send them all at once
    fetch("http://localhost:5000/api/Operation/AddOperation", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
    })
    .then(res => {
        if (!res.ok) {
            console.log("Problem with response");
            return;
        }
        return res.json(); // Parse the response as JSON
    })
    .then(data => {
        console.log("Operations added successfully:", data); // Log the response data

        window.location.href = "index.html";
    })
    .catch(err => {
        console.error("Error during fetch:", err); // Log any errors
    });
});


// Handle the "Yes" button click to confirm deletion
yes.addEventListener("click", () => {
    if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
    }
    deleteOverlay.style.display = "none";
    deleteModal.style.display = "none";
});

// Handle the "No" button click to cancel deletion
no.addEventListener("click", () => {
    rowToDelete = null;
    deleteOverlay.style.display = "none";
    deleteModal.style.display = "none";
});

// Restrict input to numbers and dots for existing inputs
document.querySelectorAll(".add-operation-weight").forEach(input => {
    input.addEventListener("input", (e) => {
        const regex = /^[0-9.]*$/;
        if (!regex.test(e.target.value)) {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        }
    });
});


// Product Dropdown Menu for first row
const productDropdown = document.querySelector(".product-dropdown")
fetch("http://localhost:5000/api/Product/GetProductsDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option value="" selected disabled hidden ></option>`
    posts.forEach(function (item) {
        code += `<option class="prod-id" value="${item.id}"><a href="#">${item.name}</a></option>`
    })
    productDropdown.innerHTML = code
})


// Executor Dropdown Menu for first row
const executorDropdown = document.querySelector(".executor-dropdown")
fetch("http://localhost:5000/api/Employee/GetEmployeesDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option value="" selected disabled hidden ></option>`
    posts.forEach(function (item) {
        code += `<option value="${item.id}">${item.name}</option>`
    })
    executorDropdown.innerHTML = code
})


// Delete row 
const trashCan = document.querySelectorAll(".fa-trash-can");

    let currentRow; // Variable to keep track of the current row

    trashCan.forEach(trash => {
        trash.addEventListener("click", () => {
            currentRow = trash.closest("tr"); // Store the current row
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    // Handle the "Yes" button click
    yes.addEventListener("click", () => {
            currentRow.remove(); // Remove the current row from the table
            deleteOverlay.style.display = "none";
            deleteModal.style.display = "none";
        }
    );

    no.addEventListener("click", () => {
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });




// // Save operation

//     // const enterCustomerName = document.querySelector(".enter-customer-name");

//     document.querySelector(".save-operation-btn").addEventListener("click", (event) => {
//     // event.preventDefault(); // Prevent the form from submitting the traditional way

//     // Prepare the request body as a JSON object
//     const requestBody = {
//         name: enterCustomerName.value // Capture the value from the input field

//     };

//     fetch("http://localhost:5000/api/Person/Add", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem");
//             return;
//         }
//         return res.json(); // Parse the response as JSON
//     })
//     .then(data => {
//         console.log(data); // Log the response data
//     })
//     .catch(err => {
//         console.log(err); // Log any errors
//     });
// });
