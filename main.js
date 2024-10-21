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




// Add operation
const addOperation = document.querySelector(".add-operation")
const addOperationOverlay = document.querySelector(".add-operation-overlay")
const addOperationModal = document.querySelector(".add-operation-modal")

addOperation?.addEventListener("click", ()=>{
    addOperationModal.style.display = "flex"
    addOperationOverlay.style.display = "block"
})

addOperationOverlay?.addEventListener("click", () => {
    addOperationModal.style.display = "none";
    addOperationOverlay.style.display = "none";
});



const special = document.querySelector(".special");
const addOperationSpecially = document.querySelector(".add-operation-specially");
const addOperationSpeciallyOverlay = document.querySelector(".add-operation-specially-overlay");

special?.addEventListener("click", () => {
    addOperationSpecially.style.display = "flex";
    addOperationSpeciallyOverlay.style.display = "block"; // Show the overlay
});

addOperationSpeciallyOverlay?.addEventListener("click", () => {
    addOperationSpecially.style.display = "none";
    addOperationSpeciallyOverlay.style.display = "none"; // Hide the overlay
});



fetch("http://localhost:5000/api/Person/GetPersonsDropdown")
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
        let options = `<option value="0" selected disabled hidden>Müştəri</option> 
                       <option class="add-new-customer-dropdown" value="add-customer" style="background-color: black; color: white">✚</option>`
        posts.forEach(function(item) {
            options += `<option value="${item.id}">${item.name}</option>`;
        });
        speciallyCustomerDropdown.innerHTML = options;
    })
    .catch(err => console.error("Failed to fetch customer data:", err));

const speciallySelectElement = document.querySelector("#special-operation-select");
const speciallyCustomerDropdown = document.querySelector(".customer-dropdown-special");

// Add event listener to check the selected value
speciallyCustomerDropdown.addEventListener("change", function() {
    let selectedValue = speciallyCustomerDropdown.value;
    console.log("Selected value:", selectedValue);

    if (selectedValue === "add-customer") {
        console.log("Add new customer option selected");
        document.querySelector(".add-customer-overlay").style.display = "block"
        document.querySelector(".add-customer-modal").style.display = "block"
        document.querySelector(".add-customer-overlay").addEventListener("click", () => {
            document.querySelector(".add-customer-overlay").style.display = "none"
            document.querySelector(".add-customer-modal").style.display = "none"
        })

    } else {
        console.log("Selected customer ID:", selectedValue);
    }
});


const enterCustomerName = document.querySelector(".enter-customer-name");

    document.querySelector(".add-customer-btn")?.addEventListener("click", (event) => {
    // event.preventDefault(); // Prevent the form from submitting the traditional way

    // document.querySelector(".customer-dropdown").value = enterCustomerName.value

    // Prepare the request body as a JSON object
    const requestBody = {
        name: enterCustomerName.value // Capture the value from the input field
    };

    fetch("http://localhost:5000/api/Person/Add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
    })
    .then(res => {
        if (!res.ok) {
            console.log("Problem");
            return;
        }
        return res.json(); // Parse the response as JSON
    })
    .then(data => {
        console.log(data); // Log the response data
    })
    .catch(err => {
        console.log(err); // Log any errors
    });

    // document.querySelector("add-operation-specially-overlay").style.display = "block"
    // document.querySelector("add-operation-specially").style.display = "flex"


    // addOperationSpeciallyOverlay.style.display = "block"
    // addOperationSpecially.style.display = "flex"
});




speciallySelectElement.addEventListener("change", (e) => {
    const speciallySelectedValue = e.target.value;  // Get the selected value
    console.log("Selected operation value:", speciallySelectedValue);
});


speciallyCustomerDropdown.addEventListener("change", (e) =>{
    const speciallySelectedCustomer = e.target.value
    console.log("customer", speciallySelectedCustomer);
})
    

