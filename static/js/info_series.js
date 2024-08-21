async function ObtenerDatosWiki(nombre_serie) {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nombre_serie)}`;
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

const nombre_serie = localStorage.getItem("serie_seleccionada");
ObtenerDatosWiki(nombre_serie)
