## Mongo DB  <img src="./resources/mongodb.png" width="35px">

Cuando hablamos de bases de datos tendemos a pensar en SQL y el modelo de bases de datos relacional, pero existen alternativas como los modelos no relacionales donde MongoDB es quizá el ejemplo más destacado.

MongoDB (del inglés humongous, "enorme") es un sistema de base de datos NoSQL orientado a documentos de código abierto y escrito en C++, que en lugar de guardar los datos en tablas lo hace en estructuras de datos BSON (similar a JSON) con un esquema dinámico. Al ser un proyecto de código abierto, sus binarios están disponibles para los sistemas operativos Windows, GNU/Linux, OS X y Solaris y es usado en múltiples proyectos o implementaciones en empresas como MTV Network, Craigslist, BCI o Foursquare.

## Inicialización del proyecto. 

- Clonamos el proyecto en un directorio. 
- Entramos al directorio clonado

```bash
> git clone https://github.com/TheHackBoxCampus/mongoCitas.git
> cd mongoCitas 
```

## Crea el archivo de enviroments: 

- En la raiz del proyecto, crea un archivo ``.env``

- Configura las propiedades: Servidor de express, datos de mongodb atlas, key de token 

```text
SERVER={"...": "localhost", "port": ...}
USER_DB={"username": "...", "password": "...", "database": "..."}
KEY="..."
```

## Cluster de Mongo DB atlas

Para que podamos ejecutar el script ``'query.mongodb'`` tenemos que conectarnos con ``mongo``, existen varias formas de utilizar mongo
te puedes conectar al loopback o directamente al cloud con mongo db ``ATLAS``

En esta ocasión se estara utilizando ``mongodb atlas`` para registrar los documentos en la nube.

Requerimientos:

- Tener una cuenta de mongoDB ``atlas`` 
- ! si no tienes una cuenta puedes consultar este video y realizar el proceso: https://youtu.be/hXyIv_vKdUs
- Tener autenticacion para conectarse con ``atlas``, es decir consultar un enlace como el siguiente: 

```txt
> mongodb+srv://<user>:<password>@<cluster>/

// user => escriba su usuario
// password => escriba su contraseña
// cluster => consultelo en mongo atlas en su database. Es propio NO generico
``` 
- Una vez ya consultado puede conectarte con ``mongoDB compass`` o con la extension de **visual studio code** -> ``mongoDB`` 
 
### Mongo DB Compass

<img src="./resources/mongoCompass.png" width="700px" heigth="700px">

### Mongo DB Extension de VSCODE 

<img src="./resources/extensionVSCODEmongo.png" width="700px" heigth="700px">

- Cualquiera de las 2 opciones son validas, depende de gusto y comodidad


## Modifica el cluster en el proyecto
- Una vez que tengas el cluster 
- Dirigite a la ruta ``src/v1/config/db.js``
- Cambia el cluster:

#### Nota: La propiedad ``enviroments`` viene del archivo ``src/env/env.js``
```js
let credentials = JSON.parse(enviroments.USERDB); 
let uri = "mongodb+srv://${credentials.username}:${credentials.password}@<cluster>${credentials.database}" 
// Puedes cambiar el nombre de la variable o dejarlo asi.
// cambia el cluster por el que tienes en mongodb atlas
```

## Conexion a mongo db con el client 

- Te puedes conectar de esta forma:

```js
import { MongoClient } from "mongodb";
import enviroments from "../env/env.js";

const conx = async () => {
    try {
        let credentials = JSON.parse(globalProperties.USERDB);
        let uri = "mongodb+srv://${credentials.username}:${credentials.password}@<cluster>${credentials.database}";
        let options = {
            useNewUrlParser: true,
            useunifiedtopology: true
        }
        let client = await MongoClient.connect(uri, options);
        console.log("db --> success");
        return client.db(); 
    }catch(err) {
        console.error(err.message)
    }
}

export default conx; 
```

