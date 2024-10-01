const navBtn = document.querySelector(".nav-btn")
const nav = document.querySelector("nav")
const navOverlay = document.querySelector(".nav-overlay")

// // const closeBtn = document.querySelector(".fa-x")

// closeBtn.addEventListener("mouseover", () =>{
//     nav.style.display = "none"
//     navOverlay.style.display = "none"
// })

navBtn.addEventListener("mouseover", ()=>{
    nav.style.display = "block"
    navOverlay.style.display = "block"
})


navOverlay.addEventListener("mouseover", () =>{
    nav.style.display = "none"
    navOverlay.style.display = "none"
})

const navItem = document.querySelectorAll(".nav-item")

navItem.forEach(item => {
    item.addEventListener("click", ()=>{

        navItem.forEach(item => item.classList.remove("active"))
        item.classList.add("active")
    })
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
            const cell = td[2];
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


const selectedMonth = localStorage.getItem("Month")
const selectedYear = localStorage.getItem("Year")
const selectedWorker = localStorage.getItem("Worker Id")


let moneyInfo = document.querySelector(".money-info")

let tbody = document.querySelector("tbody")

fetch(`http://localhost:5000/api/Salary/GetSalaryOperations?month=${selectedMonth}&year=${selectedYear}&workerId=${selectedWorker}`)
.then(response => response.json())
.then(posts => {
    console.log(posts.salary);
    let code = ""
    posts.operations.forEach(function (item) {
        code += `
            <tr class="first-row" onclick="addDate('${item.date}')">    
                <td scope="row">${formatDate(item.addedDate)}</td>
                <td>${item.employeeName}</td>
                <td>${item.workerName}</td>
                <td>${item.moneyGive}</td>
            </tr> `
    })
    tbody.innerHTML = code

    let infoCode = ""
    
    infoCode += `
        <h4 class="getedSalary" style="margin-left: 15px; margin-bottom: 5px;">Aldığı Maaş: ${posts.salary}</h4>
        <h4 class="legalSalary" style="margin-left: 15px; margin-bottom: 5px;">Qanuni Maaş: ${posts.money}</h4>
        <h4 class="debtMoney" style="margin-left: 15px; margin-bottom: 5px;">Bizə Borcu: ${posts.debtMoney}</h4> `

    moneyInfo.innerHTML = infoCode
})



// const tbody = document.querySelector("tbody")

// fetch("http://localhost:5000/api/Case/GetCase")
// .then(response => response.json())
// .then(posts => {
//     console.log(posts);
//     let code = ""
//     posts.forEach(function (item) {
//         console.log(typeof(item.date));
//         console.log(item.date);
//         code += `
//             <tr class="first-row" onclick="addDate('${item.date}')">    
//                 <td scope="row">${formatDate(item.date)}</td>
//                 <td>Həzi</td>
//                 <td>Cəfər</td>
//                 <td>Nizami</td>
//             </tr> `
//     })
//     tbody.innerHTML = code
// })