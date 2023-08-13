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
exports.GPTClient = void 0;
const openai_1 = require("openai");
class GPTClient {
    constructor() {
        this.client = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_KEY
        });
    }
    message(prompts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!prompts || !prompts.length) {
                    return {
                        message: "No prompts were given"
                    };
                }
                const responsesFromApi = yield this.client.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: prompts,
                });
                if (!responsesFromApi || !responsesFromApi.choices) {
                    return { message: "No responses were given from the API" };
                }
                return {
                    message: ((_a = responsesFromApi.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "none"
                };
            }
            catch (error) {
                console.error("Error:", error);
                throw error; // Re-throw the error for handling in the calling code
            }
        });
    }
}
exports.GPTClient = GPTClient;
