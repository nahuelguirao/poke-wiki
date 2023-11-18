const button = document.getElementById('menu-button')
const navbar = document.getElementById('navbar')

button.addEventListener('click', function() {
    navbar.classList.toggle('none')
})

const options = document.querySelectorAll('.button')
//Delete the navbar when click on a class
options.forEach(op => op.addEventListener('click', function() {
    navbar.classList.add('none')
}))