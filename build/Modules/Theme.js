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
exports.saveThemeForTheDay = exports.fetchThemeOfTheDay = void 0;
const GPT_1 = require("../gpt/GPT");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const gptClient = new GPT_1.GPTClient();
/**
 * Fetches the theme of the day for Would You Rather content.
 * @returns {Promise<string>} A Promise that resolves with the fetched theme.
 */
function fetchThemeOfTheDay() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const themes = yield prisma.video.findMany();
            if (themes.length === 0) {
                const response = yield gptClient.message([
                    {
                        role: "user",
                        content: "Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'",
                    },
                ]);
                return JSON.stringify(response.message);
            }
            else if (themes.length > 0) {
                const themeList = themes.map(theme => theme.TakenThemes).join(', ');
                const response = yield gptClient.message([
                    {
                        role: "user",
                        content: `Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'. To add on, here is a list of themes I do not want you to have: ${themeList}.`,
                    },
                ]);
                return JSON.stringify(response.message);
            }
            return "None";
        }
        catch (error) {
            console.error("Error in fetchThemeOfTheDay:", error);
            throw error;
        }
    });
}
exports.fetchThemeOfTheDay = fetchThemeOfTheDay;
/**
 * Saves the provided theme of the day along with its associated sentences.
 * @param {string} takenTheme - The theme of the day to save.
 * @param {string[]} takenSentences - The sentences associated with the theme.
 * @returns {Promise<void>} A Promise that resolves after saving the theme.
 */
function saveThemeForTheDay(takenTheme, takenSentences) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingData = yield prisma.video.findMany({
                where: {
                    TakenThemes: takenTheme,
                },
            });
            if (existingData.length === 0) {
                yield prisma.video.create({
                    data: {
                        TakenThemes: takenTheme,
                        TakenSentences: takenSentences,
                    },
                });
            }
        }
        catch (error) {
            console.error("Error in saveThemeForTheDay:", error);
            throw error;
        }
    });
}
exports.saveThemeForTheDay = saveThemeForTheDay;
