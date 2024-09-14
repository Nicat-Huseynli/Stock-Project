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
            moneyGet: selectedReceivedMoney != 0 ? selectedReceivedMoney : 0
            // isGift: true
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
