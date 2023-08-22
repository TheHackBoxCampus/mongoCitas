import { MongoClient } from "mongodb";
import enviroments from "../env/env.js";

const conx = async () => {
    try {   
        let credentials = JSON.parse(enviroments.USER_DB); 
        const uri = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.zexrrod.mongodb.net/${credentials.database}`;
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        let client = await MongoClient.connect(uri, options); 
        console.log("connect -> success")        
        return client.db(); 
    }catch(err) {
        console.log(err)
    }
}

export default conx; 