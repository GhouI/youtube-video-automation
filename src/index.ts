import { config } from "dotenv";
import { fetchAndCompileQuestions, fetchThemeOfTheDay, CreateImagePaths, createAndCheckDateFolder, getCurrentDate, CreateImages, Setup, saveThemeForTheDay, CreateVideoFomImages } from "./Modules";
import path from "path";
import { QuestionsAndAnswers } from "./Misc/Variables";


// Load environment variables from .env file
config();

/**
 * Main execution flow of the program.
 * @returns {Promise<void>} A Promise that resolves after the main execution.
 */
async function main(): Promise<void> {
    try {
        //Setting up configuration
        await Setup();
        // Get the current date
        const currentDate = await getCurrentDate();

        // Create and check the date folder
        await createAndCheckDateFolder();

        // Fetch and compile theme and questions
        const theme = await fetchThemeOfTheDay();
        await fetchAndCompileQuestions(theme);

        // Create images and paths
        const imagesFolderPath = path.join(__dirname, "..",  'videos',  currentDate, 'images');
        const videoFolderPath = path.join(__dirname, "..",  'videos',  currentDate, 'video')
        console.log(videoFolderPath)
        await CreateImages("./images/input/template.png", imagesFolderPath);
        await CreateImagePaths(imagesFolderPath);
        await saveThemeForTheDay(theme, Array.from(QuestionsAndAnswers.keys()))
        await CreateVideoFomImages(`${videoFolderPath}/video_x2.mp4`,);
        console.log("Main execution completed.");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Start the main execution
main();
