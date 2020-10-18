/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let body = undefined, html = undefined, height = 0, active = ""

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



createScrollToTopBtn = function () {
    const main = document.querySelector('main')
    const btn = document.createElement('button')
    btn.innerHTML = "TOP"
    btn.onclick = scrollToTop
    btn.id = "topBtn"
    btn.style.display = 'none'
    main.appendChild(btn)
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

document.addEventListener('DOMContentLoaded', event => {
    sections = document.querySelectorAll('section')

    buildMenu(sections)
    createScrollToTopBtn()

    body = document.body
    html = document.documentElement

    height = body.offsetHeight - html.clientHeight

    if (html.clientWidth < 300) {
        console.log('log ')
        document.querySelector('.navbar__menu').display = 'relative'
    }
})

// Add Scroll to TOP button. ** 

document.addEventListener('scroll', event => {
    if (event.path[1].scrollY >= height - 100) {
        console.log('vis')
        document.getElementById('topBtn').style.display = 'block'
    } else {
        console.log('in - vis')
        document.getElementById('topBtn').style.display = 'none'
    }
})

// Add class 'active' to section when near top of viewport

const addActiveClass = function (id) {

    if (active != '') {
        document.getElementById(active).classList.remove('your-active-class')
        document.getElementById(`${active}_li`).classList.remove('your-active-class')
    }

    document.getElementById(id).classList.add('your-active-class')
    document.getElementById(`${id}_li`).classList.add('your-active-class')

    active = id
}

// Scroll to anchor ID using scrollTO event

const scrollToTop = function (event) {
    event.preventDefault()
    let scrollOptions = {
        top: 0,
        behavior: "smooth"
    }
    window.scrollTo(scrollOptions)
    addActiveClass('')
}

// Build menu 

const buildMenu = function (sections) {
    const navList = document.getElementById('navbar__list')
    let fragment = document.createDocumentFragment();

    sections.forEach(child => {
        const newElement = document.createElement('li')
        newElement.innerHTML = `<a id="${child.id}_li" class="menu__link">`
            + `${child.dataset.nav}</a>`
        newElement.addEventListener('click', event => scrollToSection(event, child.id))
        fragment.appendChild(newElement)
    })

    navList.appendChild(fragment)
}

// Scroll to section on link click

const scrollToSection = function (event, sectionId) {
    event.preventDefault()
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Set sections as active

document.addEventListener('scroll', event => {
    let y = 0
    sections.forEach(child => {
        y = child.getBoundingClientRect().y
        if (-300 < y && y < 100) {
            addActiveClass(child.id)
        }
    })

    if (event.path[1].scrollY < html.clientHeight - ((html.clientHeight * 85) / 100)) {
        if (active != "") {
            document.getElementById(active).classList.remove('your-active-class')
            document.getElementById(`${active}_li`).classList.remove('your-active-class')
        }
    }
})

//Hide Nav-bar after 3 seconds
document.addEventListener('scroll', event => {
    document.getElementById('navbar__list').style.display = 'block'
    setTimeout(()=> hideNav , 3000)
})

//

const hideNav = function () {
    document.getElementById('navbar__list').style.display = 'none'
}