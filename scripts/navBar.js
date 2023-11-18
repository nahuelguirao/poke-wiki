const button = document.getElementById('menu-button')
const navbar = document.getElementById('navbar')

button.addEventListener('click', function() {
    navbar.classList.toggle('none')
})