## Transpila los archivos .*ts (typescript)

- En el archivo package.json
- Encontraras en los scripts. El siguiente comando: 

```json
"scripts": {
    "tsc": "tsc -w" 
}
```

- Para ejecutarlo y transpilar los archivos ejecuta el comando en la terminal, de la siguiente manera:

```bash
npm run tsc
```

- Esto transpilara los archivos ts a javascript en la ruta ``src/storage/structure``


#### Para que esto funcionara:

Por default en el proyecto, vendra un archivo ``tsconfig.json``, donde estaran las configuraciones del compilador para cambiar los *.ts a *.js 

- No toques esta parte
- Puedes consultar mas en las paginas oficiales

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "es6",
        "moduleResolution": "node",
        "outDir": "src/v1/storage",
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    },
    "include": [
        "src/v1/storage/*.ts"    
    ],
    "exclude": [
        "src/v1/storage/*.js"
    ]
}
```

## Poner en escucha el servidor de express:

- En el archivo package.json
- Encontraras en los scripts. El siguiente comando: 

```json
"scripts": {
    "dev": "nodemon --quiet src/index.js"
}
```

- Para ejecutarlo y poner en escucha al servidor: escribe en la terminal

```bash
npm run dev
```

## ¿Como se configuro el servidor?

- ** EJEMPLO DE USO ** 
- Este ejemplo no tiene uso en el proyecto, es instructivo para el entendimiento del express.

Para que los endpoints tengan funcionamiento con el `` Router ``  de express, primero tenemos que desplegar un servidor 
```js
import express from 'express';
let app = express();

let config = {
    hostname : "IP",
    port: "port"
};

app.listen(config, () => {
    console.log(`server lanzado en http://${config.hostname}:${config.port}`);
})
```
Configuramos los middleware para que acepte valores json y de texto
```javascript
import express from 'express';
let app = express(); 
// middleware
app.use(express.text())
app.use(express.json())
```
Con el ``Router`` de express en nuestro archivo app.js definimos la ruta principal llamada dbCampus
```javascript
// importamos las rutas de nuestro archivo routes, /* mas informacion mas adelante */
import express from 'express';
import router from './router/routes.js'
let app = express(); 

app.use("consultas", router); 
```

## Enrutado con Router / Express 
### Consultas HTTP en Router / Express

- ** EJEMPLO DE USO ** 
- Este ejemplo no tiene uso en el proyecto, es instructivo para el entendimiento del router y la conexion de mongodb con el client.

- Importar el MODULO ``Router`` de express
- importar la conexión exportada de mongo db

```javascript
import { Router } from "express";
import { conx } from "../config/db.js";

let router = Router(); 

// diferentes metodos get, post, put, delete
router.get("/", async (req, res) => {
    let db = await conx();
    let bodegas = await db.collection("bodegas");
    let consulta = await bodegas.find().toArray(); 
    res.send(consulta)
} )
```

### Dependencias del proyecto 

En esta seccion te voy a explicar con que funciona el proyecto, Ejemplos genericos para que entiendas el funcionamiento.

### DTO 
Tus datos necesitan seguridad, ¿Cómo se puede garantizar una seguridad?, Precisamente con los Data Transfer Object (Transferencia de los datos), El dto es una capa de abstraccion que nos permite transformar y manipular los datos de la forma que queramos, por ende dando validaciones y permisos, lo que hace que tus datos lleguen de manera mas segura al backend de tu aplicacion.

Para la utilizacion de los dto: 
-  Se utilza javascript tipado, teniendo en cuenta de que typescript se compila a javascript y el funcionamiento de los tipados es unicamente en el proceso de compilación no de ``Ejecucion`` 
- Por lo mismo se utilizan las librerias, para informar los errores cuando se detecten en la compilacion

### Ejemplo de un dto con los decoradores
```ts
// libraries 
import { Transform, Expose } from "class-transformer";

