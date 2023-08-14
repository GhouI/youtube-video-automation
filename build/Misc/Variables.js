"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = exports.TempAutoDelete = exports.ImagesPath = exports.ImagesOutputPath = exports.ImageTemplatePath = exports.QuestionsAndAnswers = void 0;
exports.QuestionsAndAnswers = new Map;
exports.ImageTemplatePath = "../images/input/template.png";
exports.ImagesOutputPath = "../images/output/";
exports.ImagesPath = [];
exports.TempAutoDelete = false;
exports.Setup = {
    hasSetupRan: false,
    setSetup() {
        this.hasSetupRan = true;
    }
};
