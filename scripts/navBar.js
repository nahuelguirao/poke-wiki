const boton = document.getElementById('icono-menu')
const clasesPokemones = document.getElementById('navbar')

//Cambia la clase al tocar el boton desplegable del menu mobile
boton.addEventListener('click', function() {
    clasesPokemones.classList.toggle('mostrar')
})
