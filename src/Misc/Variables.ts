import { FakeResults } from "./Interfaces";

// A map to store questions and their associated fake results
export const QuestionsAndAnswers: Map<string, FakeResults> = new Map<string, FakeResults>();

// Path to the image template
export const ImageTemplatePath = "../images/input/template.png";

// Path where images are output
export const ImagesOutputPath = "../images/output/";

// Array to store paths of images
export const ImagesPath: string[] = [];

// Temporary auto-delete flag
export const TempAutoDelete = false;

// Setup object to manage setup state
export const Setup = {
    hasSetupRun: false,

    // Function to set the setup state
    setSetup() {
        this.hasSetupRun = true;
    },
};
