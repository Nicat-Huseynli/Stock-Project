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


document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");
    const addNewOperation = document.querySelector(".add-new-operation");

    const deleteOverlay = document.querySelector(".delete-overlay");
    const deleteModal = document.querySelector(".delete-modal");
    const yes = document.querySelector(".yes");
    const no = document.querySelector(".no");

    let rowToDelete = null; // Keep track of the row that should be deleted

    // // Function to handle the dynamic form behavior
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

            console.log(selectProduct.value);

            switch (selectedOption) {
                case "1":
                case "2":
                    receivedMoney.disabled = true;
                    givenMoney.disabled = true;
                    selectExecutor.disabled = true;
                    selectProduct.disabled = false;
                    addWeight.disabled = false;
                    addDeductedWeight.disabled = false;
                    // addRemainWeight.disabled = false;
                    addDeductedPercentage.disabled = false;
                    // addNetWeight.disabled = false;
                    addPrice.disabled = false;
                    // addAmount.disabled = false;
                    // addNetAmount.disabled = false;
                    break;
                case "3":
                    receivedMoney.disabled = false;
                    givenMoney.disabled = true;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = true;
                    addWeight.disabled = true;
                    addDeductedWeight.disabled = true;
                    // addRemainWeight.disabled = true;
                    addDeductedPercentage.disabled = true;
                    // addNetWeight.disabled = true;
                    addPrice.disabled = true;
                    // addAmount.disabled = true;
                    // addNetAmount.disabled = true;
                    break;
                case "4":
                    receivedMoney.disabled = true;
                    givenMoney.disabled = false;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = true;
                    addWeight.disabled = true;
                    addDeductedWeight.disabled = true;
                    // addRemainWeight.disabled = true;
                    addDeductedPercentage.disabled = true;
                    // addNetWeight.disabled = true;
                    addPrice.disabled = true;
                    // addAmount.disabled = true;
                    // addNetAmount.disabled = true;
                    break;
                default:
                    // Enable all fields by default
                    receivedMoney.disabled = false;
                    givenMoney.disabled = false;
                    selectExecutor.disabled = false;
                    selectProduct.disabled = false;
                    addWeight.disabled = false;
                    addDeductedWeight.disabled = false;
                    // addRemainWeight.disabled = false;
                    addDeductedPercentage.disabled = false;
                    // addNetWeight.disabled = false;
                    addPrice.disabled = false;
                    // addAmount.disabled = false;
                    // addNetAmount.disabled = false;
                    break;
            }
        });

        // Trigger the change event to set the initial state
        operationName.dispatchEvent(new Event("change"));
    };

    // Function to fetch and populate dropdown options
    // Function to fetch and populate dropdown options
const populateDropdown = (dropdown, url) => {
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            let options = '<option value="" hidden></option>'; // Add an empty hidden option
            posts.forEach(item => {
                options += `<option value="${item.id}">${item.name}</option>`;
            });
            dropdown.innerHTML = options;
        })
        .catch(err => console.error(`Failed to fetch data from ${url}:`, err));
};

