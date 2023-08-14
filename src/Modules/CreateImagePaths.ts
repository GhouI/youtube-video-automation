import { ImagesPath } from "../Misc/Variables";
import fs from "fs" 
import path from "path"
export async function convertImagesToPaths(ImagesOutputPath : string) {
    console.log("converting the images to paths.")
    try {
        const directory = fs.readdirSync(ImagesOutputPath);
        
        if (directory.length > 0) {
            console.log("Directory has been found");
            
            directory.forEach(file => {
                const filePath = path.join(ImagesOutputPath, file)
                .replace(/\\/g, '/')
                .replace(/^\.\//, '')
                ;
                ImagesPath.push(filePath);
            });
        } else {
            console.log("Directory is empty.");
        }
    } catch (error) {
        console.error("Error reading directory:", error);
    }
    console.log("Compiled the images to paths.")
}