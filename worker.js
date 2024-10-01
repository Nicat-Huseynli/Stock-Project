// Navbar
const navBtn = document.querySelector(".nav-btn")
const nav = document.querySelector("nav")
const navOverlay = document.querySelector(".nav-overlay")
// import { getDetails } from "./all-operations"
navBtn.addEventListener("mouseover", ()=>{
    nav.style.display = "block"
    navOverlay.style.display = "block"
})


navOverlay.addEventListener("mouseover", () =>{
    nav.style.display = "none"
    navOverlay.style.display = "none"
})

// Modal window
const createworker = document.querySelector(".create-worker")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

createworker?.addEventListener("click", ()=>{
    overlay.style.display = "block"
    modal.style.display = "block"
})

overlay?.addEventListener("click", ()=>{
    overlay.style.display = "none"
    modal.style.display = "none"
})


// İnput Price
const enterExecutePrice = document.querySelector(".enter-salary")

enterExecutePrice.addEventListener("input", function(e) {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
    }
});

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

// Delete operation
const trashCan = document.querySelectorAll(".fa-trash-can");
const deleteOverlay = document.querySelector(".delete-overlay");
const deleteModal = document.querySelector(".delete-modal");
const answer = document.querySelectorAll(".answer")
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")
const workerRow = document.querySelectorAll(".worker-row") 

const editOverlay = document.querySelector(".edit-overlay");
const editworkerModal = document.querySelector(".edit-worker-modal");
const editIcons = document.querySelectorAll(".fa-pencil");
const editworkerBtn = document.querySelector(".edit-worker-btn");
const tbody = document.querySelector("tbody");



// function addId(id){
//     console.log(id);
//     localStorage.setItem("userid",id)  
// }

