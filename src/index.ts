import { config } from "dotenv";
import prompt from "./Misc/prompt";
import { ListOfQuestions, FakeResults } from "./Misc/Interfaces";
import fs from "fs";
import path from "path";
import util from "util";
import ffmpeg from "fluent-ffmpeg";
import { createCanvas, loadImage, registerFont } from "canvas";
import { exec } from "child_process";
import { getThemeOfTheDay } from "./Modules/getThemeOfTheDay";

//Variables

 const QuestionsAndAnswers : Map<String, FakeResults> = new Map<String, FakeResults>
 const ImageTemplatePath : string = "./images/input/template.png"
 const ImagesOutputPath : string  = "./images/output/"
 const outputVideoPath : string  = "./videos/"
 const ImagesPath : string[] = [];


// Load environment variables from .env file
config();

// Main execution flow
async function main() {
   const a =  await getThemeOfTheDay()
   console.log(a)
    try {
        /*
        await getQuestionsFromClient();
        await createImages();
        await convertImagesToPaths();
        await convertImagesToVideo();
        */
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Start the main execution
main();
