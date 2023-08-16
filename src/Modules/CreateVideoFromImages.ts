import Ffmpeg from "fluent-ffmpeg";
import { CurrentVideoPath, ImagesPath } from "../Misc/Variables";
import fs from 'fs';

/**
 * Creates a looping slideshow video with custom delay pattern between images.
 * @param {string} VideoOutputPath - The path to save the output video.
 */
export default async function CreateCustomSlideshowVideo(VideoOutputPath: string) {
    const delayPattern = [7000, 3000, 7000]; // Custom delay pattern in milliseconds
    let currentIndex = 0; // Index to keep track of the current delay
    let totalDuration = 0; // Total duration of all input images

    const ff = Ffmpeg();

    // Create a temporary image list file containing the list of images
    const imageListFile = 'image_list.txt';
    const imageListContents = ImagesPath.map(imagePath => {
        const delay = delayPattern[currentIndex];
        currentIndex = (currentIndex + 1) % delayPattern.length; // Move to the next delay in the pattern
        totalDuration += delay / 1000; // Convert delay to seconds
        return `file '${imagePath}'\nduration ${delay / 1000}`; // Convert delay to seconds
    }).join('\n');
    fs.writeFileSync(imageListFile, imageListContents);

    // Input the image list file and loop it infinitely
    ff.input(imageListFile).inputOptions('-f', 'concat', '-safe', '0');

    // Set output video format and options
    ff.output(VideoOutputPath).outputOptions('-c:v', 'libx264', '-pix_fmt', 'yuv420p');
    CurrentVideoPath.push(VideoOutputPath)
    // Run the ffmpeg command to create the video
    ff.run();

    // Listen for progress, completion, and error events
    ff.on('progress', (progress) => {
        const currentElapsed = progress.timemark ? parseFloat(progress.timemark) : 0;
        const overallProgress = (currentElapsed / totalDuration) * 100;
        console.log(`Processing: ${Math.floor(progress.percent)}%`);
    }).on("end", () => {
        console.log("Video creation completed!");
        fs.unlinkSync(imageListFile); // Remove the temporary image list file
    }).on("error", (error) => {
        console.error("Error:", error);
    });
}
