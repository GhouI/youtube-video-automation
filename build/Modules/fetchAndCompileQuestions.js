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
const GPT_1 = require("../gpt/GPT");
const prompt_1 = __importDefault(require("../Misc/prompt"));
const Variables_1 = require("../Misc/Variables");
/**
 * Fetches questions from the GPT client and compiles them with fake results.
 * @param {string} ForbiddenThemes - A string containing forbidden themes.
 * @returns {Promise<void>} A Promise that resolves after fetching and compiling the questions.
 */
function fetchAndCompileQuestions(ForbiddenThemes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Getting the questions from GPT.");
            const client = new GPT_1.GPTClient();
            // Send prompt to the GPT client
            const sendMessage = yield client.message([
                {
                    role: "system",
                    content: prompt_1.default,
                },
                {
                    role: "user",
                    content: `theme: Random output: 7 ForbiddenThemes: ${ForbiddenThemes}`,
                },
            ]);
            const theListOfQuestions = JSON.parse(sendMessage.message);
            // Store questions and their fake results in QuestionsAndAnswers map
            Object.values(theListOfQuestions).forEach(question => {
                const fakeResults = {
                    option1: question.fake_results.option1,
                    option2: question.fake_results.option2,
                };
                Variables_1.QuestionsAndAnswers.set(question.question, fakeResults);
            });
            console.log("Compiled the questions and answers.");
        }
        catch (error) {
            console.error("Error fetching and compiling questions:", error);
            throw error;
        }
    });
}
exports.default = fetchAndCompileQuestions;