// Function to add a new row to the table
const addRow = () => {
    const newRow = document.createElement("tr");
    newRow.classList.add("operation-row");
    newRow.innerHTML = `
        <td>
            <select class="operation-name" name="" id="">
                <option value="" hidden></option>
                <option class="buy" value="1">Alış</option>
                <option class="sell" value="2">Satış</option>
                <option class="receive-money" value="3">Pul Alma</option>
                <option class="give-money" value="4">Pul Vermə</option>
            </select>
        </td>
        <td>
            <select class="customer-dropdown" name="" id="">
                <option value="" hidden></option> <!-- Add empty option -->
            </select>
        </td>
        <td>
            <select class="product-dropdown" name="" id="">
                <option value="" hidden></option> <!-- Add empty option -->
            </select>
        </td>
        <td>
            <select class="executor-dropdown" name="" id="">
                <option value="" hidden></option> <!-- Add empty option -->
            </select>
        </td>
        <td><input class="add-weight add-operation-weight" type="text"></td>
        <td><input class="add-deducted-weight add-operation-weight" type="text"></td>
        <td><input class="add-deducted-percentage add-operation-weight" type="text"></td>
        <td><input class="add-price add-operation-weight" type="text"></td>
        <td><input class="add-given-money add-operation-weight" type="text"></td>
        <td><input class="add-received-money add-operation-weight" type="text"></td>
        <td><i class="fa-solid fa-trash-can"></i></td>
    `;

    // Append the new row to the table body
    tbody.appendChild(newRow);

    // Populate dropdowns
    populateDropdown(newRow.querySelector(".customer-dropdown"), "http://localhost:5000/api/Person/GetPersonsDropdown");
    populateDropdown(newRow.querySelector(".product-dropdown"), "http://localhost:5000/api/Product/GetProductsDropdown");
    populateDropdown(newRow.querySelector(".executor-dropdown"), "http://localhost:5000/api/Employee/GetEmployeesDropdown");

    // Attach event listeners for the new row
    handleOperationChange(newRow);

    // Add event listener for the delete action
    const trashCan = newRow.querySelector(".fa-trash-can");
    trashCan.addEventListener("click", () => {
        rowToDelete = newRow;
        deleteOverlay.style.display = "block";
        deleteModal.style.display = "block";
    });
};


    // Event listener for the "Yes" button to confirm deletion
    yes.addEventListener("click", () => {
        if (rowToDelete) {
            rowToDelete.remove(); // Remove the selected row from the table
            rowToDelete = null; // Reset the rowToDelete variable
        }
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });

    // Event listener for the "No" button to cancel deletion
    no.addEventListener("click", () => {
        rowToDelete = null; // Reset the rowToDelete variable
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });

    // Add event listener for the "Add New Operation" button
    addNewOperation.addEventListener("click", addRow);

    // Initialize the existing rows
    const existingRows = document.querySelectorAll(".operation-row");
    existingRows.forEach(row => {
        handleOperationChange(row);

        // Add event listener for the delete action
        const trashCan = row.querySelector(".fa-trash-can");
        trashCan.addEventListener("click", () => {
            rowToDelete = row;
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    // Handle number-only input
    document.addEventListener("input", (e) => {
        if (e.target.matches(".add-operation-weight")) {
            const regex = /^[0-9.]*$/;
            if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            }
        }
    });
});



// Customer Dropdown menu for first row
const customerDropdown = document.querySelector(".customer-dropdown")
fetch("http://localhost:5000/api/Person/GetPersonsDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option value="" selected disabled hidden ></option>`
    posts.forEach(function (item) {
        code += ` <option value="${item.id}"><a href="#">${item.name}</a></option> `
    })
    customerDropdown.innerHTML = code
})


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



// ADD OPERATION
const selectElement = document.querySelector("#operation-select");

selectElement.addEventListener("change", (e) => {
    const selectedValue = e.target.value;  // Get the selected value
    console.log("Selected operation value:", selectedValue);
});


customerDropdown.addEventListener("change", (e) =>{
    const selectedCustomer = e.target.value
    console.log("customer", selectedCustomer);
})


productDropdown.addEventListener("change", (e)=>{
    const selectedProduct = e.target.value
    console.log("product", selectedProduct);
})


executorDropdown.addEventListener("change", (e)=>{
    const selectedExecutor = e.target.value
    console.log("executor", selectedExecutor);
})

const addWeight = document.querySelector(".add-weight")
const addDeductedWeight = document.querySelector(".add-deducted-weight")
const addDeductedPercentage = document.querySelector(".add-deducted-percentage")
const addPrice = document.querySelector(".add-price")
const addGivenMoney = document.querySelector(".add-given-money")
const addReceivedMoney = document.querySelector(".add-received-money")


addWeight.addEventListener("change", (e)=> {
    const selectedWeight = e.target.value
    console.log("weigth", selectedWeight);
})


addDeductedWeight.addEventListener("change", (e)=> {
    const selectedDeductedWeight = e.target.value
    console.log("de.weigth", selectedDeductedWeight);
})


addDeductedPercentage.addEventListener("change", (e)=> {
    const selectedDeductedPercentage = e.target.value
    console.log("de.per", selectedDeductedPercentage);
})


addPrice.addEventListener("change", (e)=> {
    const selectedPrice = e.target.value
    console.log("price", selectedPrice);
})


addGivenMoney.addEventListener("change", (e)=> {
    const selectedGivenMoney = e.target.value
    console.log("selectedGivenMoney", selectedGivenMoney);
})


