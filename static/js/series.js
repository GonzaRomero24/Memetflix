async function cargarSeries() {
    try{
        const respuesta = await fetch("/series/get_Series_all");
        if(respuesta.ok){
            const datos_Series = await respuesta.json();
            cargarCaratulas(datos_Series)
        }
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
    divcontainer.innerHTML = "";
    let i = 1
    dataseries.forEach(serie => {
        const div = document.createElement("div");
        div.className = "col-12 col-lg-3 mb-4 ms-3";
        
        const divcard = document.createElement("div");
        divcard.className = "container-fluid card align-items-center justify-content-center";
        
        const caratula_serie = document.createElement("img");
        caratula_serie.className = "mt-2"
        caratula_serie.src = serie.linkCaratula;
        
        divcard.appendChild(caratula_serie);

        const card_body_series = document.createElement("div");
        card_body_series.className = "bodycard mx-auto text-center"
        const titulo_serie = document.createElement("h5");
        titulo_serie.innerText = serie.nombre;
        card_body_series.appendChild(titulo_serie);

        const btn_ver = document.createElement("button");
        btn_ver.className = "btn px-5 mb-1 btn-light";
        btn_ver.id = "btn-ver"
        btn_ver.innerText = "ver";
        btn_ver.value = serie.nombre;
        card_body_series.appendChild(btn_ver);
        
        divcard.appendChild(card_body_series);
        div.appendChild(divcard);
        divcontainer.appendChild(div);
        btnVer();
    });
}

async function aplicarFiltros(){
    const check = document.querySelectorAll(".form-check-input");
    const box_check = Array.from(check)
        .filter(check=> check.checked)
        .map(check=> check.value)
    if(box_check.length > 0){
        ObtenerFiltrado(check);
    }else{
        cargarSeries();
    }    
}

function btnVer(){
    const btn_ver = document.querySelectorAll("#btn-ver")
    for (const btn of btn_ver){
        btn.addEventListener("click",()=>{
            console.log(btn.value)
            renderizarSerie(btn.value)
        });
    }
}

function renderizarSerie(nombre_serie){
    const serieSeleccionada = nombre_serie.replace(/ /g,"_")
    localStorage.setItem("serie_seleccionada",serieSeleccionada);
    window.location.href = "/series/"+serieSeleccionada
}

function userLog(){
    const usuariolog = localStorage.getItem("usuarioLog");
    const divLog = document.querySelector("#Log");
    if (usuariolog){
        divLog.innerHTML = ""
        let  itemNav = document.createElement("li");
        itemNav.className = "nav-item dropdown";

        let linkNav = document.createElement("button");
        linkNav.className = "btn btn-light dropdown-toggle";
        linkNav.setAttribute("data-bs-toggle","dropdown");
        linkNav.setAttribute("aria-expanded","false");
        linkNav.innerText = usuariolog;

        let menudrop = document.createElement("ul");
        menudrop.className = "dropdown-menu";

        let logoutdrop = document.createElement("li");
        let logoutnav = document.createElement("a");
        logoutnav.className = "dropdown-item";
        logoutnav.href = "/series";
        logoutnav.id = "logOut";
        logoutnav.innerText = "Cerrar Sesion";

        logoutdrop.appendChild(logoutnav);
        menudrop.appendChild(logoutdrop);
        itemNav.appendChild(linkNav);
        itemNav.appendChild(menudrop);
        divLog.appendChild(itemNav);


        const btn_logout = document.getElementById("logOut");

        btn_logout.addEventListener("click", function(){
            localStorage.removeItem("usuarioLog");
            Location.reload();
        });
    } else{
        /*  <a class="nav-link" href="/login">Login</a> */
        divLog.innerHTML = "";
        let linkLogin = document.createElement("button");
        linkLogin.className ="btn btn-light px-3 me-2";
        linkLogin.id = "btn-login"
        var iconoLogin = "<i class='bx bx-user-circle' ></i>";
        linkLogin.innerHTML = iconoLogin + "  Iniciar Sesion"

        
        divLog.appendChild(linkLogin);

        const btn_login = document.getElementById("btn-login");
        btn_login.addEventListener("click",function(){
            window.location.href = "/login"
        });
    }
}

const filtro = document.getElementById("btn_filtro")
filtro.addEventListener("click",aplicarFiltros)



window.addEventListener('load', async () =>{
     cargarSeries();
     userLog();
});

