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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Converts images in a given output path to file paths and populates the ImagesPath array.
 * @param {string} ImagesOutputPath - The path where the images are stored.
 * @returns {Promise<void>} A Promise that resolves after converting and populating the array.
 */
function convertImagesToPaths(ImagesOutputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Converting the images to paths.");
        try {
            const directory = fs_1.default.readdirSync(ImagesOutputPath);
            if (directory.length > 0) {
                console.log("Directory has been found.");
                directory.forEach(file => {
                    const filePath = path_1.default.join(ImagesOutputPath, file)
                        .replace(/\\/g, '/')
                        .replace(/^\.\//, '');
                    Variables_1.ImagesPath.push(filePath);
                });
            }
            else {
                console.log("Directory is empty.");
            }
        }
        catch (error) {
            console.error("Error reading directory:", error);
            throw error;
        }
        console.log("Compiled the images to paths.");
    });
}
exports.default = convertImagesToPaths;