function getValue(){
    const speciallySelectedValue = speciallySelectElement.value;
    const speciallySelectedCustomer = speciallyCustomerDropdown.value;
    // console.log(speciallySelectedValue);
    localStorage.setItem("operation Value",speciallySelectedValue) 
    localStorage.setItem("customer Value",speciallySelectedCustomer)   
    
    
    const selectedOperationText = speciallySelectElement.options[speciallySelectElement.selectedIndex].text;
    const selectedCustomerText = speciallyCustomerDropdown.options[speciallyCustomerDropdown.selectedIndex].text;

    localStorage.setItem("operation Value Text",selectedOperationText) 
    localStorage.setItem("customer Value Text",selectedCustomerText)    
}


const specialOperationBtn = document.querySelector(".special-operation-btn")

specialOperationBtn.addEventListener("click", (e)=>{

    e.preventDefault()

    const speciallySelectedValue = speciallySelectElement.value;  // Get the selected value from the select element
    console.log("Value on Save button click:", speciallySelectedValue);

    // let OperationTypeId = selectedValue
    // console.log( "ID" ,OperationTypeId);



    const speciallySelectedCustomer = speciallyCustomerDropdown.value
    console.log("selected",speciallySelectedCustomer);

    // let PersonId = selectedCustomer
    // console.log("Customer ID", PersonId);

    if(speciallySelectedValue === '0' || speciallySelectedCustomer === '0'){
        // alert("Məlumatları daxil edin!")

        document.querySelector(".warning-modal").style.display = "flex"
        document.querySelector(".warning-modal-overlay").style.display = "block"
        document.querySelector(".warning-modal-overlay").addEventListener("click", ()=>{
            document.querySelector(".warning-modal").style.display = "none"
            document.querySelector(".warning-modal-overlay").style.display = "none"
        })

        document.querySelector(".fa-xmark").addEventListener("click", ()=>{
            document.querySelector(".warning-modal").style.display = "none"
            document.querySelector(".warning-modal-overlay").style.display = "none"
        })

        // window.location.href = "index.html";
    } else {
        window.location.href = "add-operation-specially.html"
    }
})


// Fetch

const tbody = document.querySelector("tbody")
const trashCan = document.querySelectorAll(".fa-trash-can");
const deleteOverlay = document.querySelector(".delete-overlay");
const deleteModal = document.querySelector(".delete-modal");
const answer = document.querySelectorAll(".answer")
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")
const operationRow = document.querySelectorAll(".operation-row")

fetch("http://localhost:5000/api/Operation/GetOperations")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        code += `
              <tr class="operation-row" data-id="${item.id}">
                <th scope="row" class="id-num">${item.id}</th>
                <td class="operation-type">${item.operationTypeName}</td>
                <td>${item.personName}</td>
                <td>${item.productName}</td>
                <td>${item.employeeName}</td>
                <td>${formatDate(item.addedDate)}</td>
                <td>${item.weight}</td>
                <td>${item.deductedWeight}</td>
                <td>${item.remainingWeight}</td>
                <td>${item.deductedPercentage}</td>
                <td>${item.netWeight}</td>
                <td>${item.pricePerUnit}</td>
                <td>${item.totalPrice}</td>
                <td>${item.netPrice}</td>
                <td>${item.moneyGive}</td>
                <td>${item.moneyGet}</td>
                <td><i class="fa-solid fa-pencil edit-icon"></i></td>
                <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
              </tr>  `
    })
    tbody.innerHTML = code

    attachDeleteEventListeners();
    attachEditEventListeners();
    })
    .catch(error => console.log(error));