addReceivedMoney.addEventListener("change", (e)=> {
    const selectedReceivedMoney = e.target.value
    console.log("selectedReceivedMoney", selectedReceivedMoney);
})



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
            operationTypeId:  selectedValue != 0 ? selectedValue : 0,
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




// document.querySelector(".save-operation-btn").addEventListener("click", (e) => {
//     e.preventDefault();

//     const selectedValue = selectElement.value;  // Get the selected value from the select element
//     const selectedCustomer = customerDropdown.value;
//     const selectedProduct = productDropdown.value;
//     const selectedExecutor = executorDropdown.value;
//     const selectedWeight = addWeight.value;
//     const selectedDeductedWeight = addDeductedWeight.value;
//     const selectedDeductedPercentage = addDeductedPercentage.value;
//     const selectedPrice = addPrice.value;
//     const selectedGivenMoney = addGivenMoney.value;
//     const selectedReceivedMoney = addReceivedMoney.value;

//     console.log("Operation Type:", selectedValue);
//     console.log("Customer:", selectedCustomer);
//     console.log("Product:", selectedProduct);
//     console.log("Executor:", selectedExecutor);
//     console.log("Weight:", selectedWeight);
//     console.log("Deducted Weight:", selectedDeductedWeight);
//     console.log("Deducted Percentage:", selectedDeductedPercentage);
//     console.log("Price:", selectedPrice);
//     console.log("Given Money:", selectedGivenMoney);
//     console.log("Received Money:", selectedReceivedMoney);

//     let requestBody = [];

//     // Correct assignment of values
//     requestBody.push({
//         operationTypeId: selectedValue != 0 ? selectedValue : 0,
//         personId: selectedCustomer != 0 ? selectedCustomer : 0,
//         productId: selectedProduct != 0 ? selectedProduct : 0,
//         employeeId: selectedExecutor != 0 ? selectedExecutor : 0,
//         weight: selectedWeight != 0 ? selectedWeight : 0,
//         deductedWeight: selectedDeductedWeight != 0 ? selectedDeductedWeight : 0,
//         deductedPercentage: selectedDeductedPercentage != 0 ? selectedDeductedPercentage : 0,
//         pricePerUnit: selectedPrice != 0 ? selectedPrice : 0,
//         moneyGive: selectedGivenMoney != 0 ? selectedGivenMoney : 0,
//         moneyGet: selectedReceivedMoney != 0 ? selectedReceivedMoney : 0,
//         isGift: true
//     });

//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
//             return;
//         }
//         return res.json(); // Parse the response as JSON
//     })
//     .then(data => {
//         console.log("Operation added successfully:", data); // Log the response data
//     })
//     .catch(err => {
//         console.error("Error during fetch:", err); // Log any errors
//     });
// });

/////////////////////////////////////


// document.querySelector(".save-operation-btn").addEventListener("click", (e) => {
//     e.preventDefault();

//     // Collect all the operation rows
//     const operationRows = document.querySelectorAll(".operation-row");

//     let requestBody = [];

//     // Loop through each operation row to gather data
//     operationRows.forEach((row) => {
//         const selectElement = row.querySelector(".operation-name");
//         const customerDropdown = row.querySelector(".customer-dropdown");
//         const productDropdown = row.querySelector(".product-dropdown");
//         const executorDropdown = row.querySelector(".executor-dropdown");
//         const addWeight = row.querySelector(".add-weight");
//         const addDeductedWeight = row.querySelector(".add-deducted-weight");
//         const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
//         const addPrice = row.querySelector(".add-price");
//         const addGivenMoney = row.querySelector(".add-given-money");
//         const addReceivedMoney = row.querySelector(".add-received-money");

//         // Extract values for each row
//         const selectedValue = selectElement.value;
//         const selectedCustomer = customerDropdown.value;
//         const selectedProduct = productDropdown.value;
//         const selectedExecutor = executorDropdown.value;
//         const selectedWeight = addWeight.value;
//         const selectedDeductedWeight = addDeductedWeight.value;
//         const selectedDeductedPercentage = addDeductedPercentage.value;
//         const selectedPrice = addPrice.value;
//         const selectedGivenMoney = addGivenMoney.value;
//         const selectedReceivedMoney = addReceivedMoney.value;

