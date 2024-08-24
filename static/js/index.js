let db_peliculas = [];

function carga_datos() {
    fetch("/pelicula/getAll")
        .then(response => response.json())
        .then(data => {
            db_peliculas = data;
            console.log("Data received:", db_peliculas);
            mostrar_datos();
        })
        .catch(error => console.error('Error data:', error));
}


function mostrar_datos() {
    var divBody = document.getElementById("containerCard");
    divBody.innerHTML = ''
    db_peliculas.forEach((e) => {
        let div2 = document.createElement("div");
        div2.className = "col-12 col-lg-3 mb-4";
        let divcard = document.createElement('div');
        divcard.className = "card align-items-center justify-content-center";
        let caratula = document.createElement("img");
        /*caratula.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTs8O9rWjP0cWAxVHelhq4kBUUxkOTtzreA&s";*/
        caratula.src = e.linkCaratula;
        divcard.appendChild(caratula);
        let cardbody = document.createElement("div");
        let cardTitulo = document.createElement("h5");
        cardTitulo.innerText = e.nombre;
        cardbody.appendChild(cardTitulo);
        let genero = document.createElement("p");
        genero.innerText = e.genero;
        cardbody.appendChild(genero);
        let masdetalles = document.createElement("button");
        masdetalles.innerText = "ver";
        cardbody.appendChild(masdetalles);
        divcard.appendChild(cardbody);
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
        linkNav.className = "btn btn-secondary dropdown-toggle";
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
        linkLogin.className ="btn btn-primary";
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