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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const getThemeOfTheDay_1 = require("./Modules/getThemeOfTheDay");
//Variables
const QuestionsAndAnswers = new Map;
const ImageTemplatePath = "./images/input/template.png";
const ImagesOutputPath = "./images/output/";
const outputVideoPath = "./videos/";
const ImagesPath = [];
// Load environment variables from .env file
(0, dotenv_1.config)();
// Main execution flow
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield (0, getThemeOfTheDay_1.getThemeOfTheDay)();
        console.log(a);
        try {
            /*
            await getQuestionsFromClient();
            await createImages();
            await convertImagesToPaths();
            await convertImagesToVideo();
            */
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
// Start the main execution
main();