//         // Push the operation data into the requestBody array
//         requestBody.push({
//             operationTypeId: selectedValue != 0 ? selectedValue : 0,
//             personId: selectedCustomer != 0 ? selectedCustomer : 0,
//             productId: selectedProduct != 0 ? selectedProduct : 0,
//             employeeId: selectedExecutor != 0 ? selectedExecutor : 0,
//             weight: selectedWeight != 0 ? selectedWeight : 0,
//             deductedWeight: selectedDeductedWeight != 0 ? selectedDeductedWeight : 0,
//             deductedPercentage: selectedDeductedPercentage != 0 ? selectedDeductedPercentage : 0,
//             pricePerUnit: selectedPrice != 0 ? selectedPrice : 0,
//             moneyGive: selectedGivenMoney != 0 ? selectedGivenMoney : 0,
//             moneyGet: selectedReceivedMoney != 0 ? selectedReceivedMoney : 0,
//             isGift: true
//         });
//     });

//     // Now that we have an array of operations, we send them all at once
//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
//             return;
//         }
//         return res.json(); // Parse the response as JSON
//     })
//     .then(data => {
//         console.log("Operations added successfully:", data); // Log the response data
//     })
//     .catch(err => {
//         console.error("Error during fetch:", err); // Log any errors
//     });
// });

///////////////


//////////////////////////////////////////////

// document.querySelector(".save-operation-btn").addEventListener("click", (e) => {
//     e.preventDefault();

//     const operationRows = document.querySelectorAll(".operation-row");

//     let requestBody = [];

//     operationRows.forEach((row) => {
//         const selectElement = row.querySelector(".operation-name");
//         const customerDropdown = row.querySelector(".customer-dropdown");
//         const productDropdown = row.querySelector(".product-dropdown");
//         const executorDropdown = row.querySelector(".executor-dropdown");
//         const addWeight = row.querySelector(".add-weight");
//         const addDeductedWeight = row.querySelector(".add-deducted-weight");
//         const addDeductedPercentage = row.querySelector(".add-deducted-percentage");
//         const addPrice = row.querySelector(".add-price");
//         const addGivenMoney = row.querySelector(".add-given-money");
//         const addReceivedMoney = row.querySelector(".add-received-money");

//         const selectedValue = selectElement.value;
//         const selectedCustomer = customerDropdown.value;
//         const selectedProduct = productDropdown.value;
//         const selectedExecutor = executorDropdown.value;
//         const selectedWeight = addWeight.value;
//         const selectedDeductedWeight = addDeductedWeight.value;
//         const selectedDeductedPercentage = addDeductedPercentage.value;
//         const selectedPrice = addPrice.value;
//         const selectedGivenMoney = addGivenMoney.value;
//         const selectedReceivedMoney = addReceivedMoney.value;

//         requestBody.push({
//             operationTypeId: selectedValue != 0 ? parseInt(selectedValue) : null,
//             personId: selectedCustomer != 0 ? parseInt(selectedCustomer) : null,
//             productId: selectedProduct != 0 ? parseInt(selectedProduct) : null,
//             employeeId: selectedExecutor != 0 ? parseInt(selectedExecutor) : null,
//             weight: selectedWeight != 0 ? parseFloat(selectedWeight) : null,
//             deductedWeight: selectedDeductedWeight != 0 ? parseFloat(selectedDeductedWeight) : null,
//             deductedPercentage: selectedDeductedPercentage != 0 ? parseFloat(selectedDeductedPercentage) : null,
//             pricePerUnit: selectedPrice != 0 ? parseFloat(selectedPrice) : null,
//             moneyGive: selectedGivenMoney != 0 ? parseFloat(selectedGivenMoney) : null,
//             moneyGet: selectedReceivedMoney != 0 ? parseFloat(selectedReceivedMoney) : null,
//             isGift: true
//         });
//     });

//     // Helper function to send each request
//     const sendOperation = (operation) => {
//         return fetch("http://localhost:5000/api/Operation/AddOperation", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(operation)
//         })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error("Failed to add operation");
//             }
//             return res.json();
//         });
//     };

