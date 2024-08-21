var btn_login = document.getElementById("btn-login");

btn_login.addEventListener("click", async() =>{
    const usuarioIngresado = document.getElementById("usuario").value;
    const contraseña = document.getElementById("password").value;
    console.log("entra")
    const response = await fetch("/verificarUsuario",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "usuario":usuarioIngresado,
            "password": contraseña
        })
    });
    console.log(response)
    if(response.ok){
        const datos =  await response.json();
        if (datos.Encontrado){
            localStorage.setItem("usuarioLog", datos.UsuaroLog);
            location.href  ="/"
        }else{
            console.log("error")
        }
    }else{
        console.log("error server")
    }

});
