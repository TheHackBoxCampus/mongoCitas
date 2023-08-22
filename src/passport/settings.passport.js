import passport from "passport";
import { Strategy as Bearer} from "passport-http-bearer";
import jwt from "jsonwebtoken"
import enviroments from "../env/env.js"

passport.use(new Bearer(
   function(token, done){
    return jwt.verify(token, enviroments.KEY, {algorithms: "HS256"}, (err, decoded) => {
        err ? done(err) : done(false, decoded, {scope: "*"})
    })
   }   
))

export default passport; 