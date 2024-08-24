from flask import Flask, request, jsonify , render_template
from flask_cors import CORS,cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-type"
db_peliculas = "db_datos_series_y_peliculas.json"
db_ususarios = "db_usuarios.json"

def leer_json_usuarios():
   with open(db_ususarios, "r") as usuarios:
       data_usuarios = json.load(usuarios)
   return data_usuarios

def añadir_json_usuarios(data_usuarios):
    with open(db_ususarios, "w") as usuarios:
        json.dump(data_usuarios,usuarios, indent=1)

def leer_db():
    with open(db_peliculas, "r") as peliculas:
        data_peliculas = json.load(peliculas)
    orden_data = sorted(data_peliculas, key=lambda x: x["nombre"])
    return orden_data

def añadir_db(data_peliculas):
    with open(db_peliculas , "w") as peliculas:
        json.dump(data_peliculas,peliculas,indent=1)


##------------------ Rutas ---------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/añadir")
def agregarPelicula():
    return render_template("agregarPelicula.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/registro")
def registro():
    return render_template("registro.html")

@app.route("/pelicula")
def pelicula():
    return render_template("pelicula.html")

@app.route("/series")
def serie():
    return render_template("series.html")

@app.route("/series/<serie_seleccionada>")
def info_serie(serie_seleccionada):
    print (serie_seleccionada)
    return render_template("info_serie.html",serie_seleccionada = serie_seleccionada)

##-----------------------------------------------

## ----- API para las Peliculas -----------------
@app.route("/peliculas", methods=["POST"] )
def nueva_Pelicula():
    data_peliculas = leer_db()
    nueva_pelicula = request.get_json()
    data_peliculas.append(nueva_pelicula)
    añadir_db(data_peliculas)

@app.route("/pelicula/getAll", methods=["GET"])
def obtener_peliculas():
    ultimos_estrenos = []
    data_peliculas = leer_db()
    for peliculas in data_peliculas:
        if peliculas["Anio"] >= "2022":
            ultimos_estrenos.append(peliculas)
    return jsonify(ultimos_estrenos)

@app.route("/pelicula/get_Peliculas", methods=["GET"])
def obtener_All_Peliculas():
    peliculasFiltro = []
    datos_db = leer_db()
    for peliculas in datos_db:
        if peliculas["tipo"] =="Pelicula":
            peliculasFiltro.append(peliculas)
    return jsonify(peliculasFiltro)

@app.route("/pelicula/get_Filtrado_Pelicula", methods=["POST"])
def obtener_Filtrado():
    peliculasFiltrado = []
    datos_peliculas = leer_db()
    filtros = request.get_json();
    print(filtros["generos"])
    for peliculas in datos_peliculas:
        if peliculas["tipo"] == "Pelicula":
            for filtro in filtros["generos"]:
                if peliculas["genero"] == filtro:
                    peliculasFiltrado.append(peliculas)
    return jsonify(peliculasFiltrado)
        
##-----------------------------------------------
## ----- API para las series -----------------
@app.route("/series/get_Series_all", methods=["GET"])
def Obtener_All_Series():
    Lista_Series = []
    datos_db = leer_db()
    for series in datos_db:
        if series["tipo"] == "Serie":
            Lista_Series.append(series)
    return jsonify(Lista_Series)

@app.route("/series/getVideo/<serie_seleccionada>",methods=["GET"])
def obtener_video(serie_seleccionada):
    url = ""
    serie_seleccionada = cambioCaracter(serie_seleccionada)
    print(serie_seleccionada)
    datos_db = leer_db()
    for series in datos_db:
        if series["nombre"] == serie_seleccionada:
            url = series["LinkTrailer"]
    return jsonify(url)

@app.route("/series/get_filtrado_serie", methods=["POST"])
def obtener_Filtrado1():
    peliculasFiltrado = []
    datos_peliculas = leer_db()
    filtros = request.get_json();
    print(filtros["generos"])
    for peliculas in datos_peliculas:
        if peliculas["tipo"] == "serie":
            for filtro in filtros["generos"]:
                if peliculas["genero"] == filtro:
                    peliculasFiltrado.append(peliculas)
    return jsonify(peliculasFiltrado)
        

@app.route("/series/getCaratula/<serie_seleccionada>",methods=["GET"])
def obtener_caratula(serie_seleccionada):
    url = ""
    serie_seleccionada = cambioCaracter(serie_seleccionada)
    print(serie_seleccionada)
    datos_db = leer_db()
    for series in datos_db:
        if series["nombre"] == serie_seleccionada:
            url = series["linkCaratula"]
    return jsonify(url)


def cambioCaracter(cadena):
    return cadena.replace("_"," ")
    
##-----------------------------------------------
## ----- API para los usuarios -----------------
@app.route("/obtenerUsuarios", methods=["GET"])
def obtener_usuarios():
    data_usuarios = leer_json_usuarios()
    print(data_usuarios)
    return jsonify(data_usuarios)


@app.route("/verificarUsuario", methods=["POST"])
def verificarUsuario():
    encontrado = False
    usuario_encontrado = None
    data_usuario = leer_json_usuarios()
    data = request.get_json()
    print(data["usuario"])

    for usuario in data_usuario:
        if data["usuario"] == usuario["Usuario"] and data["password"] == usuario["Contrasena"] : 
            encontrado = True
            usuario_encontrado = usuario
            break
    if encontrado == True:
        return jsonify({"Encontrado": True , "UsuaroLog": usuario_encontrado["Usuario"]})
    else :
        return jsonify({"Encontrado": False})

@app.route("/añadirUsuario", methods=["POST"])
def añadir_usuario():
    data_usuarios = leer_json_usuarios()
    nuevo_usuario = request.get_json()
    data_usuarios.append(nuevo_usuario)
    añadir_json_usuarios(data_usuarios)
    return "cliente agregado"