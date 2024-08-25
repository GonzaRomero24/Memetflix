
function carga_datos() {
    fetch("/pelicula/getAll")
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            mostrar_datos(peliculas);
        })
        .catch(error => console.error('Error data:', error));
}


function mostrar_datos(data) {
    var divBody = document.getElementById("containerCard");
    divBody.innerHTML = ''
    data.forEach((e) => {
        const div2 = document.createElement("div");
        div2.className = "col-12 col-lg-3 mb-4";

        const divcard = document.createElement('div');
        divcard.className = "container-fluid card align-items-center justify-content-center";

        const caratula = document.createElement("img");
        /*caratula.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTs8O9rWjP0cWAxVHelhq4kBUUxkOTtzreA&s";*/
        caratula.src = e.linkCaratula;
        divcard.appendChild(caratula);

        const divContenedor = document.createElement("div");
        divContenedor.className = "container d-flex align-items-center"
        
        const cardbody = document.createElement("div");
        cardbody.className = "mx-auto text-center"
        const cardTitulo = document.createElement("h5");
        cardTitulo.innerText = e.nombre;
        cardbody.appendChild(cardTitulo);

        const masdetalles = document.createElement("button");
        masdetalles.className = "btn px-5 btn-light uppercase"
        masdetalles.innerText = "ver";
        cardbody.appendChild(masdetalles);
        divContenedor.appendChild(cardbody);
        divcard.appendChild(divContenedor);
        div2.appendChild(divcard)
        divBody.appendChild(div2);
    });
    
}

window.addEventListener("load",function(){
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
        logoutnav.href = "/";
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
        linkLogin.innerHTML = iconoLogin + "  Login"

        
        divLog.appendChild(linkLogin);

        const btn_login = document.getElementById("btn-login");
        btn_login.addEventListener("click",function(){
            window.location.href = "/login"
        });

    }
})


document.addEventListener('DOMContentLoaded', (event) => {
    carga_datos();
});