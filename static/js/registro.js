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
        
        alert("No has llenado todos los espacios")

    } else if(usuarioExistente.length > 0 || emailExistente.length >0){

        alert("El usuario o correo ya existe , porfavor intenta con otro")

    } else if(contraseña_ingresada !== confirmacion_contraseña ){
        alert("las contraseñas no son iguales")

    } else{

        /*Fetch a la api */
        fetch("/añadirUsuario",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Id":id + 1,
                "Nombre":nombre_usuario,
                "Correo":correo_usuario,
                "Usuario":usuario_Ingresado,
                "Contrasena":contraseña_ingresada
            })
        });
    }
});



