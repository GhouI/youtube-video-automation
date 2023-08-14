import { GPTClient } from "../gpt/GPT";
import prompt from "../Misc/prompt";
import { ListOfQuestions  } from "../Misc/Interfaces";
import { QuestionsAndAnswers } from "../Misc/Variables";
// Function to fetch questions from the GPT client
export async function getQuestionsFromClient() {
    console.log("Getting the questions from GPT.")
    const client = new GPTClient();

    // Send prompt to the GPT client
    const sendMessage = await client.message([
        {
            role: "system",
            content: prompt,
        },
        {
            role: "user",
            content: "theme: Random output: 7 ForbiddenThemes: null",
        }
    ]);

    const theListOfQuestions: ListOfQuestions = JSON.parse(sendMessage.message);

    // Store questions and their fake results in QuestionsAndAnswers map
    Object.values(theListOfQuestions).forEach(question => {
        QuestionsAndAnswers.set(question.question, question.fake_results);
    });
    console.log("Compiled the questions and answers.")
}