// Attach DELETE event listeners
function attachDeleteEventListeners() {
    const trashCan = document.querySelectorAll(".fa-trash-can");
    let currentRow; // Variable to keep track of the current row

    trashCan.forEach(trash => {
        trash.addEventListener("click", () => {
            currentRow = trash.closest(".operation-row"); // Store the current row
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    
// Handle the "Yes" button click for deletion
yes.addEventListener("click", () => {
    if (currentRow) {
        const rowId = currentRow.getAttribute("data-id");

        fetch(`http://localhost:5000/api/Operation/DeleteOperation?id=${rowId}`, {
            method: 'DELETE',
        })
        .then(res => {
            console.log(res);

            if (!res.ok) {
                console.log("Problem with delete request");
                return;
            }

            if (res.status === 4) {
                console.log("15 gündən sonra silmək olmaz");


                document.querySelector(".delete-warning-overlay").style.display = "flex";
                document.querySelector(".delete-warning-modal").style.display = "flex";

                document.querySelector(".close-delete-warning-modal").addEventListener("click", () => {
                    document.querySelector(".delete-warning-overlay").style.display = "none";
                    document.querySelector(".delete-warning-modal").style.display = "none";
                });
            } else {
                currentRow.remove();
            }

            deleteOverlay.style.display = "none";
            deleteModal.style.display = "none";
        })
        .catch(err => {
            console.log("Error with fetch:", err);
        });
    }
});



    no.addEventListener("click", () => {
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });
}



// const enterProductName = document.querySelector(".enter-product-name");
// const enterWeight = document.querySelector(".enter-weight");
// const editOverlay = document.querySelector(".edit-overlay");
// const editWarehouseModal = document.querySelector(".edit-warehouse-modal");
// const editWarehouseBtn = document.querySelector(".edit-warehouse-btn");

// Edit
const editOverlay = document.querySelector(".edit-overlay");
const editCustomerModal = document.querySelector(".edit-customer-modal");
const editIcons = document.querySelectorAll(".edit-icon");
const editOperationBtn = document.querySelector(".edit-operation-btn");

function attachEditEventListeners() {
    const editIcons = document.querySelectorAll(".edit-icon");

    // const personId = localStorage.getItem('userid');

    editIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const row = icon.closest(".operation-row");
            const weight = row.querySelector("td:nth-child(7)").textContent;
            const deductedWeight = row.querySelector("td:nth-child(8)").textContent
            const deductedPercentage = row.querySelector("td:nth-child(10)").textContent
            const pricePerUnit = row.querySelector("td:nth-child(12)").textContent
            const moneyGive = row.querySelector("td:nth-child(15)").textContent
            const moneyGet = row.querySelector("td:nth-child(16)").textContent

            const id = row.getAttribute("data-id");

            // Populate the edit form with current data
            document.querySelector(".edit-weight").value = weight;
            document.querySelector(".edit-deductedWeight").value = deductedWeight;
            document.querySelector(".edit-deductedPercentage").value = deductedPercentage;
            document.querySelector(".edit-pricePerUnit").value = pricePerUnit;
            document.querySelector(".edit-moneyGive").value = moneyGive;
            document.querySelector(".edit-moneyGet").value = moneyGet;

            document.querySelector("input[name='id']").value = id;

            editOverlay.style.display = "block";
            editCustomerModal.style.display = "block";

            const operationType = row.querySelector(".operation-type").textContent
            console.log(operationType); 
    
    
            if(operationType === "Alış" || operationType === "Satış"){
                document.querySelector(".edit-moneyGive-div").setAttribute("hidden", true);
                document.querySelector(".edit-moneyGet-div").setAttribute("hidden", true);


                document.querySelector(".edit-weight-div").removeAttribute("hidden");
                document.querySelector(".edit-deductedWeight-div").removeAttribute("hidden");
                document.querySelector(".edit-deductedPercentage-div").removeAttribute("hidden");
                document.querySelector(".edit-pricePerUnit-div").removeAttribute("hidden");
                document.querySelector(".edit-moneyGive-div").setAttribute("hidden", true);


                document.querySelector(".edit-customer-modal").style.top = "15%"
                document.querySelector(".edit-customer-modal").style.height = "65vh"
                document.querySelector(".edit-form").style.top = "7%"
            }
            else if(operationType === "Pul almaq"){
                document.querySelector(".edit-weight-div").setAttribute("hidden", true);
                document.querySelector(".edit-deductedWeight-div").setAttribute("hidden", true);
                document.querySelector(".edit-deductedPercentage-div").setAttribute("hidden", true);
                document.querySelector(".edit-pricePerUnit-div").setAttribute("hidden", true);
                document.querySelector(".edit-moneyGive-div").setAttribute("hidden", true);

                document.querySelector(".edit-moneyGet-div").removeAttribute("hidden");

                document.querySelector(".edit-customer-modal").style.top = "30%"
                document.querySelector(".edit-customer-modal").style.height = "30vh"
                document.querySelector(".edit-form").style.top = "20%"
            } 
            else if(operationType === "Pul vermək" || operationType === "Rasxod" || operationType === "Maaş"){
                document.querySelector(".edit-weight-div").setAttribute("hidden", true);
                document.querySelector(".edit-deductedWeight-div").setAttribute("hidden", true);
                document.querySelector(".edit-deductedPercentage-div").setAttribute("hidden", true);
                document.querySelector(".edit-pricePerUnit-div").setAttribute("hidden", true);
                document.querySelector(".edit-moneyGet-div").setAttribute("hidden", true);

                document.querySelector(".edit-moneyGive-div").removeAttribute("hidden");

                document.querySelector(".edit-customer-modal").style.top = "30%"
                document.querySelector(".edit-customer-modal").style.height = "30vh"
                document.querySelector(".edit-form").style.top = "20%"
            }
        });

    });
    
    // Handle form submission for editing
    editOperationBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission

        const id = document.querySelector("input[name='id']").value;

        const updatedWeight = document.querySelector(".edit-weight").value;
        const updatedDeductedWeight = document.querySelector(".edit-deductedWeight").value;
        const updatedDeductedPercentage = document.querySelector(".edit-deductedPercentage").value;
        const updatedPricePerUnit = document.querySelector(".edit-pricePerUnit").value;
        const updatedMoneyGive = document.querySelector(".edit-moneyGive").value;
        const updatedMoneyGet = document.querySelector(".edit-moneyGet").value;
    

            fetch(`http://localhost:5000/api/Operation/UpdateOperation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: id, 
                    weight: updatedWeight,
                    deductedWeight: updatedDeductedWeight,
                    deductedPercentage: updatedDeductedPercentage,
                    pricePerUnit :updatedPricePerUnit,
                    moneyGive: updatedMoneyGive,
                    moneyGet: updatedMoneyGet
                })
            })
            .then(res => {
                if (!res.ok) {
                    console.log("Problem with update request");
                    return;
                }
                // Update the row in the table
                const row = document.querySelector(`.operation-row[data-id="${id}"]`);

                row.querySelector("td:nth-child(7)").textContent = updatedWeight;
                row.querySelector("td:nth-child(8)").textContent = updatedDeductedWeight;
                row.querySelector("td:nth-child(10)").textContent = updatedDeductedPercentage;
                row.querySelector("td:nth-child(12)").textContent = updatedPricePerUnit;
                // row.querySelector("td:nth-child(15)").textContent = updatedMoneyGive;
                row.querySelector("td:nth-child(16)").textContent = updatedMoneyGet
                
                // document.querySelector(".edit-moneyGive").setAttribute("hidden", true)
                // document.querySelector(".edit-moneyGet").setAttribute("hidden", true)
            })
            .catch(err => console.log(err));
        
            editOverlay.style.display = "none";
            editCustomerModal.style.display = "none";
            // }

            // else if(operationType === "")
    });

    editOverlay.addEventListener("click", ()=>{
        editOverlay.style.display = "none";
        editCustomerModal.style.display = "none";
    })
}  



// Customer Dropdown menu
const customerDropdown = document.querySelector(".customer-dropdown")
fetch("http://localhost:5000/api/Person/GetPersonsDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option style="color: red;" value="0">Sıfırla ✘</option>`
    posts.forEach(function (item) {
        // console.log(item.id);
        code += `
            
            <option value="0" selected disabled hidden>Müştəri</option>
            <option value="${item.id}"><a href="#">${item.name}</a></option>
             `
    })
    customerDropdown.innerHTML = code
})


