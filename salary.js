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
            const cell = td[1];
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

// Input only number
document.querySelector(".inputYear")?.addEventListener("input", function(e) {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and commas
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any character that is not a number or a comma
    }
});



function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        // day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    // if (day.length < 2) 
    //     day = '0' + day;

    return [ month, year].join('.');
}


// function monthWithNum(month) {
//     let monthName = month.slice(0, month.indexOf(" "));
//     let newMonth;
//     switch (monthName) {
//         case "Yanvar":
//             newMonth = month.replace("Yanvar", "01");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Fevral":
//             newMonth = month.replace("Fevral", "02");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Mart":
//             newMonth = month.replace("Mart", "03");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Aprel":
//             newMonth = month.replace("Aprel", "04");
//             return newMonth.replace(" ", ".")
//             break;
//         case "May":
//             newMonth = month.replace("May", "05");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Iyun":
//             newMonth = month.replace("Iyun", "06");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Iyul":
//             newMonth = month.replace("Iyul", "07");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Avqust":
//             newMonth = month.replace("Avqust", "08");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Sentyabr":
//             newMonth = month.replace("Sentyabr", "09");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Oktyabr":
//             newMonth = month.replace("Oktyabr", "10");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Noyabr":
//             newMonth = month.replace("Noyabr", "11");
//             return newMonth.replace(" ", ".")
//             break;
//         case "Dekabr":
//             newMonth = month.replace("Dekabr", "12");
//             return newMonth.replace(" ", ".")
//             break;
//         default:
//             newMonth = month; // If no match, return the original month string
//             break;
//     }
// }

function addMonth(month){
    localStorage.setItem("Month", month)
    // localStorage.setItem("Year", monthWithNum(month).slice(monthWithNum(month).indexOf(".")+1))
}

function addYear(year){
    localStorage.setItem("Year", year)
}

function addWokerId(id){
    localStorage.setItem("Worker Id", id)
}



const tbody = document.querySelector("tbody")

fetch("http://localhost:5000/api/Salary/GetWorkerDetails")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        // console.log(typeof(item.date));
        // console.log(item.date);
        console.log(item);
        code += `
            <tr class="first-row" onclick="addMonth('${item.month}'); addYear('${item.year}'); addWokerId('${item.id}')">    
                <td scope="row"><a href="daily-salary.html">${item.month}.${item.year}</a></td>
                <td>${item.workerName}</td>
                <td>${item.money}</td>
                <td>${item.salary}</td>
                <td>${item.debtMoney}</td>
            </tr> `
    })
    tbody.innerHTML = code
})


document.querySelector(".save-btn").addEventListener("click", (e) => {

    e.preventDefault();


    const selectedMonth = document.querySelector(".inputMonth").value
    const selectedYear = document.querySelector(".inputYear").value

    let urlStr = "http://localhost:5000/api/Salary/GetWorkerDetails?"

    if(selectedMonth != 0){
        urlStr += `month=${selectedMonth}&`
    }
    if(selectedYear != 0){
        urlStr +=`year=${selectedYear}`
    }

    console.log(urlStr);

    fetch(urlStr)
    .then(response => response.json())
    .then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        // console.log(typeof(item.date));
        // console.log(item.date);
        console.log(item);
        code += `
            <tr class="first-row" onclick="addDate('${item.month}'); addWokerId('${item.id}')">    
               <td scope="row"><a href="daily-salary.html">${item.month}.${item.year}</a></td>
                <td>${item.workerName}</td>
                <td>${item.money}</td>
                <td>${item.salary}</td>
                <td>${item.debtMoney}</td>
            </tr> `
    })
    tbody.innerHTML = code
})

})