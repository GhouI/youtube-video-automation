import { FakeResults } from "./Interfaces"
export const QuestionsAndAnswers : Map<String, FakeResults> = new Map<String, FakeResults>
export const ImageTemplatePath = "../images/input/template.png"
export const ImagesOutputPath = "../images/output/"
export const ImagesPath : string[] = [];
export const TempAutoDelete : boolean = false;
export let Setup = {
    hasSetupRan : false, 
    setSetup(){
        this.hasSetupRan = true;
    }
}