//     // Sequentially send each operation in the array
//     requestBody.reduce((promiseChain, operation) => {
//         return promiseChain.then(() => sendOperation(operation));
//     }, Promise.resolve())
//     .then(() => {
//         console.log("All operations added successfully!");
//     })
//     .catch(err => {
//         console.error("Error while adding operations:", err);
//     });
// });



// document.querySelector(".save-operation-btn").addEventListener("click", (e)=>{
//     e.preventDefault()


//     const selectedValue = selectElement.value;  // Get the selected value from the select element
//     console.log("Value on Save button click:", selectedValue);


//     const selectedCustomer = customerDropdown.value
//     console.log("selectedCustomer",selectedCustomer);


//     const selectedProduct = productDropdown.value
//     console.log("selectedProduct", selectedProduct);


//     const selectedExecutor = executorDropdown.value
//     console.log("selectedExecutor", selectedExecutor);


//     const selectedWeight = addWeight.value
//     console.log("selectedWeight", selectedWeight);

//     const selectedDeductedWeight = addDeductedWeight.value
//     console.log("selectedDeductedWeight", selectedDeductedWeight);


//     const selectedDeductedPercentage = addDeductedPercentage.value
//     console.log("selectedDeductedPercentage", selectedDeductedPercentage);


//     const selectedPrice = addPrice.value
//     console.log("selectedPrice", selectedPrice);


//     const selectedGivenMoney = addGivenMoney.value
//     console.log("selectedGivenMoney", selectedGivenMoney);


//     const selectedReceivedMoney = addReceivedMoney.value
//     console.log("selectedReceivedMoney", selectedReceivedMoney);

//     let requestBody = [];

//     requestBody.push({
//         operationTypeId: selectedValue != 0 ? selectedValue : 0,
//         personId: selectedCustomer != 0  ? selectedValue : 0,
//         productId: selectedProduct != 0  ? selectedValue : 0,
//         employeeId: selectedExecutor != 0  ? selectedValue : 0,
//         weight: selectedWeight != 0  ? selectedValue : 0,
//         deductedWeight: selectedDeductedWeight != 0  ? selectedValue : 0,
//         deductedPercentage: selectedDeductedPercentage != 0  ? selectedValue : 0,
//         pricePerUnit: selectedPrice != 0  ? selectedValue : 0,
//         moneyGive: selectedGivenMoney != 0  ? selectedValue : 0,
//         moneyGet: selectedReceivedMoney != 0  ? selectedValue : 0,
//         isGift: true
//     })



//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
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

// })
//////



// document.querySelector(".save-operation-btn").addEventListener("click", (e) => {
//     e.preventDefault();

//     const selectedValue = selectElement?.value || null;
//     const selectedCustomer = customerDropdown?.value || null;
//     const selectedProduct = productDropdown?.value || null;
//     const selectedExecutor = executorDropdown?.value || null;
//     const selectedWeight = addWeight?.value || null;
//     const selectedDeductedWeight = addDeductedWeight?.value || null;
//     const selectedDeductedPercentage = addDeductedPercentage?.value || null;
//     const selectedPrice = addPrice?.value || null;
//     const selectedGivenMoney = addGivenMoney?.value || null;
//     const selectedReceivedMoney = addReceivedMoney?.value || null;

//     // Log values for debugging
//     console.log("Selected Operation:", selectedValue);
//     console.log("Selected Customer:", selectedCustomer);
//     console.log("Selected Product:", selectedProduct);
//     console.log("Selected Executor:", selectedExecutor);
//     console.log("Weight:", selectedWeight);
//     console.log("Deducted Weight:", selectedDeductedWeight);
//     console.log("Deducted Percentage:", selectedDeductedPercentage);
//     console.log("Price per Unit:", selectedPrice);
//     console.log("Given Money:", selectedGivenMoney);
//     console.log("Received Money:", selectedReceivedMoney);

//     // Ensure all fields have values and are valid
//     // if (!selectedValue || !selectedCustomer || !selectedProduct || !selectedExecutor) {
//     //     console.error("Missing required fields!");
//     //     return;
//     // }

