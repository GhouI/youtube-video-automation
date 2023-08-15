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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Variables_1 = require("../Misc/Variables");
const canvas_1 = require("canvas");
const path_1 = __importDefault(require("path"));
/**
 * Performs the initial setup for the application.
 * If the setup has already run, it will be skipped.
 * @returns {Promise<void>} A Promise that resolves after completing the setup.
 */
function SetupFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Variables_1.Setup.hasSetupRun === true) {
                return;
            }
            Variables_1.Setup.setSetup();
            // Register the font
            (0, canvas_1.registerFont)(`${path_1.default.join(__dirname, '..', '..', 'font')}/overmch.ttf`, {
                family: "overmch",
            });
            console.log("Setup has been completed.");
        }
        catch (error) {
            console.error("Error during setup:", error);
            throw error;
        }
    });
}
exports.default = SetupFunc;
