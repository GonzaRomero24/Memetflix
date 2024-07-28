var btn_login = document.getElementById("btn-login");

btn_login.onclick = function(){
    let usuarioIngresado = document.getElementById("usuario").value;
    let contraseña = document.getElementById("password").value;
    fetch("/verificarUsuario",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "usuario":usuarioIngresado,
            "password": contraseña
        })
    });
    console.log(usuarioIngresado.value);
    console.log(contraseña.value);
    
}