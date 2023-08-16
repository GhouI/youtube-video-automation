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
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const Variables_1 = require("../Misc/Variables");
const fs_1 = __importDefault(require("fs"));
/**
 * Creates a looping slideshow video with custom delay pattern between images.
 * @param {string} VideoOutputPath - The path to save the output video.
 */
function CreateCustomSlideshowVideo(VideoOutputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const delayPattern = [7000, 3000, 7000]; // Custom delay pattern in milliseconds
        let currentIndex = 0; // Index to keep track of the current delay
        let totalDuration = 0; // Total duration of all input images
        const ff = (0, fluent_ffmpeg_1.default)();
        // Create a temporary image list file containing the list of images
        const imageListFile = 'image_list.txt';
        const imageListContents = Variables_1.ImagesPath.map(imagePath => {
            const delay = delayPattern[currentIndex];
            currentIndex = (currentIndex + 1) % delayPattern.length; // Move to the next delay in the pattern
            totalDuration += delay / 1000; // Convert delay to seconds
            return `file '${imagePath}'\nduration ${delay / 1000}`; // Convert delay to seconds
        }).join('\n');
        fs_1.default.writeFileSync(imageListFile, imageListContents);
        // Input the image list file and loop it infinitely
        ff.input(imageListFile).inputOptions('-f', 'concat', '-safe', '0');
        // Set output video format and options
        ff.output(VideoOutputPath).outputOptions('-c:v', 'libx264', '-pix_fmt', 'yuv420p');
        Variables_1.CurrentVideoPath.push(VideoOutputPath);
        // Run the ffmpeg command to create the video
        ff.run();
        // Listen for progress, completion, and error events
        ff.on('progress', (progress) => {
            const currentElapsed = progress.timemark ? parseFloat(progress.timemark) : 0;
            const overallProgress = (currentElapsed / totalDuration) * 100;
            console.log(`Processing: ${Math.floor(progress.percent)}%`);
        }).on("end", () => {
            console.log("Video creation completed!");
            fs_1.default.unlinkSync(imageListFile); // Remove the temporary image list file
        }).on("error", (error) => {
            console.error("Error:", error);
        });
    });
}
exports.default = CreateCustomSlideshowVideo;
