/* Funcion para obtener datos */
async function obtener_datos() {
    try{
        const respuesta = await fetch("/obtenerUsuarios")
        const data = await respuesta.json();
        return data
    } catch(error){
        console.log(error);
    }

}

const validarCorreo = (correoIngresado) =>{
    return correoIngresado.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}


var btn_registrar = document.querySelector("#btn-registrar");
/*Funcion para ir agregando los nuevos usuarios */
btn_registrar.addEventListener("click", async () =>{
    
    /* Variables */
    let nombre_usuario = document.getElementById("nombre_usuario").value;
    let correo_usuario = document.getElementById("correo_usuario").value;
    let usuario_Ingresado = String(document.getElementById("usuario").value);
    let contraseña_ingresada = document.getElementById("contraseña-usuario").value;
    let confirmacion_contraseña = document.getElementById("Rcontraseña-usuario").value;


    /* Obtener datos y filtrar si existe un usuario antes*/
    const db_usuario = await obtener_datos()
    let id = db_usuario.length;
    const usuarioExistente = db_usuario.filter(user => user.Usuario === usuario_Ingresado);
    const emailExistente = db_usuario.filter(user => user.Correo === correo_usuario);


    /*Validaciones de entrada */
    if(nombre_usuario === "" || correo_usuario === "" || usuario_Ingresado === "" || contraseña_ingresada === "" || confirmacion_contraseña === ""){
        btn_registrar.setAttribute("data-bs-toggle","modal");
        btn_registrar.setAttribute("data-bs-target","#staticBackdrop");
        const divmodal = document.getElementById("body_modal");
        divmodal.innerText = "No has llenado todos los espacios";

    } else if(!validarCorreo(correo_usuario)){
        btn_registrar.setAttribute("data-bs-toggle","modal");
        btn_registrar.setAttribute("data-bs-target","#staticBackdrop");
        const divmodal = document.getElementById("body_modal");
        divmodal.innerText = "Correo Invalido";
    
    } else if(usuarioExistente.length > 0 || emailExistente.length >0){
        btn_registrar.setAttribute("data-bs-toggle","modal");
        btn_registrar.setAttribute("data-bs-target","#staticBackdrop");
        const divmodal = document.getElementById("body_modal");
        divmodal.innerText = "El usuario o correo ya existe , porfavor intenta con otro";

    } else if(contraseña_ingresada !== confirmacion_contraseña ){
        btn_registrar.setAttribute("data-bs-toggle","modal");
        btn_registrar.setAttribute("data-bs-target","#staticBackdrop");
        const divmodal = document.getElementById("body_modal");
        divmodal.innerText = "las contraseñas no son iguales";

    } else{
        console.log("entra")
        /*Fetch a la api */
        const response = await fetch("/añadirUsuario",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "Id":id + 1,
                    "Nombre":nombre_usuario,
                    "Correo":correo_usuario,
                    "Usuario":usuario_Ingresado,
                    "Contrasena":contraseña_ingresada,
                    "TipoUsuario":"Usuario"
                })
            });
        console.log(response.status);
        location.href="/"
    }
});



