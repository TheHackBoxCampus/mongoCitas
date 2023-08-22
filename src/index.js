import app from "./app.js";
import enviroments from "./v1/env/env.js";

const start = () => {
    try {
        let server = JSON.parse(enviroments.SERVER)
        app.listen(server, () => console.log(`http://${server.hostname}:${server.port}`)); 
    }catch(err) {
        console.log(err)
    }
}

start(); 