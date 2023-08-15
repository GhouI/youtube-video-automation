"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Modules_1 = require("./Modules");
const path_1 = __importDefault(require("path"));
const Variables_1 = require("./Misc/Variables");
// Load environment variables from .env file
(0, dotenv_1.config)();
/**
 * Main execution flow of the program.
 * @returns {Promise<void>} A Promise that resolves after the main execution.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Setting up configuration
            yield (0, Modules_1.Setup)();
            // Get the current date
            const currentDate = yield (0, Modules_1.getCurrentDate)();
            // Create and check the date folder
            yield (0, Modules_1.createAndCheckDateFolder)();
            // Fetch and compile theme and questions
            const theme = yield (0, Modules_1.fetchThemeOfTheDay)();
            yield (0, Modules_1.fetchAndCompileQuestions)(theme);
            // Create images and paths
            const imagesFolderPath = path_1.default.join(__dirname, "..", 'videos', currentDate, 'images');
            const videoFolderPath = path_1.default.join(__dirname, "..", 'videos', currentDate, 'video');
            console.log(videoFolderPath);
            yield (0, Modules_1.CreateImages)("./images/input/template.png", imagesFolderPath);
            yield (0, Modules_1.CreateImagePaths)(imagesFolderPath);
            yield (0, Modules_1.saveThemeForTheDay)(theme, Array.from(Variables_1.QuestionsAndAnswers.keys()));
            yield (0, Modules_1.CreateVideoFomImages)(`${videoFolderPath}/video_x2.mp4`);
            console.log("Main execution completed.");
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
// Start the main execution
main();
