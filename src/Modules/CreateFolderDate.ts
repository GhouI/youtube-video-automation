import fs from 'fs';
import path from 'path';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-padded month
const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-padded day

const currentDateFormatted = `${year}-${month}-${day}`;

/**
 * Creates a folder with today's date and checks if it already exists.
 * @returns {Promise<void>} A Promise that resolves after creating or checking the folder.
 */
export async function createAndCheckDateFolder(): Promise<void> {
    try {
        const folderPath = path.join(__dirname, '..', '..', 'videos', currentDateFormatted);
        console.log(folderPath)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folder '${currentDateFormatted}' created.`);
            const imagesFolder = path.join(folderPath, "images")
            const videoFolder = path.join(folderPath, "video")
            fs.mkdirSync(videoFolder)
            fs.mkdirSync(imagesFolder)
            console.log(`'images' folder created within '${currentDateFormatted}' folder.`);
        } else {
            console.log(`Folder '${currentDateFormatted}' already exists.`);
        }
    } catch (error) {
        console.error("Error creating or checking the folder:", error);
        throw error;
    }
}

/**
 * Returns the path of the folder with today's date.
 * @returns {Promise<string>} A Promise that resolves with the folder path.
 */
export async function getDateFolder(): Promise<string> {
    return path.join(__dirname, 'videos', currentDateFormatted);
}

/**
 * Returns today's date in the "YYYY-MM-DD" format.
 * @returns {Promise<string>} A Promise that resolves with the formatted date.
 */
export async function getCurrentDate(): Promise<string> {
    return currentDateFormatted;
}
