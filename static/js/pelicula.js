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

function mostrar_filtros(datosmovie){
    var div_container = document.getElementById("container-Peliculas");
    div_container.innerHTML = ""
    datosmovie.forEach(pelicula=> {
        const div = document.createElement("div")
        div.className = "col-6 col-md-4 col-xl-3";

        const divcard = document.createElement('div');
        divcard.className = "card align-items-center justify-content-center";
        
        const caratula = document.createElement("img");
        caratula.src = pelicula.linkCaratula;
        caratula.style.width = "120px";
        divcard.appendChild(caratula)
        
        const card_body_peliculas = document.createElement("div");
        const titulo_peliculas = document.createElement("h5");
        titulo_peliculas.innerText = pelicula.nombre;
        card_body_peliculas.appendChild(titulo_peliculas);
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

document.addEventListener('DOMContentLoaded', async (event) => {
    const datos_movie = await cargarPeliculas();
    mostrar_filtros(datos_movie)
    const btn_filtro = document.getElementById("btn_filtro");
    btn_filtro.addEventListener("click",aplicarFiltros);
});