// Product Dropdown Menu
const productDropdown = document.querySelector(".product-dropdown")
fetch("http://localhost:5000/api/Product/GetProductsDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option style="color: red;" value="0">Sıfırla ✘</option>`
    posts.forEach(function (item) {
        // console.log(item.id);
        code += `
            <option value="0" selected disabled hidden>Mal</option>
            <option value="${item.id}"><a href="#">${item.name}</a></option>
             `
    })
    productDropdown.innerHTML = code
})

// Executor Dropdown Menu
const executorDropdown = document.querySelector(".executor-dropdown")
fetch("http://localhost:5000/api/Employee/GetEmployeesDropdown")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = `<option style="color: red;" value="0">Sıfırla ✘</option>`
    posts.forEach(function (item) {
        code += `
            <option value="0" selected disabled hidden >İcraçı</option>
            <option value="${item.id}">${item.name}</option>
             `
    })
    executorDropdown.innerHTML = code
})









// Add change event listener once when the page loads
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
    console.log("product", selectedExecutor);
})


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}

// Select the date input element
const fromDateInput = document.querySelector("#fromDateInput");

// Add an event listener to detect changes in the date input
fromDateInput.addEventListener("change", (e) => {
    const selectedDate = formatDate(e.target.value)
    console.log("Selected date:", selectedDate);  // Log the selected date
});


