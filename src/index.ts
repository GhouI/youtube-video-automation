import { config } from "dotenv";
import { GPTClient } from "./gpt/GPT";
import prompt from "./Misc/prompt";
import { ListOfQuestions, FakeResults } from "./Misc/Interfaces";
import fs from "fs"
import path from "path"
import { createCanvas, loadImage, registerFont } from "canvas";

//Variables

 const QuestionsAndAnswers : Map<String, FakeResults> = new Map<String, FakeResults>
 const ImageTemplatePath = "./images/input/template.png"
 const ImagesOutputPath = "./images/output/"

// Load environment variables from .env file
config();

// Function to fetch questions from the GPT client
async function getQuestionsFromClient() {
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

async function createImages() {
    if (QuestionsAndAnswers.size === 0) {
        console.error("No questions or answers found.");
        return { message: "No questions or answers found." };
    }

    const templateImagePath = "./images/input/template.png";
    if (!fs.existsSync(templateImagePath)) {
        console.error("Template image not found.");
        return { message: "Template image not found." };
    }

    let count = 0;
    for (const [question, result] of QuestionsAndAnswers.entries()) {
        count++;
        await loadImage(templateImagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
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

            const textwidthfirstpart = context.measureText(firstpart).width
            if (textwidthfirstpart > maxTextWidth) {
                context.font = `${fontSize * (maxTextWidth / textwidthfirstpart)}px overmch`;
            } else {
                context.font = `${fontSize}px overmch`;
            }
            const textX = (image.width - context.measureText(firstpart).width) / 2;
            const textY = 150;

            context.fillText(firstpart, textX, textY);
            const textwidthsecondpart = context.measureText(secondpart).width
            if (textwidthsecondpart > maxTextWidth) {
                context.font = `${fontSize * (maxTextWidth / textwidthsecondpart)}px overmch`;
            } else {
                context.font = `${fontSize}px overmch`;
            }
            const secondTextX = (image.width - context.measureText(secondpart).width) / 2;
            const secondTextY = image.height - 100;

            context.fillText(secondpart, secondTextX, secondTextY);

            const outputPath = `${ImagesOutputPath}${count}a.png`;
            const stream = fs.createWriteStream(outputPath);
            const streamPNG = canvas.createPNGStream();
            streamPNG.pipe(stream);
        });
        await loadImage(templateImagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
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

            const textwidthfirstpart = context.measureText(firstpart).width
            if (textwidthfirstpart > maxTextWidth) {
                context.font = `${fontSize * (maxTextWidth / textwidthfirstpart)}px overmch`;
            } else {
                context.font = `${fontSize}px overmch`;
            }
            const textX = (image.width - context.measureText(firstpart).width) / 2;
            const textY = 150;

            context.fillText(firstpart, textX, textY);
            const textwidthsecondpart = context.measureText(secondpart).width
            if (textwidthsecondpart > maxTextWidth) {
                context.font = `${fontSize * (maxTextWidth / textwidthsecondpart)}px overmch`;
            } else {
                context.font = `${fontSize}px overmch`;
            }
            const secondTextX = (image.width - context.measureText(secondpart).width) / 2;
            const secondTextY = image.height - 100;

            context.fillText(secondpart, secondTextX, secondTextY);

            const FakeResultOption1 : string = JSON.stringify(result.option1) + "%"
            const FakeResultOption2 : string = JSON.stringify(result.option2) + "%"
            context.font = `${100}px overmch`
            context.fillText(FakeResultOption1, 480, 540)
            context.fillText(FakeResultOption2, 480, 1400)
            
            const outputPath = `${ImagesOutputPath}${count}b.png`;
            const stream = fs.createWriteStream(outputPath);
            const streamPNG = canvas.createPNGStream();
            streamPNG.pipe(stream);
        });
    }

    console.log("Compiled all Images in output folder")
}


// Main execution flow
async function main() {
    registerFont("./font/overmch.ttf",{
        family: "overmch"
    })
    const autodelete = await fs.readdirSync("./images/output").forEach(file =>{
        const currentFilePath = path.join("./images/output", file)
        if(fs.lstatSync(currentFilePath).isDirectory()){
            fs.unlinkSync(currentFilePath)
        }
    })
    try {
        await getQuestionsFromClient();
        await createImages();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Start the main execution
main();
