async function cargarSeries() {
    try{
        const respuesta = await fetch("/serie/get_Series_all");
        const datos_Series = respuesta.json();
        return datos_Series
    }catch(error){
        console.log(error)
    }
}

function cargarCaratulas(dataseries){
    var divcontainer = document.getElementById("container-Series");
    console.log(divcontainer)
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
        btn_ver.innerText = "ver";
        btn_ver.value = serie.nombre;
        card_body_series.appendChild(btn_ver);
        
        divcard.appendChild(card_body_series);
        div.appendChild(divcard);
        divcontainer.appendChild(div);
    });
}

function renderizarSerie(nombre_serie){
    const nombreserie = nombre_serie.target.value;
    const serieSeleccionada = nombreserie.replace(/ /g,"_")
    localStorage.setItem("serie_seleccionada",serieSeleccionada);
    window.location.href = "/series/"+serieSeleccionada
}

document.addEventListener('DOMContentLoaded', async (event) =>{
    const data_series = await cargarSeries();
    console.log(data_series);
    cargarCaratulas(data_series);
    const btnver = document.getElementsByClassName("btn");
    for (let i = 0; i < btnver.length; i++) {
        btnver[i].addEventListener("click", function(e){
            renderizarSerie(e);
        });
    }
});

