async function cargarSeries() {
    try{
        const respuesta = await fetch("/get_Series_all");
        const datos_Series = respuesta.json();
        console.log(datos_Series);
        return datos_Series
    }catch(error){
        console.log(error)
    }
}

function cargarCaratulas(data_series){
    var div_container = document.getElementById("container-Serie");
    console.log(data_series)
    data_series.forEach(serie => {
        const div = document.createElement("div");
        div.className = "col-6 col-md-4 col-xl-3";
        
        const divcard = document.createElement("div");
        divcard.className = "card align-items-center justify-content-center";
        
        const caratula_serie = document.createElement("img");
        caratula_serie.src = serie.linkCaratula;
        caratula_serie.style.width = "120px";
        divcard.appendChild(caratula_serie);
        div.appendChild(divcard);
        div_container.appendChild(div);
    });
}


document.addEventListener('DOMContentLoaded', async (event) =>{
    const data_series = await cargarSeries();
    console.log(data_series);
    cargarCaratulas(data_series);
});