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
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const path_1 = __importDefault(require("path"));
const Variables_1 = require("../Misc/Variables");
// Define the OAuth2 client class
const OAuth2 = googleapis_1.google.auth.OAuth2;
// Define the scopes and token paths
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_DIR = path_1.default.join(__dirname, "..", "..", "config");
const TOKEN_PATH = path_1.default.join(TOKEN_DIR, 'token.json'); // Corrected path
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSecret = credentials.installed.client_secret;
        const clientId = credentials.installed.client_id;
        const redirectUrl = credentials.installed.redirect_uris[0];
        const oauth2Client = new google_auth_library_1.OAuth2Client(clientId, clientSecret, redirectUrl);
        // Check if we have previously stored a token.
        try {
            const token = yield fs_1.default.promises.readFile(TOKEN_PATH, "utf-8");
            oauth2Client.setCredentials(JSON.parse(credentials));
            callback(oauth2Client);
        }
        catch (err) {
            yield getNewToken(oauth2Client, callback);
        }
    });
}
/**
 * Get and store a new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {OAuth2Client} oauth2Client The OAuth2 client to get a token for.
 * @param {function} callback The callback to call with the authorized client.
 */
function getNewToken(oauth2Client, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code) => __awaiter(this, void 0, void 0, function* () {
            rl.close();
            try {
                const token = yield oauth2Client.getToken(code);
                oauth2Client.credentials = token.tokens;
                yield storeToken(token.tokens);
                callback(oauth2Client);
            }
            catch (err) {
                console.log('Error while trying to retrieve access token', err);
            }
        }));
    });
}
/**
 * Upload a video.
 *
 * @param {OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} title Video title.
 * @param {string} description Video description.
 * @param {string[]} tags Video tags.
 */
function uploadVideo(auth, title, description, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = googleapis_1.google.youtube('v3');
        try {
            const response = yield service.videos.insert({
                auth: auth,
                part: ["snippet", "status"],
                requestBody: {
                    snippet: {
                        title,
                        description,
                        tags,
                        categoryId: "Entertainment",
                        defaultAudioLanguage: 'en',
                        defaultLanguage: 'en'
                    },
                    status: {
                        privacyStatus: "private",
                    },
                },
                media: {
                    body: fs_1.default.createReadStream(Variables_1.CurrentVideoPath[0])
                }
            });
            console.log("Video uploaded:", response.data);
            console.log('Thumbnail uploaded.');
        }
        catch (err) {
            console.error('Error uploading video:', err);
        }
    });
}
/**
 * Store a token to disk for later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.mkdir(TOKEN_DIR, { recursive: true }); // Create directory recursively if needed
            yield fs_1.default.promises.writeFile(TOKEN_PATH, JSON.stringify(token), "utf-8");
            console.log('Token stored to ' + TOKEN_PATH);
        }
        catch (err) {
            throw err;
        }
    });
}
/**
 * Placeholder for your UploadVideoToServices function.
 */
function UploadVideoToServices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield fs_1.default.promises.readFile(TOKEN_PATH, "utf-8");
            // Authorize a client with the loaded credentials, then call the YouTube API.
            yield authorize(JSON.parse(content), (auth) => uploadVideo(auth, "test", "test", ["test"]));
        }
        catch (err) {
            console.log('Error loading client secret file: ' + err);
        }
    });
}
exports.default = UploadVideoToServices;
