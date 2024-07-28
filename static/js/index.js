let db_peliculas = [];

function carga_datos() {
    fetch("/get")
        .then(response => response.json())
        .then(data => {
            db_peliculas = data;
            console.log("Data received:", db_peliculas);
            mostrar_datos();
        })
        .catch(error => console.error('Error data:', error));
}

function mostrar_datos() {
    var divBody = document.getElementById("containerCard");
    divBody.innerHTML = ''
    db_peliculas.forEach((e) => {
        let div2 = document.createElement("div");
        div2.className = "col-12 col-lg-4 mb-4";
        let divcard = document.createElement('div');
        divcard.className = "card";
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
        div2.appendChild(divcard)
        divBody.appendChild(div2);
    });
    
}

document.addEventListener('DOMContentLoaded', (event) => {
    carga_datos();
});