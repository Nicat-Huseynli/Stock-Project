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


function addDate(date){
    localStorage.setItem("date",date)  
    console.log(date);
}


const tbody = document.querySelector("tbody")

fetch("http://localhost:5000/api/Case/GetCase")
.then(response => response.json())
.then(posts => {
    console.log(posts);
    let code = ""
    posts.forEach(function (item) {
        console.log(typeof(item.date));
        console.log(item.date);
        code += `
            <tr class="first-row" onclick="addDate('${item.date}')">    
                <td scope="row"><a href="choosen-day.html">${formatDate(item.date)}</a></td>
                <td>${item.receivedMoney}</td>
                <td>${item.givenMoney}</td>
                <td>${item.caseAmount}</td>
            </tr> `
    })
    tbody.innerHTML = code
})
