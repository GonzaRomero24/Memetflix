
async function cargarPeliculas(){
    try{
        const respuesta = await fetch("/get_Peliculas_all");
        const datosPeliculas = respuesta.json();
        return datosPeliculas
    }catch(error){
        console.log(error)
    }
}

async function ObtenerFiltrado(generosSeleccionados) {
    try{
        const respuesta  = await fetch("/get_Filtrado",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ generos: generosSeleccionados })
        });
        if(respuesta.ok){
            const datosFiltrado = await respuesta.json();
            console.log(datosFiltrado)
            mostrar_filtros(datosFiltrado);
        }
    }catch(error){
        console.error('Error al filtrar películas:', error);
    }
    
}

function mostrar_filtros(datosmovie){
    var div_container = document.getElementById("container-Peliculas");
    div_container.innerHTML = ""
    datosmovie.forEach(e=> {
        const div = document.createElement("div")
        div.className = "col-6 col-md-4 col-xl-3";
        const divcard = document.createElement('div');
        divcard.className = "card align-items-center justify-content-center";
        const caratula = document.createElement("img");
        caratula.src = e.linkCaratula;
        caratula.style.width = "120px";
        divcard.appendChild(caratula)
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