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

// Search bar
function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('dataTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) { // Start from i=1 to skip the header row
        const row = tr[i];
        let isMatch = false;

        const td = row.getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            const cell = td[j];
            if (cell.textContent.toLowerCase().startsWith(searchInput)) {
                isMatch = true;
                break; // If one cell matches, no need to check others in the same row
            }
        }

        if (isMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}


// Modal window
const addProduct = document.querySelector(".add-product")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

addProduct.addEventListener("click", ()=>{
    overlay.style.display = "block"
    modal.style.display = "block"
})

overlay.addEventListener("click", ()=>{
    overlay.style.display = "none"
    modal.style.display = "none"
})


// İnput Price
const enterExecutePrice = document.querySelector(".enter-execute-price")

enterExecutePrice.addEventListener("input", function(e) {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
    }
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Delete operation
const trashCan = document.querySelectorAll(".fa-trash-can");
const deleteOverlay = document.querySelector(".delete-overlay");
const deleteModal = document.querySelector(".delete-modal");
const answer = document.querySelectorAll(".answer")
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")
const productRow = document.querySelectorAll(".product-row") 


function addId(id){
    console.log(id);
    localStorage.setItem("productId",id)  
}

// GET Method
const tbody = document.querySelector("tbody")

fetch("http://localhost:5000/api/Product/GetProducts")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        code += `
               <tr class = "product-row" data-id="${item.id}" onclick="addId(${item.id})">
                <td class="prod-name" ><a href="product.html">${item.name}</a></td>
                <td>${item.netWeight}</td>
                <td><i class="fa-solid fa-pencil edit-icon"></i></td>
                <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
              </tr>`
    })
    tbody.innerHTML = code

        // Attach DELETE event listeners after rows are rendered
        attachDeleteEventListeners();
        attachEditEventListeners()
})


