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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Variables_1 = require("../Misc/Variables");
/**
 * Deletes temporary files from the output directory if TempAutoDelete is enabled.
 * @returns {Promise<void>} A Promise that resolves after deleting temporary files.
 */
function TemporaryAutoDelete() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Variables_1.TempAutoDelete === false) {
                return;
            }
            const outputDirectory = "./images/output";
            const filesInDirectory = fs_1.default.readdirSync(outputDirectory);
            filesInDirectory.forEach(file => {
                const currentFilePath = path_1.default.join(outputDirectory, file);
                if (fs_1.default.lstatSync(currentFilePath).isFile()) {
                    fs_1.default.unlinkSync(currentFilePath);
                }
            });
            console.log("Temporary files have been deleted.");
        }
        catch (error) {
            console.error("Error during temporary auto-delete:", error);
            throw error;
        }
    });
}
exports.default = TemporaryAutoDelete;