// Select the date input element
const toDateInput = document.querySelector("#toDateInput");

// Add an event listener to detect changes in the date input
toDateInput.addEventListener("change", (e) => {
    const toSelectedDate = formatDate(e.target.value)
    console.log("Selected date:", toSelectedDate);  // Log the selected date
});


inputWeight.addEventListener("change", (e)=> {
    const selectedWeight = e.target.value
    console.log("weigth", selectedWeight);
})


inputPrice.addEventListener("change", (e)=> {
    const selectedPrice = e.target.value
    console.log("weigth", selectedPrice);
})


inputNetPrice.addEventListener("change", (e)=> {
    const selectedNetPrice = e.target.value
    console.log("weigth", selectedNetPrice);
})


// const prize = document.querySelector("#prize");

// prize.addEventListener("change", (e) => {
//     const isChecked = e.target.checked;  // Use .checked to get true/false
//     console.log("Prize selected:", isChecked);  // Logs true or false
// });







// Handle the save button click
document.querySelector(".save-btn").addEventListener('click', (e) => {
    e.preventDefault();  // Prevent form submission or default behavior

    const selectedValue = selectElement.value;  // Get the selected value from the select element
    console.log("Value on Save button click:", selectedValue);

    let OperationTypeId = selectedValue
    console.log( "ID" ,OperationTypeId);



    const selectedCustomer = customerDropdown.value
    console.log("selected",selectedCustomer);

    let PersonId = selectedCustomer
    console.log("Customer ID", PersonId);



    const selectedProduct = productDropdown.value
    console.log("Product Id", selectedProduct);

    let ProductId = selectedProduct
    console.log("selec prod", ProductId);



    const selectedExecutor = executorDropdown.value
    console.log("exec Id", selectedExecutor);

    let EmployeeId = selectedExecutor
    console.log("selec exec", EmployeeId);



    const selectedDate = fromDateInput.value
    console.log("date Id", selectedDate);

    let DateFrom = formatDate(selectedDate)
    console.log("date exec", DateFrom);



    const toSelectedDate = toDateInput.value
    console.log("date Id", toSelectedDate);

    let DateTo = formatDate(toSelectedDate)
    console.log("date exec", DateTo);



    const selectedWeight = inputWeight.value
    console.log("weight", selectedWeight);

    let Weight = selectedWeight
    console.log("selec weight", Weight);


    const selectedPrice = inputPrice.value
    console.log("inputPrice", selectedPrice);

    let Price = selectedPrice
    console.log("selec inputPrice", Price);


    
    const selectedNetPrice = inputNetPrice.value
    console.log("inputPrice", selectedNetPrice);

    let TotalPrice = selectedNetPrice
    console.log("selec inputPrice", TotalPrice);


    // const isPrizeChecked = prize.checked;  // Returns true if checked, false otherwise
    // console.log("Prize selected:", isPrizeChecked);  // Logs true or false


    let urlStr = "http://localhost:5000/api/Operation/GetFilter?"


    if(OperationTypeId != 0){
        urlStr += `OperationTypeId=${OperationTypeId}&`
    }

    if(PersonId != 0){
        urlStr += `PersonId=${PersonId}&`
    }

    if(ProductId != 0){
        urlStr += `ProductId=${ProductId}&`
    }

    if(EmployeeId != 0){
        urlStr += `EmployeeId=${EmployeeId}&`
    }

    // if(DateFrom != ""){
    //     urlStr += `DateFrom=${DateFrom}&`
    // }

    // if(DateTo != ""){
    //     urlStr += `DateTo=${DateTo}&`
    // }

    if(Weight != 0){
        urlStr += `Weight=${Weight}&`
    }

    if(Price != 0){
        urlStr += `Price=${Price}&`
    }

    if(TotalPrice != 0){
        urlStr += `TotalPrice=${TotalPrice}&`
    }

    if(DateFrom == "NaN.NaN.NaN"){
       urlStr = urlStr
    } else{
        urlStr += `DateFrom=${DateFrom}&`
    }
    
    if(DateTo == "NaN.NaN.NaN"){
        urlStr = urlStr
    } else{
         urlStr += `DateTo=${DateTo}&`
    }

    // urlStr += `IsGift=${isPrizeChecked}`

    console.log(urlStr);


    fetch(urlStr)
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
        let code = ""
        posts.forEach(function (item) {
            code += `
                  <tr class="operation-row" data-id="${item.id}">
                    <th scope="row" class="id-num">${item.id}</th>
                    <td class="operation-type">${item.operationTypeName}</td>
                    <td>${item.personName}</td>
                    <td>${item.productName}</td>
                    <td>${item.employeeName}</td>
                    <td>${formatDate(item.addedDate)}</td>
                    <td>${item.weight}</td>
                    <td>${item.deductedWeight}</td>
                    <td>${item.remainingWeight}</td>
                    <td>${item.deductedPercentage}</td>
                    <td>${item.netWeight}</td>
                    <td>${item.pricePerUnit}</td>
                    <td>${item.totalPrice}</td>
                    <td>${item.netPrice}</td>
                    <td>${item.moneyGive}</td>
                    <td>${item.moneyGet}</td>
                    <td><i class="fa-solid fa-pencil edit-icon"></i></td>
                    <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
                  </tr>  `
        })
        tbody.innerHTML = code
    
        attachDeleteEventListeners();
        attachEditEventListeners();
        })
        .catch(error => console.log(error));

});




