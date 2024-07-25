let db_peliculas = [];

function carga_datos() {
    console.log("Fetching data...");
    fetch("/get")
        .then(response => response.json())
        .then(data => {
            db_peliculas = data;
            console.log("Data received:", db_peliculas);
            mostrar_datos();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function mostrar_datos() {
    console.log("Displaying data...");
    var divBody = document.getElementById("container");
    divBody.innerHTML = ''
    db_peliculas.forEach((e) => {
        let divcard = document.createElement('div');
        divcard.style.width = "18rem";
        divcard.style.padding = "2px";
        divcard.style.background = "white";
        divcard.style.borderColor = "black";
        divcard.style.borderStyle = "solid";
        divcard.className = "col";
        let caratula = document.createElement("img");
        caratula.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTs8O9rWjP0cWAxVHelhq4kBUUxkOTtzreA&s";
        caratula.style.width = "250px";
        divcard.appendChild(caratula);
        let cardbody = document.createElement("div");
        let cardTitulo = document.createElement("h5");
        cardTitulo.innerText = "Nombre: "+ e.nombre;
        cardbody.appendChild(cardTitulo);
        let genero = document.createElement("p");
        genero.innerText ="Genero: "+ e.genero;
        cardbody.appendChild(genero);
        let masdetalles = document.createElement("a");
        masdetalles.innerText = "ver";
        masdetalles.type = "button";
        masdetalles.className = "btn-primary";
        masdetalles.style.fontSize = "25px"
        masdetalles.style.color = "black"
        masdetalles.style.backgroundColor = "#008CBA";
        masdetalles.style.borderRadius = "4px";
        cardbody.appendChild(masdetalles);
        divcard.appendChild(cardbody);
        divBody.appendChild(divcard);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    carga_datos();
});