import { GPTClient } from "../gpt/GPT";
import prompt from "../Misc/prompt";
import { ListOfQuestions, FakeResults } from "../Misc/Interfaces";
import { QuestionsAndAnswers } from "../Misc/Variables";
import { PrismaClient } from "@prisma/client";
/**
 * Fetches questions from the GPT client and compiles them with fake results.
 * @param {string} ForbiddenThemes - A string containing forbidden themes.
 * @returns {Promise<void>} A Promise that resolves after fetching and compiling the questions.
 */
export default async function fetchAndCompileQuestions(ThemeOfTheDay : string): Promise<void> {
    try {
        console.log("Getting the questions from GPT.");
        const client = new GPTClient();
        const PClient = new PrismaClient() 
        // Send prompt to the GPT client
        const sendMessage = await client.message([
            {
                role: "system",
                content: prompt,
            },
            {
                role: "user",
                content: `theme: ${ThemeOfTheDay} output: 5 `,
            },
        ]);

        const theListOfQuestions: ListOfQuestions = JSON.parse(sendMessage.message);

        // Store questions and their fake results in QuestionsAndAnswers map
        Object.values(theListOfQuestions).forEach(question => {
            const fakeResults: FakeResults = {
                option1: question.fake_results.option1,
                option2: question.fake_results.option2,
            };
            QuestionsAndAnswers.set(question.question, fakeResults);
        });

        console.log("Compiled the questions and answers.");
    } catch (error) {
        console.error("Error fetching and compiling questions:", error);
        throw error;
    }
}
