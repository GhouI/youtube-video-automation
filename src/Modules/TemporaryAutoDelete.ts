import path from "path";
import fs from "fs";
import { TempAutoDelete } from "../Misc/Variables";

/**
 * Deletes temporary files from the output directory if TempAutoDelete is enabled.
 * @returns {Promise<void>} A Promise that resolves after deleting temporary files.
 */
export default async function TemporaryAutoDelete(): Promise<void> {
    try {
        if (TempAutoDelete === false) {
            return;
        }

        const outputDirectory = "./images/output";

        const filesInDirectory = fs.readdirSync(outputDirectory);

        filesInDirectory.forEach(file => {
            const currentFilePath = path.join(outputDirectory, file);
            if (fs.lstatSync(currentFilePath).isFile()) {
                fs.unlinkSync(currentFilePath);
            }
        });

        console.log("Temporary files have been deleted.");
    } catch (error) {
        console.error("Error during temporary auto-delete:", error);
        throw error;
    }
}
