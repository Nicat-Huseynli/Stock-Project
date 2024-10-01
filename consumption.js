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


// function formatDate(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         // day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) 
//         month = '0' + month;
//     if (day.length < 2) 
//         day = '0' + day;

//     return [ month, year].join('.');
// }


function addDate(month){
    localStorage.setItem("month rank",month)  
    console.log(month);
}

function addYear(year){
    localStorage.setItem("year",year)  
    console.log(year);
}

const tbody = document.querySelector("tbody")

fetch("http://localhost:5000/api/Rasxod/GetMonthlyRasxodList")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        // console.log(typeof(item.date));
        // console.log(item.date);
        console.log(item);
        console.log(item.monthRank.toString());
        code += `
            <tr class="first-row" onclick="addDate('${item.monthRank}'); addYear('${item.year}')">    
                <td scope="row"><a href="daily-consumption.html">${item.monthRank.toString().padStart(2, '0')}.${item.year}</a></td>  
                <td>${item.typeName}</td>
                <td>${item.moneyGive}</td>
            </tr> `
    })
    tbody.innerHTML = code
})
