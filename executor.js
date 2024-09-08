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

// Modal window
const add = document.querySelector(".add")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

add.addEventListener("click", function(){
    overlay.style.display = "block"
    modal.style.display = "block"
})

overlay.addEventListener("click", ()=>{
    overlay.style.display = "none"
    modal.style.display = "none"
})

// Price input
// const enterExecutePrice = document.querySelector(".enter-execute-price")

// enterExecutePrice.addEventListener("input", function(e) {
//     const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
//     if (!regex.test(e.target.value)) {
//         e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
//     }
// });

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




// Fetch and display the employees in the table
// GET Method
const tbody = document.querySelector("tbody");

fetch("http://localhost:5000/api/Employee/GetEmployees")
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
        let code = "";
        posts.employees.forEach(function (item) {
            code += `
                <tr class="executor-row"  data-id="${item.id}">
                    <td>${item.name}</td>
                    <td>${item.caseAmount}</td>
                    <td><i class="fa-solid fa-pencil edit-icon"></i></td>
                    <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
                </tr>`;
        });
        tbody.innerHTML = code;

        // Attach event listeners to the dynamically created edit and delete icons
        attachEditEventListeners();
        attachDeleteEventListeners();
    });

// Fetch and display the total checkout amount
const totalCheckoutAmount = document.querySelector(".total-checkout-amount");

fetch("http://localhost:5000/api/Employee/GetEmployees")
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
        totalCheckoutAmount.innerHTML = `Ümumi Kassa Məbləği: ${posts.totalCaseAmount}`;
    });


// // POST Method

// const enterExecuteName = document.querySelector(".enter-execute-name");

// document.querySelector(".add-executor-btn").addEventListener("click", (event) => {
//     // event.preventDefault(); // Prevent the form from submitting the traditional way

//     // Prepare the request body as a JSON object
//     const requestBody = {
//         name: enterExecuteName.value // Capture the value from the input field
//     };

//     fetch("http://localhost:5000/api/Employee/Add", {
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




// DELETE APİ
const trashCan = document.querySelectorAll(".fa-trash-can");
const deleteOverlay = document.querySelector(".delete-overlay");
const deleteModal = document.querySelector(".delete-modal");
const answer = document.querySelectorAll(".answer")
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")


function attachDeleteEventListeners() {
    const trashCan = document.querySelectorAll(".fa-trash-can");
    let currentRow; // Variable to keep track of the current row

    trashCan.forEach(trash => {
        trash.addEventListener("click", () => {
            currentRow = trash.closest(".executor-row"); // Store the current row
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    // Handle the "Yes" button click
    yes.addEventListener("click", () => {
        if (currentRow) {
            const rowId = currentRow.getAttribute("data-id");
            fetch(`http://localhost:5000/api/Employee/Delete?id=${rowId}`, {
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


// Edit

// const enterProductName = document.querySelector(".enter-product-name");
// const enterWeight = document.querySelector(".enter-weight");
const editOverlay = document.querySelector(".edit-overlay");
const editExecutorModal = document.querySelector(".edit-executor-modal");
const editExecutorBtn = document.querySelector(".edit-executor-btn");
const editExecuteName = document.querySelector(".edit-execute-name")

function attachEditEventListeners() {
    const editIcons = document.querySelectorAll(".edit-icon");

    editIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const row = icon.closest(".executor-row");
            const name = row.querySelector("td:nth-child(1)").textContent;
            const id = row.getAttribute("data-id");

            // Populate the edit form with current data
            editExecuteName.value = name;
            document.querySelector("input[name='id']").value = id;

            // Show the modal
            editOverlay.style.display = "block";
            editExecutorModal.style.display = "block";
        });
    });

    editOverlay.addEventListener("click", () => {
        editOverlay.style.display = "none";
        editExecutorModal.style.display = "none";
    });

    editExecutorBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const id = document.querySelector("input[name='id']").value;
        const updatedName = editExecuteName.value;
    
        fetch(`http://localhost:5000/api/Employee/Edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, name: updatedName }),
        })
        .then(res => {
            if (!res.ok) {
                console.log("Problem with update request");
                return;
            }
            console.log("Update request successful");
    
            // Update the row in the table
            const row = document.querySelector(`.executor-row[data-id="${id}"]`);
            row.querySelector("td:nth-child(1)").textContent = updatedName;
    
            // Hide the modal
            editOverlay.style.display = "none";
            editExecutorModal.style.display = "none";
        })
        .catch(err => console.log(err));
    });
    

}


//  POST
const enterExecuteName = document.querySelector(".enter-execute-name");
// const enterExecutePrice = document.querySelector(".enter-execute-price")

document.querySelector(".add-executor-btn").addEventListener("click", (event) => {
    // event.preventDefault(); // Prevent the form from submitting the traditional way

    // Prepare the request body as a JSON object
    const requestBody =  enterExecuteName.value // Capture the value from the input field
    

    fetch("http://localhost:5000/api/Employee/Add", {
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