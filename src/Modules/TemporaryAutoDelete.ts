import path from "path"
import fs from "fs"
import { TempAutoDelete } from "../Misc/Variables"

export async function TemporaryAutoDelete (){
    if(TempAutoDelete == false){
        return;
    }
    await fs.readdirSync("./images/output").forEach(file =>{
        const currentFilePath = path.join("./images/output", file)
        if(fs.lstatSync(currentFilePath).isDirectory()){
            fs.unlinkSync(currentFilePath)
        }
    })
}