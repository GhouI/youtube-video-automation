import { Setup } from "../Misc/Variables";
import { registerFont } from "canvas";
import path from "path"
/**
 * Performs the initial setup for the application.
 * If the setup has already run, it will be skipped.
 * @returns {Promise<void>} A Promise that resolves after completing the setup.
 */
export default async function SetupFunc(): Promise<void> {
    try {
        if (Setup.hasSetupRun === true) {
            return;
        }

        Setup.setSetup();

        // Register the font
        registerFont(`${path.join(__dirname, '..', '..', 'font')}/overmch.ttf`, {
            family: "overmch",
        });

        console.log("Setup has been completed.");
    } catch (error) {
        console.error("Error during setup:", error);
        throw error;
    }
}
