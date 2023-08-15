import { GPTClient } from "../gpt/GPT";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const gptClient = new GPTClient();

/**
 * Fetches the theme of the day for Would You Rather content.
 * @returns {Promise<string>} A Promise that resolves with the fetched theme.
 */
async function fetchThemeOfTheDay(): Promise<string> {
    try {
        const themes = await prisma.video.findMany();

        if (themes.length === 0) {
            const response = await gptClient.message([
                {
                    role: "user",
                    content: "Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'",
                },
            ]);
            return JSON.stringify(response.message);
        } else if (themes.length > 0) {
            const themeList = themes.map(theme => theme.TakenThemes).join(', ');
            const response = await gptClient.message([
                {
                    role: "user", 
                    content: `Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'. To add on, here is a list of themes I do not want you to have: ${themeList}.`,
                },
            ]);

            return JSON.stringify(response.message);
        }
        
        return "None";
    } catch (error) {
        console.error("Error in fetchThemeOfTheDay:", error);
        throw error;
    }
}

/**
 * Saves the provided theme of the day along with its associated sentences.
 * @param {string} takenTheme - The theme of the day to save.
 * @param {string[]} takenSentences - The sentences associated with the theme.
 * @returns {Promise<void>} A Promise that resolves after saving the theme.
 */
async function saveThemeForTheDay(takenTheme: string, takenSentences: string[]): Promise<void> {
    try {
        const existingData = await prisma.video.findMany({
            where: {
                TakenThemes: takenTheme,
            },
        });

        if (existingData.length === 0) {
            await prisma.video.create({
                data: {
                    TakenThemes: takenTheme,
                    TakenSentences: takenSentences,
                },
            });
        }
    } catch (error) {
        console.error("Error in saveThemeForTheDay:", error);
        throw error;
    }
}

export { fetchThemeOfTheDay, saveThemeForTheDay };