// Generate to Excel

document.querySelector(".generate-excel").addEventListener("click", (e) => {
    e.preventDefault();

    // Collect data
    const selectedValue = selectElement.value;
    let OperationTypeId = selectedValue;

    const selectedCustomer = customerDropdown.value;
    let PersonId = selectedCustomer;

    const selectedProduct = productDropdown.value;
    let ProductId = selectedProduct;

    const selectedExecutor = executorDropdown.value;
    let EmployeeId = selectedExecutor;

    const selectedDate = fromDateInput.value;
    let DateFrom = formatDate(selectedDate);

    const toSelectedDate = toDateInput.value;
    let DateTo = formatDate(toSelectedDate);

    const selectedWeight = inputWeight.value;
    let Weight = selectedWeight;

    const selectedPrice = inputPrice.value;
    let Price = selectedPrice;

    const selectedNetPrice = inputNetPrice.value;
    let TotalPrice = selectedNetPrice;

    // const isPrizeChecked = prize.checked;

    // Build the query string for the URL
    let urlStr = "http://localhost:5000/api/Operation/GenerateExcel?";
    if (OperationTypeId != 0) urlStr += `OperationTypeId=${OperationTypeId}&`;
    if (PersonId != 0) urlStr += `PersonId=${PersonId}&`;
    if (ProductId != 0) urlStr += `ProductId=${ProductId}&`;
    if (EmployeeId != 0) urlStr += `EmployeeId=${EmployeeId}&`;
    if (Weight != 0) urlStr += `Weight=${Weight}&`;
    if (Price != 0) urlStr += `Price=${Price}&`;
    if (TotalPrice != 0) urlStr += `TotalPrice=${TotalPrice}&`;
    if (DateFrom !== "NaN.NaN.NaN") urlStr += `DateFrom=${DateFrom}&`;
    if (DateTo !== "NaN.NaN.NaN") urlStr += `DateTo=${DateTo}&`;
    // urlStr += `IsGift=${isPrizeChecked}`;

    console.log("Final URL:", urlStr);

    // Fetch the Excel file and download it
    fetch(urlStr)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.blob(); // Get the response as a blob (binary data)
        })
        .then(blob => {
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob); // Create a URL for the blob
            link.download = "operations_report.xlsx"; // The file name for download
            link.click(); // Trigger the download
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});

