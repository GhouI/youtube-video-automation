"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentVideoPath = exports.Setup = exports.TempAutoDelete = exports.ImagesPath = exports.ImagesOutputPath = exports.ImageTemplatePath = exports.QuestionsAndAnswers = void 0;
// A map to store questions and their associated fake results
exports.QuestionsAndAnswers = new Map();
// Path to the image template
exports.ImageTemplatePath = "../images/input/template.png";
// Path where images are output
exports.ImagesOutputPath = "../images/output/";
// Array to store paths of images
exports.ImagesPath = [];
// Temporary auto-delete flag
exports.TempAutoDelete = false;
// Setup object to manage setup state
exports.Setup = {
    hasSetupRun: false,
    // Function to set the setup state
    setSetup() {
        this.hasSetupRun = true;
    },
};
exports.CurrentVideoPath = [];
