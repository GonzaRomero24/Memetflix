from flask import Flask, request, jsonify , render_template
from flask_cors import CORS,cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-type"
db_peliculas = "db_peliculas.json"
db_ususarios = "db_usuarios.json"

def leer_json_usuarios():
   with open(db_ususarios, "r") as usuarios:
       data_usuarios = json.load(usuarios)
   return data_usuarios

def añadir_json_usuarios(data_usuarios):
    with open(db_ususarios, "w") as usuarios:
        json.dump(data_usuarios,usuarios, indent=1)

def leer_json_peliculas():
    with open(db_peliculas, "r") as peliculas:
        data_peliculas = json.load(peliculas)
    return data_peliculas

def añadir_json_peliculas(data_peliculas):
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

@app.route("/series")
def series():
    return render_template("Series.html")

##-----------------------------------------------

## ----- API para las Peliculas -----------------
@app.route("/peliculas", methods=["POST"] )
def nueva_Pelicula():
    data_peliculas = leer_json_peliculas()
    nueva_pelicula = request.get_json()
    data_peliculas.append(nueva_pelicula)
    añadir_json_peliculas(data_peliculas)

@app.route("/get", methods=["GET"])
def obtener_peliculas():
    data_peliculas = leer_json_peliculas()
    return jsonify(data_peliculas)
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
    return "cliente agregado           "