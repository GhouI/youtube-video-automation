import { GPTClient } from "../gpt/GPT";
import { PrismaClient } from "@prisma/client";
export async function getThemeOfTheDay(){
    const GPT = new GPTClient()

    const client = new PrismaClient()
    client.$connect()
    
    const theme  = client.video.findMany()
    if((await theme).length == 0){
        const getFirstTheme = GPT.message([{
            role: "user",
            content: "Provide me a theme I can use for Would You Rather. This theme will be posted on Youtube so make it unique. Just list me One theme. Don't put the number at start. Follow this format. Example 'Random'"
        }])
        return JSON.stringify((await getFirstTheme).message)
    }
}


export async function saveThemeofTheDay(TakenTheme : string, TakenSentences : string[]){
    const prisma = new PrismaClient() 

    const FindData = await prisma.video.findMany({
        where : {
            TakenThemes: TakenTheme, 
        }
    })
    if(FindData.length == 0){
       const newData = await prisma.video.create({
            data : {
                TakenThemes: TakenTheme,
                TakenSentences : TakenSentences
            }
        })
    }

}