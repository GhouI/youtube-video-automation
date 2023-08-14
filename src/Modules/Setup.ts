import { Setup } from "../Misc/Variables";
import { registerFont } from "canvas";
export async function SetupFunc(){
    if(Setup.hasSetupRan == true){
        return; 
    }
    Setup.setSetup();
    //Register the font.
    registerFont("../../font/overmch.tff", {
        family: "overmch"
    })

    console.log("Setup has been completed.")
}