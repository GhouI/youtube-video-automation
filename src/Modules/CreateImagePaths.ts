import { ImagesPath } from "../Misc/Variables";
import fs from "fs";
import path from "path";

/**
 * Converts images in a given output path to file paths and populates the ImagesPath array.
 * @param {string} ImagesOutputPath - The path where the images are stored.
 * @returns {Promise<void>} A Promise that resolves after converting and populating the array.
 */
export default async function convertImagesToPaths(ImagesOutputPath: string): Promise<void> {
    console.log("Converting the images to paths.");
    try {
        const directory = fs.readdirSync(ImagesOutputPath);
        
        if (directory.length > 0) {
            console.log("Directory has been found.");
            
            directory.forEach(file => {
                const filePath = path.join(ImagesOutputPath, file)
                    .replace(/\\/g, '/')
                    .replace(/^\.\//, '');
                ImagesPath.push(filePath);
            });
        } else {
            console.log("Directory is empty.");
        }
    } catch (error) {
        console.error("Error reading directory:", error);
        throw error;
    }
    console.log("Compiled the images to paths.");
}