//     // Prepare the request body (convert necessary fields to integers)
//     const requestBody = [{
//         operationTypeId: parseInt(selectedValue),
//         personId: parseInt(selectedCustomer),
//         productId: parseInt(selectedProduct),
//         employeeId: parseInt(selectedExecutor),
//         weight: parseFloat(selectedWeight) || 0,  // Ensure numeric fields are numbers
//         deductedWeight: parseFloat(selectedDeductedWeight) || 0,
//         deductedPercentage: parseFloat(selectedDeductedPercentage) || 0,
//         pricePerUnit: parseFloat(selectedPrice) || 0,
//         moneyGive: parseFloat(selectedGivenMoney) || 0,
//         moneyGet: parseFloat(selectedReceivedMoney) || 0,
//         isGift: true  // Set this as true, or change based on your logic
//     }];

//     // Send the request
//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             return res.json().then(errData => {
//                 console.error("Server response error:", errData);
//             });
//         }
//         return res.json(); // Parse the response as JSON
//     })
//     .then(data => {
//         console.log("Operation successfully added:", data); // Log the response data
//     })
//     .catch(err => {
//         console.error("Network or server error:", err); // Log any errors
//     });
// });






//////////////











// document.querySelector(".save-operation-btn").addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     // Get dropdown elements
//     const customerDropdown = document.querySelector(".customer-dropdown");
//     const productDropdown = document.querySelector(".product-dropdown");
//     const executorDropdown = document.querySelector(".executor-dropdown");

//     // Prepare the request body as a JSON object
//     const requestBody = {
//         operationTypeId: document.querySelector(".operation-name").value,
//         personId: customerDropdown.value,
//         productId: document.querySelector(".prod-id").value, // Include the list here
//         employeeId: executorDropdown.value,
//         weight: document.querySelector(".add-weight").value,
//         deductedWeight: document.querySelector(".add-deducted-weight").value,
//         deductedPercentage: document.querySelector(".add-deducted-percentage").value,
//         pricePerUnit: document.querySelector(".add-price").value,
//         moneyGive: document.querySelector(".add-given-money").value,
//         moneyGet: document.querySelector(".add-received-money").value,
//     };

//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
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


// document.querySelector(".save-operation-btn").addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     // Get dropdown elements
//     const customerDropdown = document.querySelector(".customer-dropdown");
//     const productDropdown = document.querySelector(".product-dropdown");
//     const executorDropdown = document.querySelector(".executor-dropdown");

//     // Assuming the product IDs can be multiple and you want to send them as an array
//     const selectedProducts = Array.from(productDropdown.selectedOptions).map(option => option.value);

//     // Prepare the request body as a JSON object
//     const requestBody = {
//         operationTypeId: document.querySelector(".operation-name").value,
//         personId: customerDropdown.value,
//         productIds: selectedProducts, // Array of selected product IDs
//         employeeId: executorDropdown.value,
//         weight: document.querySelector(".add-weight").value,
//         deductedWeight: document.querySelector(".add-deducted-weight").value,
//         deductedPercentage: document.querySelector(".add-deducted-percentage").value,
//         pricePerUnit: document.querySelector(".add-price").value,
//         moneyGive: document.querySelector(".add-given-money").value,
//         moneyGet: document.querySelector(".add-received-money").value,
//     };

//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
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



// const selectElement = document.querySelector(".operation-name");

// selectElement.addEventListener("change", (e) => {
//     const selectedValue = e.target.value;  // Get the selected value
//     console.log("Selected operation value:", selectedValue);
// });

// customerDropdown.addEventListener("change", (e) =>{
//     const selectedCustomer = e.target.value
//     console.log("customer", selectedCustomer);
// })

// productDropdown.addEventListener("change", (e)=>{
//     const selectedProduct = e.target.value
//     console.log("product", selectedProduct);
// })

// executorDropdown.addEventListener("change", (e)=>{
//     const selectedExecutor = e.target.value
//     console.log("product", selectedExecutor);
// })



// addWeight?.addEventListener("change", (e)=> {
//     const selectedWeight = e.target.value
//     console.log("weigth", selectedWeight);
// })


// addPrice?.addEventListener("change", (e)=> {
//     const selectedPrice = e.target.value
//     console.log("weigth", selectedPrice);
// })


// // addNetAmount?.addEventListener("change", (e)=> {
// //     const selectedNetPrice = e.target.value
// //     console.log("weigth", selectedNetPrice);
// // })

// addDeductedWeight.addEventListener("change", (e)=> {
//     const selectedDeductedWeight = e.target.value
//     console.log("weigth", selectedDeductedWeight);
// })

