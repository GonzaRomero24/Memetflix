from flask import Flask, request, jsonify , render_template
from flask_cors import CORS,cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-type"
db_peliculas = "db_peliculas.json"

##def leer_json_usuarios():
   ## return 1

def leer_json_peliculas():
    with open(db_peliculas, "r") as peliculas:
        data_peliculas = json.load(peliculas)
    return data_peliculas

def añadir_json(data_peliculas):
    with open(db_peliculas , "w") as pp:
        json.dump(data_peliculas,pp,indent=1)


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

##-----------------------------------------------

## ----- API para las Peliculas -----------------
@app.route("/peliculas", methods=["POST"] )
def nueva_Pelicula():
    data_peliculas = leer_json_peliculas()
    nueva_pelicula = request.get_json()
    data_peliculas.append(nueva_pelicula)
    añadir_json(data_peliculas)

@app.route("/get", methods=["GET"])
def obtener_peliculas():
    data_peliculas = leer_json_peliculas()
    return jsonify(data_peliculas)
##-----------------------------------------------
## ----- API para los usuarios -----------------
@app.route("/verificarUsuario", methods=["POST"])
def verificarUsuario():
    ##data_usuario = leer_json_usuarios()
    data = request.get_json()
    print(data)
    return render_template("index.html")

