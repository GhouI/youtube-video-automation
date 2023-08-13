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
const GPT_1 = require("./gpt/GPT");
const prompt_1 = __importDefault(require("./Misc/prompt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
//Variables
const QuestionsAndAnswers = new Map;
const ImageTemplatePath = "./images/input/template.png";
const ImagesOutputPath = "./images/output/";
// Load environment variables from .env file
(0, dotenv_1.config)();
// Function to fetch questions from the GPT client
function getQuestionsFromClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new GPT_1.GPTClient();
        // Send prompt to the GPT client
        const sendMessage = yield client.message([
            {
                role: "system",
                content: prompt_1.default,
            },
            {
                role: "user",
                content: "theme: Random output: 7 ForbiddenThemes: null",
            }
        ]);
        const theListOfQuestions = JSON.parse(sendMessage.message);
        // Store questions and their fake results in QuestionsAndAnswers map
        Object.values(theListOfQuestions).forEach(question => {
            QuestionsAndAnswers.set(question.question, question.fake_results);
        });
        console.log("Compiled the questions and answers.");
    });
}
function createImages() {
    return __awaiter(this, void 0, void 0, function* () {
        if (QuestionsAndAnswers.size === 0) {
            console.error("No questions or answers found.");
            return { message: "No questions or answers found." };
        }
        const templateImagePath = "./images/input/template.png";
        if (!fs_1.default.existsSync(templateImagePath)) {
            console.error("Template image not found.");
            return { message: "Template image not found." };
        }
        let count = 0;
        for (const [question, result] of QuestionsAndAnswers.entries()) {
            count++;
            yield (0, canvas_1.loadImage)(templateImagePath).then((image) => {
                const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                const fontSize = 42;
                const maxTextWidth = image.width - 80; // Maximum width for the text
                const questionText = question.toString();
                context.fillStyle = "white";
                const splitIndex = questionText.indexOf("|");
                let firstpart = "hello";
                let secondpart = "test";
                if (splitIndex !== -1) {
                    firstpart = questionText.substring(0, splitIndex).trim();
                    secondpart = questionText.substring(splitIndex + 1).trim();
                }
                const textwidthfirstpart = context.measureText(firstpart).width;
                if (textwidthfirstpart > maxTextWidth) {
                    context.font = `${fontSize * (maxTextWidth / textwidthfirstpart)}px overmch`;
                }
                else {
                    context.font = `${fontSize}px overmch`;
                }
                const textX = (image.width - context.measureText(firstpart).width) / 2;
                const textY = 150;
                context.fillText(firstpart, textX, textY);
                const textwidthsecondpart = context.measureText(secondpart).width;
                if (textwidthsecondpart > maxTextWidth) {
                    context.font = `${fontSize * (maxTextWidth / textwidthsecondpart)}px overmch`;
                }
                else {
                    context.font = `${fontSize}px overmch`;
                }
                const secondTextX = (image.width - context.measureText(secondpart).width) / 2;
                const secondTextY = image.height - 100;
                context.fillText(secondpart, secondTextX, secondTextY);
                const outputPath = `${ImagesOutputPath}${count}a.png`;
                const stream = fs_1.default.createWriteStream(outputPath);
                const streamPNG = canvas.createPNGStream();
                streamPNG.pipe(stream);
            });
            yield (0, canvas_1.loadImage)(templateImagePath).then((image) => {
                const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                const fontSize = 42;
                const maxTextWidth = image.width - 80; // Maximum width for the text
                const questionText = question.toString();
                context.fillStyle = "white";
                const splitIndex = questionText.indexOf("|");
                let firstpart = "hello";
                let secondpart = "test";
                if (splitIndex !== -1) {
                    firstpart = questionText.substring(0, splitIndex).trim();
                    secondpart = questionText.substring(splitIndex + 1).trim();
                }
                const textwidthfirstpart = context.measureText(firstpart).width;
                if (textwidthfirstpart > maxTextWidth) {
                    context.font = `${fontSize * (maxTextWidth / textwidthfirstpart)}px overmch`;
                }
                else {
                    context.font = `${fontSize}px overmch`;
                }
                const textX = (image.width - context.measureText(firstpart).width) / 2;
                const textY = 150;
                context.fillText(firstpart, textX, textY);
                const textwidthsecondpart = context.measureText(secondpart).width;
                if (textwidthsecondpart > maxTextWidth) {
                    context.font = `${fontSize * (maxTextWidth / textwidthsecondpart)}px overmch`;
                }
                else {
                    context.font = `${fontSize}px overmch`;
                }
                const secondTextX = (image.width - context.measureText(secondpart).width) / 2;
                const secondTextY = image.height - 100;
                context.fillText(secondpart, secondTextX, secondTextY);
                const FakeResultOption1 = JSON.stringify(result.option1) + "%";
                const FakeResultOption2 = JSON.stringify(result.option2) + "%";
                context.font = `${100}px overmch`;
                context.fillText(FakeResultOption1, 480, 540);
                context.fillText(FakeResultOption2, 480, 1400);
                const outputPath = `${ImagesOutputPath}${count}b.png`;
                const stream = fs_1.default.createWriteStream(outputPath);
                const streamPNG = canvas.createPNGStream();
                streamPNG.pipe(stream);
            });
        }
        console.log("Compiled all Images in output folder");
    });
}
// Main execution flow
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, canvas_1.registerFont)("./font/overmch.ttf", {
            family: "overmch"
        });
        const autodelete = yield fs_1.default.readdirSync("./images/output").forEach(file => {
            const currentFilePath = path_1.default.join("./images/output", file);
            if (fs_1.default.lstatSync(currentFilePath).isDirectory()) {
                fs_1.default.unlinkSync(currentFilePath);
            }
        });
        try {
            yield getQuestionsFromClient();
            yield createImages();
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
// Start the main execution
main();