// addDeductedPercentage.addEventListener("change", (e)=> {
//     const selectedDeductedPercentage = e.target.value
//     console.log("weigth", selectedDeductedPercentage);
// })

// // addAmount.addEventListener("change", (e)=> {
// //     const selectedAmount = e.target.value
// //     console.log("weigth", selectedAmount);
// // })

// givenMoney.addEventListener("change", (e)=> {
//     const selectedGivenMoney = e.target.value
//     console.log("weigth", selectedGivenMoney);
// })

// receivedMoney.addEventListener("change", (e)=> {
//     const selectedReceivedMoney = e.target.value
//     console.log("weigth", selectedReceivedMoney);
// })



// document.querySelector(".save-operation-btn").addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     const selectedValue = selectElement.value;
//     console.log(selectedValue);


//     const selectedCustomer = customerDropdown.value
//     console.log("selected",selectedCustomer);


//     const selectedProduct = productDropdown.value
//     console.log("Product Id", selectedProduct);


//     const selectedExecutor = executorDropdown.value
//     console.log("exec Id", selectedExecutor);

//     const selectedWeight = addWeight.value
//     console.log("weight", selectedWeight);

//     const selectedPrice = addPrice.value
//     console.log("inputPrice", selectedPrice);
    
//     const selectedDeductedWeight = addDeductedWeight.value
//     console.log("inputPrice", selectedDeductedWeight);

//     const selectedDeductedPercentage = addDeductedPercentage.value
//     console.log("inputPrice", selectedDeductedPercentage);

//     const selectedGivenMoney = givenMoney.value
//     console.log("inputPrice", selectedGivenMoney);

//     const selectedReceivedMoney = receivedMoney.value
//     console.log("inputPrice", selectedReceivedMoney);

//     // Get dropdown elements
//     // const customerDropdown = document.querySelector(".customer-dropdown");
//     // const productDropdown = document.querySelector(".product-dropdown");
//     // const executorDropdown = document.querySelector(".executor-dropdown");

//     // Array that will hold multiple operation entries
//     let operationsArray = [];

//     // Prepare the request body as an array of objects
//     operationsArray.push({
//         operationTypeId: selectedValue,
//         personId: selectedCustomer,
//         productId: selectedProduct, // Include the list here
//         employeeId: selectedExecutor,
//         weight: selectedWeight,
//         deductedWeight: selectedDeductedWeight,
//         deductedPercentage: selectedDeductedPercentage,
//         pricePerUnit: selectedPrice,
//         moneyGive: selectedGivenMoney,
//         moneyGet: selectedReceivedMoney,
//         isGift: true
//     });

//     // Now send the array of operations to the API
//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type as JSON
//         },
//         body: JSON.stringify(operationsArray) // Convert the array to a JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
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




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Select all elements
// const selectElement = document.querySelector(".operation-name");
// // const customerDropdown = document.querySelector(".customer-dropdown");
// // const productDropdown = document.querySelector(".product-dropdown");
// // const executorDropdown = document.querySelector(".executor-dropdown");
// const addWeight = document.querySelector(".add-weight");
// const addPrice = document.querySelector(".add-price");
// const addDeductedWeight = document.querySelector(".add-deducted-weight");
// const addDeductedPercentage = document.querySelector(".add-deducted-percentage");
// const givenMoney = document.querySelector(".add-given-money");
// const receivedMoney = document.querySelector(".add-received-money");

// // Event listener for operation type
// selectElement?.addEventListener("change", (e) => {
//     const selectedValue = e.target.value;
//     console.log("Selected operation value:", selectedValue);
// });

// // Event listener for customer selection
// customerDropdown?.addEventListener("change", (e) => {
//     const selectedCustomer = e.target.value;
//     console.log("Customer:", selectedCustomer);
// });

// // Event listener for product selection
// productDropdown?.addEventListener("change", (e) => {
//     const selectedProduct = e.target.value;
//     console.log("Product:", selectedProduct);
// });

// // Event listener for executor selection
// executorDropdown?.addEventListener("change", (e) => {
//     const selectedExecutor = e.target.value;
//     console.log("Executor:", selectedExecutor);
// });

// // Event listener for weight input
// addWeight?.addEventListener("change", (e) => {
//     const selectedWeight = e.target.value;
//     console.log("Weight:", selectedWeight);
// });

