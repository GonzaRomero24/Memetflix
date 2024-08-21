//Esta funcion asincrona que se utiliza para obtener de la API la cual esta conectada a la base de datos en Json
// Todas los tipo de Peliculas que se encuentren guardadas en ella
async function cargarPeliculas(){
    try{
        //Se Realiza una peticion GET a la API para obtener los datos que contengan
        //Como tipo Peliculas
        const respuesta = await fetch("/pelicula/get_Peliculas");
        //La respuesta proveniente de la API se transforma en un json
        const datosPeliculas = respuesta.json();
        //Retornamos el Json
        return datosPeliculas
    }catch(error){
        // En caso de existir un error nos mostraria por consola de la pagina web la razón del error
        console.log(error)
    }
}


//Esta funcion se utiliza para obtener las peliculas guardadas en la base de datos
//a traves de la API , en la cual le enviaremos el genero que queremos buscar
async function ObtenerFiltrado(generosSeleccionados) {
    try{
        // Se realiza una peticion POST a la API para enviar el genero que se desea filtrar todas 
        // las peliculas
        const respuesta  = await fetch("/pelicula/get_Filtrado_Pelicula",{
            // Se configura el metodo HTTP de tipo POST
            method : "POST",
            // Especifica el contenido de la peticion 
            headers: {
                'Content-Type': 'application/json'
            },
            //Envia los Generos Seleccionados como el cuerpo de la peticion y se convierten en formato JSON
            body: JSON.stringify({ generos: generosSeleccionados })
        });
        //Verifica si la respuesta por la API fue exitosa
        if(respuesta.ok){
            //se convierte la respuesta por parte de la API en formato JSON
            const datosFiltrado = await respuesta.json();
            // Luego se envia a la funcion para poder mostrar las peliculas de los generos que fueron seleccionados
            mostrar_filtros(datosFiltrado);
        }
    }catch(error){
         // En caso de existir un error nos mostraria por consola de la pagina web la razón del error
        console.error('Error al filtrar películas:', error);
    }
    
}

// Funcion para poder visualizar las peliculas
function mostrar_filtros(datosmovie){
    //Obtenemos el div en donde mostraremos las peliculas
    var div_container = document.getElementById("container-Peliculas");
    //Limpiamos el contenido del div
    div_container.innerHTML = ""
    // Recorremos el array datosmovie  
    datosmovie.forEach(pelicula=> {
        // Creamos un elemento div para cada pelicula en el array
        const div = document.createElement("div")
        // Establecemos una clase para aplicar estilos de Boostrap
        div.className = "col-6 col-md-4 col-xl-3";

        // Creamos un elemento div para la Card de cada una de las peliculas
        const divcard = document.createElement('div');
        // Establecemos una clase para aplicar los estilos de Boostrap
        divcard.className = "card align-items-center justify-content-center";
        
        // Creamos el elemento para la Caratula de la pelicula
        const caratula = document.createElement("img");
        // Asignamos el Link de la pelicula
        caratula.src = pelicula.linkCaratula;
        // Asignamos la medida que tendra la caratula de la pelicula
        caratula.style.width = "120px";
        //Añadimos la imagen a la card
        divcard.appendChild(caratula)
        
        const card_body_peliculas = document.createElement("div");
        const titulo_peliculas = document.createElement("h5");
        titulo_peliculas.innerText = pelicula.nombre;
        card_body_peliculas.appendChild(titulo_peliculas);

        const btn_ver = document.createElement("button");
        btn_ver.className = "btn btn-primary";
        btn_ver.innerText = "ver";
        btn_ver.value = pelicula.nombre;
        card_body_peliculas.appendChild(btn_ver);

        divcard.appendChild(card_body_peliculas)
        div.appendChild(divcard);
        div_container.appendChild(div);
    });
}
async function aplicarFiltros(){
        const generosSeleccionados = Array.from(document.querySelectorAll(".form-check-input:checked"))
                                            .map(checkbox => checkbox.value);
        console.log(generosSeleccionados);
        if(generosSeleccionados.length > 0){
            ObtenerFiltrado(generosSeleccionados);
        }else{
            const datos_movie = await cargarPeliculas();
            mostrar_filtros(datos_movie)
        }
        
}

function renderizarPelicula(nombre_pelicula){
    const serieSeleccionada = nombre_pelicula.target.value;
    console.log(serieSeleccionada);
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const datos_movie = await cargarPeliculas();
    mostrar_filtros(datos_movie)
    const btn_filtro = document.getElementById("btn_filtro");
    btn_filtro.addEventListener("click",aplicarFiltros);
    const btnver = document.getElementsByClassName("btn");
    for (let i = 0; i < btnver.length; i++) {
        btnver[i].addEventListener("click", function(e){
            renderizarPelicula(e);
        });
    }
});