// Fetch and render data
fetch("http://localhost:5000/api/Worker/GetWorkers")
    .then(response => response.json())
    .then(posts => {
        let code = "";
        posts.forEach(item => {
            console.log(item.id);
            code += `
                <tr class="worker-row" data-id="${item.id}" onclick="addId(${item.id})">
                    <td>${item.name}</td>
                    <td>${item.salary}</td>
                    <td><i class="fa-solid fa-pencil edit-icon"></i></td>
                    <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
                </tr>`;
        });
        tbody.innerHTML = code;

        // Attach DELETE and EDIT event listeners after rows are rendered
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
            currentRow = trash.closest(".worker-row"); // Store the current row
            deleteOverlay.style.display = "block";
            deleteModal.style.display = "block";
        });
    });

    // Handle the "Yes" button click
    yes.addEventListener("click", () => {
        if (currentRow) {
            const rowId = currentRow.getAttribute("data-id");
            fetch(`http://localhost:5000/api/Worker/Delete/${rowId}`, {
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

        // Attach EDIT event listeners
        function attachEditEventListeners() {
            const editIcons = document.querySelectorAll(".edit-icon");

            editIcons.forEach(icon => {
                icon.addEventListener("click", () => {
                    const row = icon.closest(".worker-row");
                    const name = row.querySelector("td:nth-child(1)").textContent;
                    const salary = row.querySelector("td:nth-child(2)").textContent;
                    const id = row.getAttribute("data-id");

                    // Populate the edit form with current data
                    document.querySelector(".edit-worker-name").value = name;
                    document.querySelector(".edit-salary").value = salary;
                    document.querySelector("input[name='id']").value = id;

                    editOverlay.style.display = "block";
                    editworkerModal.style.display = "block";
                });
            });
            // Handle form submission for editing
            editworkerBtn.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent the default form submission
            
                const id = document.querySelector("input[name='id']").value;
                const updatedName = document.querySelector(".edit-worker-name").value;
                const updatedSalary = document.querySelector(".edit-salary").value
        
                fetch(`http://localhost:5000/api/Worker/Edit/${id}?name=${updatedName}&salary=${updatedSalary}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id, name: updatedName, salary: updatedSalary})
                })
                .then(res => {
                    if (!res.ok) {
                        console.log("Problem with update request");
                        return;
                    }
                    // Update the row in the table
                    const row = document.querySelector(`.worker-row[data-id="${id}"]`);
                    row.querySelector("td:nth-child(1)").textContent = updatedName;
                    row.querySelector("td:nth-child(2)").textContent = updatedSalary;
                })
                .catch(err => console.log(err));
            
                editOverlay.style.display = "none";
                editworkerModal.style.display = "none";
            });

            editOverlay.addEventListener("click", ()=>{
                editOverlay.style.display = "none";
                editworkerModal.style.display = "none";
            })
        }   


// POST APİ

const enterworkerName = document.querySelector(".enter-worker-name");
const enterSalary = document.querySelector(".enter-salary")

    document.querySelector(".add-worker-btn")?.addEventListener("click", (event) => {
    // event.preventDefault(); // Prevent the form from submitting the traditional way

    // Prepare the request body as a JSON object
    const requestBody = {
        name: enterworkerName.value, // Capture the value from the input field
        salary: enterSalary.value
    };

    fetch("http://localhost:5000/api/Worker/Add", {
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



// Attach event listeners to each customer name
// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");

//         if (personId) {
//             const redirectUrl = `operations.html?personId=${encodeURIComponent(personId)}`;
//             console.log("Redirecting to:", redirectUrl);
//             window.location.href = redirectUrl;
//         } else {
//             console.error("No personId found for the selected row");
//         }
//     });
// });


// file1.js


// // Attach event listeners to each customer name
// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");
//         console.log(personId);


//         // const event = new CustomEvent('personSelected', { detail: { personnId: personId } });
//         // window.dispatchEvent(event);

    

//         // localStorage.setItem("data-id", personId)
//         // window.location.href = "all-operations.js"

//         const requestBody = {
//             // name: enterCustomerName.value, // Capture the value from the input field
//             personId: personId,
//             // typeId: 
//         };
    
//         fetch("http://localhost:5000/api/Person/Navigate", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json' // Specify the content type as JSON
//             },
//             body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//         })
//         .then(res => {
//             if (!res.ok) {
//                 console.log("Problem"); 
//                 return;
//             }
//             return res.json(); // Parse the response as JSON
//         })
//         .then(data => {
//             console.log(data.id); // Log the response data
//         })
//         .catch(err => {
//             console.log(err); // Log any errors
//         });
// })
// });




// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");

//         // Set a cookie with the personId
//         document.cookie = `personId=${personId}; path=/`;

//         // Redirect to another HTML page
//         window.location.href = 'all-operations.html';
//     });
// });


// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");

//         // Store the personId in localStorage for use on the next page
//         localStorage.setItem('personId', personId);

//         // Redirect to all-operations.html
//         window.location.href = 'all-operations.html';
//     });
// });


// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         var personId = row.getAttribute("data-id");

//         // Store the personId in localStorage
//         // localStorage.setItem('personId', personId);

//         // Redirect to the operations page
//         // window.location.href = 'all-operations.html';
//     });
// });


// document.querySelectorAll(".customer-row").forEach(row => {
//         row.addEventListener("click", () => {
         
//             const personId = row.getAttribute("data-id");
    
//             const requestBody = {
//                 // name: enterCustomerName.value, // Capture the value from the input field
//                 personId: personId,
//                 // typeId: 
//             };
        
//             fetch("http://localhost:5000/api/Person/Navigate", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json' // Specify the content type as JSON
//                 },
//                 body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
//             })
//             .then(res => {
//                 if (!res.ok) {
//                     console.log("Problem"); 
//                     return;
//                 }
//                 return res.json(); // Parse the response as JSON
//             })
//             .then(operations => {
//                 console.log("Fetched operations:", operations);
    
//                 // Display the operations in the table
//                 let code = "";
//                 operations.forEach(function (item) {
//                     code += `
//                       <tr class="operation-row">
//                         <th scope="row" class="id-num">${item.operations.id}</th>
//                         <td>${item.operations.operationTypeName}</td>
//                         <td>${item.operations.personName}</td>
//                         <td>${item.operations.productName}</td>
//                         <td>${item.operations.employeeName}</td>
//                         <td>${item.operations.addedDate}</td>
//                         <td>${item.operations.weight}</td>
//                         <td>${item.operations.deductedWeight}</td>
//                         <td>${item.operations.remainingWeight}</td>
//                         <td>${item.operations.deductedPercentage}</td>
//                         <td>${item.operations.netWeight}</td>
//                         <td>${item.operations.pricePerUnit}</td>
//                         <td>${item.operations.totalPrice}</td>
//                         <td>${item.operations.netPrice}</td>
//                         <td>${item.operations.moneyGive}</td>
//                         <td>${item.operations.moneyGet}</td>
//                         <td><i class="fa-solid fa-pencil edit-icon"></i></td>
//                         <td><i class="fa-solid fa-trash-can delete-icon"></i></td>
//                       </tr>`;
//                 });
//                 document.querySelector("tbody").innerHTML = code;
//             })
//             .catch(err => {
//                 console.log(err); // Log any errors
//             });
//     })
//     });
    

// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");

//         // Create and dispatch a custom event with personId as detail
//         const event = new CustomEvent('personSelected', { detail: { personId } });
//         document.dispatchEvent(event);
//     });
// });



// export const exportedId = document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         const personId = row.getAttribute("data-id");
//     });
// });







// document.querySelectorAll(".customer-row").forEach(row => {
//     row.addEventListener("click", () => {
//         // Log the row element to ensure it has the expected attributes
//         console.log(row); 

//         const personId = row.getAttribute("data-id");
//         console.log("Person ID:", personId);

//         // Store the personId in localStorage
//         localStorage.setItem('personId', personId);
//         console.log("Stored Person ID:", localStorage.getItem('personId'));

//         // Redirect to all-operations.html
//         window.location.href = 'all-operations.html';
//     });
// });
    


// localStorage.setItem('testKey', 'testValue');
// console.log(localStorage.getItem('testKey'));