// // Event listener for price input
// addPrice?.addEventListener("change", (e) => {
//     const selectedPrice = e.target.value;
//     console.log("Price:", selectedPrice);
// });

// // Event listener for deducted weight
// addDeductedWeight?.addEventListener("change", (e) => {
//     const selectedDeductedWeight = e.target.value;
//     console.log("Deducted Weight:", selectedDeductedWeight);
// });

// // Event listener for deducted percentage
// addDeductedPercentage?.addEventListener("change", (e) => {
//     const selectedDeductedPercentage = e.target.value;
//     console.log("Deducted Percentage:", selectedDeductedPercentage);
// });

// // Event listener for given money
// givenMoney?.addEventListener("change", (e) => {
//     const selectedGivenMoney = e.target.value;
//     console.log("Given Money:", selectedGivenMoney);
// });

// // Event listener for received money
// receivedMoney?.addEventListener("change", (e) => {
//     const selectedReceivedMoney = e.target.value;
//     console.log("Received Money:", selectedReceivedMoney);
// });

// // Event listener for saving operation
// document.querySelector(".save-operation-btn")?.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the form from submitting traditionally

//     // Collect form values
//     const selectedValue = selectElement?.value || "";
//     const selectedCustomer = customerDropdown?.value || "";
//     const selectedProduct = productDropdown?.value || "";
//     const selectedExecutor = executorDropdown?.value || "";
//     const selectedWeight = addWeight?.value || "";
//     const selectedPrice = addPrice?.value || "";
//     const selectedDeductedWeight = addDeductedWeight?.value || "";
//     const selectedDeductedPercentage = addDeductedPercentage?.value || "";
//     const selectedGivenMoney = givenMoney?.value || "";
//     const selectedReceivedMoney = receivedMoney?.value || "";

//     // Log values for debugging
//     console.log("Selected Operation:", selectedValue);
//     console.log("Selected Customer:", selectedCustomer);
//     console.log("Selected Product:", selectedProduct);
//     console.log("Selected Executor:", selectedExecutor);
//     console.log("Weight:", selectedWeight);
//     console.log("Price per Unit:", selectedPrice);
//     console.log("Deducted Weight:", selectedDeductedWeight);
//     console.log("Deducted Percentage:", selectedDeductedPercentage);
//     console.log("Given Money:", selectedGivenMoney);
//     console.log("Received Money:", selectedReceivedMoney);

//     // Prepare the request body as an array of objects
//     const operationsArray = [{
//         operationTypeId: selectedValue,
//         personId: selectedCustomer,
//         productId: selectedProduct,
//         employeeId: selectedExecutor,
//         weight: selectedWeight,
//         deductedWeight: selectedDeductedWeight,
//         deductedPercentage: selectedDeductedPercentage,
//         pricePerUnit: selectedPrice,
//         moneyGive: selectedGivenMoney,
//         moneyGet: selectedReceivedMoney,
//         isGift: true
//     }];

//     // Send the operations array to the API
//     fetch("http://localhost:5000/api/Operation/AddOperation", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify content type as JSON
//         },
//         body: JSON.stringify(operationsArray) // Convert array to JSON string
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with response");
//             return;
//         }
//         return res.json(); // Parse response as JSON
//     })
//     .then(data => {
//         console.log("Operation saved:", data); // Log response data
//     })
//     .catch(err => {
//         console.error("Error:", err); // Log any errors
//     });
// });




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


























// // Save operation
//     document.querySelector(".save-operation-btn").addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     // Prepare the request body as a JSON object
//     const requestBody = {
//         operationTypeId: document.querySelector(".operation-name").value,
//         personId: customerDropdown.value,
//         productId: productDropdown.value,
//         employeeId: executorDropdown.value,
//         weight: document.querySelector(".add-weight").value,
//         deductedWeight:  document.querySelector(".add-deducted-weight"),
//         deductedPercentage: document.querySelector(".add-deducted-percentage"),
//         pricePerUnit: document.querySelector(".add-price"),
//         moneyGive: document.querySelector(".add-given-money"),
//         moneyGet: document.querySelector(".add-received-money")
//     };

//     fetch("http://localhost:5000/api/Operation/AddOperation", {
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
// })


