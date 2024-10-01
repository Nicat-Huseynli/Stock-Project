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


// function addDate(date){
//     const monthRank = localStorage.getItem("month rank")  
//     console.log(monthRank);
// }


const monthRank = localStorage.getItem("month rank") 
const year = localStorage.getItem("year") 


const tbody = document.querySelector("tbody")

fetch(`http://localhost:5000/api/Rasxod/GetRasxodOperations?month=${monthRank}&year=${year}`)
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.operations.forEach(function (item) {
        console.log(typeof(item.date));
        console.log(item.date);
        code += `
            <tr class="first-row">    
                <td scope="row">${formatDate(item.addedDate)}</td>
                <td>${item.employeeName}</td>
                <td>${item.addInfo}</td>
                <td>${item.moneyGive}</td>
            </tr> `
    })
    tbody.innerHTML = code

    document.querySelector(".monthly-consumption").innerHTML = `Ay Başından Olan Rasxod:  ${posts.money}`
})
