document.getElementById("form-añadir").addEventListener("submit", async(e)=>{
    e.preventDefault()
    const nombre_pelicula = document.getElementById("nombre_pelicula").value;
    const genero_pelicula = document.getElementById("genero_pelicula").value;
    const link_pelicula = document.getElementById("link_imagen").value;
    const anio = document.getElementById("Anio").value;

    console.log(nombre_pelicula);
    console.log(genero_pelicula);

    await fetch("/peliculas",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "nombre":nombre_pelicula,
            "genero":genero_pelicula,
            "linkCaratula": link_pelicula,
            "Anio": anio
        })
    });

    window.location.href = "/"
})