// Delete
function attachDeleteEventListeners() {
    const trashCan = document.querySelectorAll(".fa-trash-can");
    let currentRow; // Variable to keep track of the current row

    trashCan.forEach(trash => {
        trash.addEventListener("click", () => {
            currentRow = trash.closest(".product-row"); // Store the current row
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    // Handle the "Yes" button click
    yes.addEventListener("click", () => {
        if (currentRow) {
            const rowId = currentRow.getAttribute("data-id");
            fetch(`http://localhost:5000/api/Product/Delete?id=${rowId}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    console.log("Problem with delete request");
                    return;
                }
                currentRow.remove(); // Remove the current row from the table
            })
            .catch(err => console.log(err));

            deleteOverlay.style.display = "none";
            deleteModal.style.display = "none";
        }
    });

    no.addEventListener("click", () => {
        deleteOverlay.style.display = "none";
        deleteModal.style.display = "none";
    });
}


//  POST
const enterExecuteName = document.querySelector(".enter-execute-name");
// const enterExecutePrice = document.querySelector(".enter-execute-price")

document.querySelector(".add-product-btn").addEventListener("click", (event) => {
    // event.preventDefault(); // Prevent the form from submitting the traditional way

    // Prepare the request body as a JSON object
    const requestBody = {
        name: enterExecuteName.value, // Capture the value from the input field
        netWeight: enterExecutePrice.value
    };

    fetch("http://localhost:5000/api/Product/Add", {
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
});


// Edit

const enterProductName = document.querySelector(".enter-product-name");
const enterWeight = document.querySelector(".enter-weight");
const editOverlay = document.querySelector(".edit-overlay");
const editWarehouseModal = document.querySelector(".edit-warehouse-modal");
const editWarehouseBtn = document.querySelector(".edit-warehouse-btn");

function attachEditEventListeners() {
    const editIcons = document.querySelectorAll(".edit-icon");

    editIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const row = icon.closest(".product-row");
            const name = row.querySelector(".prod-name a").textContent;
            const weight = row.querySelector("td:nth-child(2)").textContent;
            const id = row.getAttribute("data-id");

            enterWeight.addEventListener("input", function(e) {
                const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
                if (!regex.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
                }
            }); 

            // Populate the edit form with current data
            enterProductName.value = name;
            enterWeight.value = weight;
            document.querySelector("input[name='id']").value = id;

            // Show the modal
            editOverlay.style.display = "block";
            editWarehouseModal.style.display = "block";
        });
    });

    editOverlay.addEventListener("click", () => {
        editOverlay.style.display = "none";
        editWarehouseModal.style.display = "none";
    });
    editWarehouseBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const id = document.querySelector("input[name='id']").value;
        const updatedName = enterProductName.value;
        const updatedWeight = enterWeight.value;
    
        fetch(`http://localhost:5000/api/Product/Edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, name: updatedName, netWeight: updatedWeight }),
        })
        .then(res => {
            if (!res.ok) {
                console.log("Problem with update request");
                return;
            }
            console.log("Update request successful");
    
            // Update the row in the table
            const row = document.querySelector(`.product-row[data-id="${id}"]`);
            row.querySelector(".prod-name a").textContent = updatedName;
            row.querySelector("td:nth-child(2)").textContent = updatedWeight;
    
            // Hide the modal
            editOverlay.style.display = "none";
            editWarehouseModal.style.display = "none";

            
        })
        .catch(err => console.log(err));
    });
    

}    

















// Attach event listeners to edit icons
// function attachEditEventListeners() {
//     const editIcons = document.querySelectorAll(".edit-icon");
//     let currentRow = null; // Store the row being edited

//     editIcons.forEach(icon => {
//         icon.addEventListener("click", () => {
//             const row = icon.closest(".product-row");
//             currentRow = row; // Store the current row for later use
//             const name = row.querySelector(".prod-name a").textContent;
//             const weight = row.querySelector("td:nth-child(2)").textContent;
//             const id = row.getAttribute("data-id");

//             // Populate the edit form with current data
//             enterProductName.value = name;
//             enterWeight.value = weight;
//             document.querySelector("input[name='id']").value = id;

//             editOverlay.style.display = "block";
//             editWarehouseModal.style.display = "block";
//         });
//     });

// }
// // Hide the modal when clicking the overlay
// editOverlay.addEventListener("click", () => {
//     editOverlay.style.display = "none";
//     editWarehouseModal.style.display = "none";
// });

// // Handle form submission for editing (PUT Method)
// editWarehouseBtn.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default form submission

//     const id = document.querySelector("input[name='id']").value;
//     const updatedName = enterProductName.value;
//     const updatedWeight = enterWeight.value;

//     fetch(`http://localhost:5000/api/Product/Edit/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, name: updatedName, netWeight: updatedWeight }),
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with update request");
//             return;
//         }
//         console.log("Update request successful");

//         // Update the row in the table
//         if (currentRow) {
//             currentRow.querySelector(".prod-name a").textContent = updatedName;
//             currentRow.querySelector("td:nth-child(2)").textContent = updatedWeight;
//         }

//         // Close the modal
//         editOverlay.style.display = "none";
//         editWarehouseModal.style.display = "none";
//     })
//     .catch(err => console.log(err));
// });

// // // Call the function to attach event listeners to edit icons
// // attachEditEventListeners();










// Attach EDIT event listeners

// const enterProductName = document.querySelector(".enter-product-name") 
// const enterWeight = document.querySelector(".enter-weight")
// const editOverlay = document.querySelector(".edit-overlay")
// const editWarehouseModal = document.querySelector(".edit-warehouse-modal")
// const editWarehouseBtn = document.querySelector(".edit-warehouse-btn")
// const editIcon = document.querySelector(".edit-icon")

// function attachEditEventListeners() {
//     const editIcons = document.querySelectorAll(".edit-icon");

//     editIcons.forEach(icon => {
//         icon.addEventListener("click", () => {
//             const row = icon.closest(".product-row");
//             const name = row.querySelector(".prod-name a").textContent;
//             const weight = row.querySelector("td:nth-child(2)").textContent;
//             const id = row.getAttribute("data-id");

//             // Populate the edit form with current data
//             enterProductName.value = name;
//             enterWeight.value = weight;
//             document.querySelector("input[name='id']").value = id;

//             editOverlay.style.display = "block";
//             editWarehouseModal.style.display = "block";
//         });
//     });

//     editOverlay.addEventListener("click", () => {
//         editOverlay.style.display = "none";
//         editWarehouseModal.style.display = "none";
//     });
    
// }
// // Handle form submission for editing (PUT Method)
//     editWarehouseBtn.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     const id = document.querySelector("input[name='id']").value;
//     const updatedName = enterProductName.value;
//     const updatedWeight = enterWeight.value;

//     fetch(`http://localhost:5000/api/Product/Edit/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, name: updatedName, netWeight: updatedWeight }),
//     })
//     .then(res => {
//         if (!res.ok) {
//             console.log("Problem with update request");
//             return;
//         }
//         console.log("Update request successful");

//         // Update the row in the table
//         row.querySelector(".prod-name a").textContent = updatedName;
//         row.querySelector("td:nth-child(2)").textContent = updatedWeight;
        
//         editOverlay.style.display = "none";
//         editWarehouseModal.style.display = "none";
//     })
//     .catch(err => console.log(err));
// });

