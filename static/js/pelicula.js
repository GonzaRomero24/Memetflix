async function cargarPeliculas(){
    try{
        const respuesta = await fetch("/get_Filtros");
        const datosPeliculas = respuesta.json();
        return datosPeliculas
    }catch(error){
        console.log(error)
    }
}

function mostrar_filtros(datosmovie){
    var div_container = document.getElementById("container-Peliculas");
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

document.addEventListener('DOMContentLoaded', async (event) => {
    const datos_movie = await cargarPeliculas();
    mostrar_filtros(datos_movie)
});