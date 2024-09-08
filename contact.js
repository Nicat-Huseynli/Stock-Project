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

