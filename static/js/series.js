async function cargarSeries() {
    try{
        const respuesta = await fetch("/series/get_Series_all");
        const datos_Series = respuesta.json();
        return datos_Series
    }catch(error){
        console.log(error)
    }
}

async function ObtenerFiltrado(generosSeleccionados) {
    try{
        // Se realiza una peticion POST a la API para enviar el genero que se desea filtrar todas 
        // las peliculas
        const respuesta  = await fetch("/series/get_filtrado_serie",{
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
            cargarCaratulas(datosFiltrado);
        }
    }catch(error){
         // En caso de existir un error nos mostraria por consola de la pagina web la razón del error
        console.error('Error al filtrar películas:', error);
    }
}

function cargarCaratulas(dataseries){
    var divcontainer = document.getElementById("container-Series");
    divcontainer.innerHTML = ""
    let i = 1;
    dataseries.forEach(serie => {
        const div = document.createElement("div");
        div.className = "col-6 col-md-4 col-xl-3";
        
        const divcard = document.createElement("div");
        divcard.className = "card align-items-center justify-content-center";
        
        const caratula_serie = document.createElement("img");
        caratula_serie.src = serie.linkCaratula;
        caratula_serie.style.width = "120px";
        divcard.appendChild(caratula_serie);

        const card_body_series = document.createElement("div");
        const titulo_serie = document.createElement("h5");
        titulo_serie.innerText = serie.nombre;
        card_body_series.appendChild(titulo_serie);

        const btn_ver = document.createElement("button");
        btn_ver.className = "btn btn-primary";
        btn_ver.id = "btn-ver"+i
        btn_ver.innerText = "ver";
        btn_ver.value = serie.nombre;
        card_body_series.appendChild(btn_ver);
        
        divcard.appendChild(card_body_series);
        div.appendChild(divcard);
        divcontainer.appendChild(div);
        i = i+1;
    });
}

async function ObtenerDatosWiki(nombreSerie) {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nombreSerie)}`;
    try{
        const respuesta = await fetch(url);
        if (respuesta.ok){
            const data = await respuesta.json();
            console.log(data);
        }else{
            console.log("error",respuesta.status);
        }
    }catch(error){
        console.log(error);
    }
}

async function aplicarFiltros(){
    const generosSeleccionados = Array.from(document.querySelectorAll(".form-check-input:checked"))
                                        .map(checkbox => checkbox.value);
    console.log(generosSeleccionados);
    if(generosSeleccionados.length > 0){
        ObtenerFiltrado(generosSeleccionados);
    }else{
        const datos_serie = await cargarSeries();
        cargarCaratulas(datos_serie)
    }
    
}

function renderizarSerie(nombre_serie){
    const nombreserie = nombre_serie.target.value;
    const serieSeleccionada = nombreserie.replace(/ /g,"_")
    localStorage.setItem("serie_seleccionada",serieSeleccionada);
    window.location.href = "/series/"+serieSeleccionada
}

document.addEventListener('DOMContentLoaded', async (event) =>{
    const data_series = await cargarSeries();
    cargarCaratulas(data_series);

    const btn_filtro = document.getElementById("btn_filtro");
    btn_filtro.addEventListener("click",aplicarFiltros);

    const btnver = document.querySelectorAll("[id^='btn-ver'")
    console.log(btnver);
    for (let i = 0; i < btnver.length; i++) {
        btnver[i].addEventListener("click", function(e){
            renderizarSerie(e);
        });
    }
});

