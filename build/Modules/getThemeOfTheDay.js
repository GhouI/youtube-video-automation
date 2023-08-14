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
exports.getThemeOfTheDay = void 0;
const GPT_1 = require("../gpt/GPT");
const client_1 = require("@prisma/client");
function getThemeOfTheDay() {
    return __awaiter(this, void 0, void 0, function* () {
        const GPT = new GPT_1.GPTClient();
        const client = new client_1.PrismaClient();
        client.$connect();
        const theme = client.video.findMany();
        if ((yield theme).length == 0) {
            const getFirstTheme = GPT.message([{
                    role: "user",
                    content: "Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'"
                }]);
            return JSON.stringify((yield getFirstTheme).message);
        }
    });
}
exports.getThemeOfTheDay = getThemeOfTheDay;
