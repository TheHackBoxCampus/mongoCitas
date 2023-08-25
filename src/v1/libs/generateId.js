import { customAlphabet } from "nanoid";

const generate = () => {
    let gid = customAlphabet("123456789", 4);
    let id = gid(); 
    return id; 
}

export { generate }