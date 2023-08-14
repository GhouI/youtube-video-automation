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
exports.SetupFunc = void 0;
const Variables_1 = require("../Misc/Variables");
const canvas_1 = require("canvas");
function SetupFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        if (Variables_1.Setup.hasSetupRan == true) {
            return;
        }
        Variables_1.Setup.setSetup();
        //Register the font.
        (0, canvas_1.registerFont)("../../font/overmch.tff", {
            family: "overmch"
        });
        console.log("Setup has been completed.");
    });
}
exports.SetupFunc = SetupFunc;
