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
exports.getCurrentDate = exports.getDateFolder = exports.createAndCheckDateFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-padded month
const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-padded day
const currentDateFormatted = `${year}-${month}-${day}`;
/**
 * Creates a folder with today's date and checks if it already exists.
 * @returns {Promise<void>} A Promise that resolves after creating or checking the folder.
 */
function createAndCheckDateFolder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const folderPath = path_1.default.join(__dirname, '..', '..', 'videos', currentDateFormatted);
            console.log(folderPath);
            if (!fs_1.default.existsSync(folderPath)) {
                fs_1.default.mkdirSync(folderPath);
                console.log(`Folder '${currentDateFormatted}' created.`);
                const imagesFolder = path_1.default.join(folderPath, "images");
                const videoFolder = path_1.default.join(folderPath, "video");
                fs_1.default.mkdirSync(videoFolder);
                fs_1.default.mkdirSync(imagesFolder);
                console.log(`'images' folder created within '${currentDateFormatted}' folder.`);
            }
            else {
                console.log(`Folder '${currentDateFormatted}' already exists.`);
            }
        }
        catch (error) {
            console.error("Error creating or checking the folder:", error);
            throw error;
        }
    });
}
exports.createAndCheckDateFolder = createAndCheckDateFolder;
/**
 * Returns the path of the folder with today's date.
 * @returns {Promise<string>} A Promise that resolves with the folder path.
 */
function getDateFolder() {
    return __awaiter(this, void 0, void 0, function* () {
        return path_1.default.join(__dirname, 'videos', currentDateFormatted);
    });
}
exports.getDateFolder = getDateFolder;
/**
 * Returns today's date in the "YYYY-MM-DD" format.
 * @returns {Promise<string>} A Promise that resolves with the formatted date.
 */
function getCurrentDate() {
    return __awaiter(this, void 0, void 0, function* () {
        return currentDateFormatted;
    });
}
exports.getCurrentDate = getCurrentDate;
