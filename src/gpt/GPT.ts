import {OpenAI} from "openai"
import { Completion, Completions, CompletionCreateParamsNonStreaming } from "openai/resources";
export class GPTClient {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_KEY
        });
    }
    
    async message(prompts: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[]): Promise<{ message: string }> {
        try {
            if (!prompts || !prompts.length) {
                return {
                    message: "No prompts were given"
                };
            }        
            const responsesFromApi = await this.client.chat.completions.create({
               model: "gpt-3.5-turbo",
               messages: prompts, 

            })
            if (!responsesFromApi || !responsesFromApi.choices) {
                return { message: "No responses were given from the API" };
            }
            return {
                message: responsesFromApi.choices[0].message?.content || "none"
            };
        } catch (error) {
            console.error("Error:", error);
            throw error; // Re-throw the error for handling in the calling code
        }
    }
}
