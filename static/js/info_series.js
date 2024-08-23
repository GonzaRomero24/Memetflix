async function ObtenerDatosWiki(nombre_serie) {
    console.log(nombre_serie)
    if(nombre_serie == "Pokemon"){
        nombre_serie = "Pokémon_(serie_de_televisión)"
    }
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nombre_serie)}`;
    try{
        const respuesta = await fetch(url);
        if (respuesta.ok){
            const data = await respuesta.json();
            console.log(data.extract)
            visualizar_data(data)
        }else{
            console.log("error",respuesta.status);
        }
    }catch(error){
        console.log(error);
    }
}

async function obtenerVideo(nombre) {
    try{
        const respuesta = await fetch(`/series/getVideo/${encodeURIComponent(nombre)}`);
        if(respuesta.ok){
            const data = await respuesta.json()
            return data
        }
    }catch(error){
        console.log(error);
    }
}

async function obtenerCaratula(nombre) {
    try{
        const respuesta = await fetch(`/series/getCaratula/${encodeURIComponent(nombre)}`);
        if(respuesta.ok){
            const data = await respuesta.json()
            return data
        }
    }catch(error){
        console.log(error);
    }
}

async function visualizar_data(datos){
    let div_border = document.getElementById("caratula");
    const h1 = document.getElementById("titulo");
    h1.textContent = datos.title;
    //<img src="https://cdn.myanimelist.net/images/anime/1277/142022.jpg">
    const url_c = await obtenerCaratula(nombre_serie);
    const img_caratula = document.createElement("img")
    img_caratula.src= url_c ;
    div_border.appendChild(img_caratula);

    let div_container = document.getElementById("datos");
    const h3 = document.createElement("h3");
    h3.textContent = "Trailer"
    div_container.appendChild(h3);
    const url =  await obtenerVideo(nombre_serie);
   //<iframe width="560" height="315" src="https://www.youtube.com/embed/cie7scVUdQE?si=Oc0EE8rPrY03tGE4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
   const iframeVideo = document.createElement("iframe");
   iframeVideo.width = "560px";
   iframeVideo.height = "315px"
   iframeVideo.src = url
   iframeVideo.frameborder="0"
   iframeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   iframeVideo.referrerpolicy="strict-origin-when-cross-origin"
   iframeVideo.allowfullscreen;
   div_container.appendChild(iframeVideo);

   const div_historia = document.getElementById("historia");
   const texto = document.createElement("p");
   texto.innerText = datos.extract;
   div_historia.appendChild(texto);
}

const nombre_serie = localStorage.getItem("serie_seleccionada");
ObtenerDatosWiki(nombre_serie);