class CLASS {
  @Expose({ name: "prop" })
  @Transform(({ value }) => {
     // * validations
  })
  prop: number;
  constructor(prop: number) {
    this.prop = prop;
  }
}

export default CLASS;
```

## JWT (Json Web Tokens)
Los datos estan un poco mas sanitizados pero ¿Cómo puedo autorizar al usuario o dar permisos al usuario?, El algoritmo HS256 del tipo JWT permite crear tokens, que son los tokens, El token es una referencia (un identificador) que regresa a los datos sensibles a través de un sistema de tokenización.

### ¿Que funcionamiento tienen los tokens?
En el mismo se define un mecanismo para poder propagar entre dos partes, y de forma segura, la identidad de un determinado usuario, además con una serie de claims o privilegios.

Estos privilegios están codificados en objetos de tipo JSON, que se incrustan dentro de del payload o cuerpo de un mensaje que va firmado digitalmente.

### Ejemplo de token
<img src="https://dc722jrlp2zu8.cloudfront.net/media/uploads/2019/12/04/cap1-seguridad2.png">

### Estructura de un token 
<img src="https://byte-mind.net/wp-content/uploads/2022/02/jwt-parts.png">

* Header: encabezado dónde se indica, al menos, el algoritmo y el tipo de token, que en el caso del ejemplo anterior era el algoritmo HS256 y un token JWT.

* Payload: donde aparecen los datos de usuario y privilegios, así como toda la información que queramos añadir, todos los datos que creamos convenientes.

* Signature: una firma que nos permite verificar si el token es válido, y aquí es donde radica el quid de la cuestión, ya que si estamos tratando de hacer una comunicación segura entre partes y hemos visto que podemos coger cualquier token y ver su contenido con una herramienta sencilla, ¿dónde reside entonces la potencia de todo esto?


### Ejemplo en codigo 
Para la utilización del token JWT, se puede implementar con la libreria jsonwebtokens, pero en este caso aprovechando los modulos de la libreria ``jose``
```js
import jwt from "jsonwebtoken";
```
Verificar el token:
```js
// jwtverify
 jwt.verify(token, enviroments.KEY, { algorithms: "HS256" }, (err, decoded) => {
        err ? cb(err) : cb(null, decoded, { scope: "*" })
})
```
Crear el token:
```js
// Sign
 let token = new Promise((resolve, reject) => {
    jwt.sign(payload, enviroments.KEY, {algorithm: "HS256", expiresIn: "10m"}, (err, token) => {
         err ? reject(err) : resolve(token) 
    })
})
```

## Passport-http-Bearer

Informacion Oficial:

**"El módulo Passport-http-bearer proporciona una estrategia Passport para autenticar tokens de portador utilizados de acuerdo con el esquema de autenticación de HTTP Bearer.**

**Los tokens de portador son una credencial que puede utilizar cualquier parte en posesión del token para obtener acceso a un recurso protegido. El uso de un token de portador no requiere ninguna credencial adicional, como una clave criptográfica. Como tales, los tokens al portador deben protegerse contra la divulgación tanto en el almacenamiento como en el transporte para poder utilizarlos de forma segura.**

**El esquema de autenticación de Bearer está especificado por RFC 6750. Este esquema fue diseñado para usarse con tokens de acceso emitidos usando OAuth 2.0. Sin embargo, este esquema se puede utilizar dentro del marco general de autenticación HTTP (RFC 7235) y también se puede utilizar para autenticar tokens de portador emitidos a través de otros mecanismos".**


### Ejemplo de uso

- importa la estrategia 
```js
import {Strategy as BearerStrategy} from "passport-http-bearer"
```

- Ejemplo generico para la configuración de la libreria.
 
```js
new BearerStrategy(function(token, cb) {
  tokens.findOne({ value: token }, function(err, claims) {
    if (err) { return cb(err); }
    if (!claims) { return cb(null, false); }

    users.findOne({ id: claims.userID }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user, { scope: claims.scope });
    });
  });
});
```

## Express-rate-limit 

Informacion Oficial: 

**La limitación de velocidad es una estrategia que puede utilizar para controlar el tráfico en una red. Limita la cantidad de solicitudes que un usuario puede realizar dentro de un período de tiempo específico.**

Ejemplo de uso: 

- Configuracion 

```js
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})
```

- Utiliza la funcion limiter en las rutas 
- Pasalo como middleware

```js
router.get("/", limiter(), (req, res) => res.send("hello world!"))
```

## Express-routes-versioning

Lo que nos permite es colocar o hacer versionados para nuestras rutas, muchas veces nos vamos a encontrar en esos casos donde es necesario corregir un error o modificar y refactorizar mejor el funcionamiento de la api, asi como en github podemos generar diversos tags para las versiones de nuestro proyecto, podemos hacerlo atraves de codigo con esta dependencia, distribuyendo y haciendo mas escalables nuestras APIs

Ejemplo de uso: 

** Ejemplo generico **

```js
import routesVersioning from "express-routes-versioning";
import {Router} from "express"; 
import controller from "../controllers"

// instancia de la dependencia para el correcto uso, ya que por defecto viene en modulos commond.js
const version = routesVersioning(); 

// ruta de ejemplo
let RouteX = Router(); 

RouteX.get("/", ...middlewares /* configuras tus middlewares */, version({
    "1.0.0": controller // el modulo que quieres ejecutar
}))
```


## Funcionamiento del proyecto 

- Ruta principal 

```text
http://${hostname}:${port}/
```

- Generar token de sesion

```text
GET => /generar/:categoria 
``` 
- Despues de esa ruta principal puedes colocar los siguientes endpoints
- Cada ruta en su descripcion va tener el ``METODO => ENDPOINT => CATEGORIA DE TOKEN``


## En categoria puedes escoger entre:
 
> - acudientes
> - pacientes
> - citas
> - medicos 

- En caso contrario te dara excepciones:

- No es necesario enviar datos

- la categoria debe ir en MINUSCULA

- Te retorna un token con la estructura de la categoria que colocaste

- Ese token debe ir en el Bearer de las otras rutas

## Listar pacientes

```txt
GET => /pacientes => pacientes
```
### Descripcion de la consulta:
```txt
- Obtener todos los pacientes alfabéticamente
```

- No necesita datos de entrada
- El token debe ir, en caso contrario recibiras excepciones


## Listar citas

```txt
GET => /citas => citas
```
### Descripcion de la consulta:
```txt
- Obtener todas las citas alfabéticamente
```
- No necesita datos de entrada
- El token debe ir, en caso contrario recibiras excepciones


## Lista medicos por especialidad
```txt
GET => /medicos/:especialidad => medicos
```

### Descripcion de la consulta:
```txt
- Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**)
```

- deberas mandar la ***id*** de la especialidad
- Debe ser un dato ***numerico***
- ***ningun*** caracter en letras
- en caso contrario recibiras ***excepciones***


## Proxima cita
```txt
GET => /citas/:paciente => citas
```

### Descripcion de la consulta
```txt
- Encontrar la próxima cita para un paciente específico (por ejemplo, el paciente con **usu_id 1**):
```

- deberas mandar la ***id*** del paciente
- Debe ser un dato ***numerico***
- ***ningun*** caracter en letras
- en caso contrario recibiras ***excepciones***


## Listar citas con medicos especificos

```txt
GET => /citas/medico/:medico => citas
```

### Descripcion de la consulta
```txt
- Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con **id= 1**)
```

- deberas mandar la ***id*** del medico
- Debe ser un dato ***numerico***
- ***ningun*** caracter en letras
- en caso contrario recibiras ***excepciones***


## Listar las citas de un paciente
```txt
- GET => /citas/consultorio/:paciente => citas
```
### Descripcion de la consulta 

```txt
Obtener las citas para un paciente especifico y el numero del consultorio
```

- deberas mandar la ***id*** del paciente
- Debe ser un dato ***numerico***
- ***ningun*** caracter en letras
- en caso contrario recibiras ***excepciones***

## Listar citas por fecha especifica

```txt
GET => /fecha/cita => citas
``` 

### Descripcion de la consulta
```txt 
- Encontrar todas las citas para un día específico (por ejemplo, **'2023-07-12'**)
```

- Datos de entrada 
```json
{
    "fecha": "..."
}
```

- El nombre del parametro debe ser "fecha"
- la fecha tiene que estar en formato **`` yy/mm/dd ``**
- Debe ser una ***cadena de texto***
- en caso contrario recibiras ***excepciones***


## listar medicos y sus especialidades

```txt
GET => /doctores/obtener/especializacion => medicos
```

### Descripcion de la consulta 
```txt
- Obtener los médicos y sus consultorios
```
- No necesita datos de entrada
- El token debe ir, en caso contrario recibiras excepciones


## listar cantidad de citas por medico y fecha

```txt
GET => /cantidad/citas => citas
```

### Descripcion de la consulta 
```txt
- Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con **id 1 en '2023-07-12'**)
```

- Datos de entrada: 
```json
{
    "fecha": "...",
    "medico": 0
}
``` 
- los nombres de los parametros deben ser "fecha" y "medico"
- la fecha tiene que estar en formato **`` yy/mm/dd ``**
- deberas mandar la ***id*** del medico
- En caso contrario no recibiras informacion. 

## listar consultorios donde han habido citas 
```txt
GET => /consultorios/citas => citas
```

### Descripcion de la consulta 
```txt
- Obtener los consultorio donde se aplicó las citas de un paciente
```
- No necesita datos de entrada
- El token debe ir, en caso contrario recibiras excepciones

## Listar citas por genero
```txt
GET => /genero/citas/:genero => citas
```

### Descripcion de la consulta
```txt
- Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendidad
```

- Deberas mandar el genero -> **Masculino** o **Femenino**
- En caso contrario no recibiras informacion. 


## Paciente nuevo 
```txt
POST => /pacientes => pacientes
```

### Descripcion de la consulta
```txt
- Insertar un paciente a la tabla usuario pero si es menor de edad solicitar primero que ingrese el acudiente y validar si ya estaba registrado el acudiente.
```

- Datos de entrada: 
```json
{
  "nombres": "...",
  "apellidos": "...",
  "telefono": "...",
  "direccion": "...",
  "email": "...",
  "tipo_documento": 0,
  "genero": 0,
  "acudiente": parametro opcional 
}
```
- nombres => deben estar separados **"[cadena cadena]** ejemplo "Juan Andres"
- apellidos => deben estar separados **"[cadena cadena]** ejemplo "Mantilla suarez"
- telefono => una cadena de numeros 
- direccion => una cadena de texto
- email => formato email **cadena@cadena.extension**
- tipo_documento => dato numerico
- genero => dato numerico
- acudiente => parametro opcional, el parametro debe ponerse en caso que el paciente que este registrando sea menor de edad
- En caso de que sea menor de edad, deberas llenar el campo **"acudiente"** con un dato Numerico
- en caso contrario recibiras ***excepciones***


## Listar citas rechazadas 

```txt
GET => /fechaCitas/:año/:mes => citas
```

### Descripcion de la consulta 
```txt
- Mostrar todas las citas que fueron rechazadas y en un mes específico, mostrar la fecha de la cita, el nombre del usuario y el médico.
```

- deberas mandar el año y el mes de la siguiente manera
```txt
/fechaCitas/23/08 || /fechaCitas/22/01
```
- el año y mes son de tu preferencia
- Si la cita no esta registrada no recibiras informacion