import fs from "fs";
import readline from "readline";
import { google, youtube_v3 } from "googleapis";
import { OAuth2Client, Credentials } from "google-auth-library";
import path from "path";
import { CurrentVideoPath } from "../Misc/Variables";

// Define the OAuth2 client class
const OAuth2 = google.auth.OAuth2;

// Define the scopes and token paths
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_DIR = path.join(__dirname, "..", "..", "config");
const TOKEN_PATH = path.join(TOKEN_DIR, 'token.json'); // Corrected path

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials: any, callback: (auth: OAuth2Client) => void) {
  const clientSecret: string = credentials.installed.client_secret;
  const clientId: string = credentials.installed.client_id;
  const redirectUrl: string = credentials.installed.redirect_uris[0];
  const oauth2Client: OAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  try {
    const token = await fs.promises.readFile(TOKEN_PATH, "utf-8");
    oauth2Client.setCredentials(JSON.parse(credentials))
    callback(oauth2Client);
  } catch (err) {
    await getNewToken(oauth2Client, callback);
  }
}

/**
 * Get and store a new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {OAuth2Client} oauth2Client The OAuth2 client to get a token for.
 * @param {function} callback The callback to call with the authorized client.
 */
async function getNewToken(oauth2Client: OAuth2Client, callback: (auth: OAuth2Client) => void) {
  const authUrl: string = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', async (code) => {
    rl.close();
    try {
      const token = await oauth2Client.getToken(code);
      oauth2Client.credentials = token.tokens as Credentials;
      await storeToken(token.tokens);
      callback(oauth2Client);
    } catch (err) {
      console.log('Error while trying to retrieve access token', err);
    }
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
async function uploadVideo(auth: OAuth2Client, title: string, description: string, tags: string[]) {
    const service: youtube_v3.Youtube = google.youtube('v3');
  
    try {
      const response = await service.videos.insert({
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
          body: fs.createReadStream(CurrentVideoPath[0])
        }
      });
  
      console.log("Video uploaded:", response.data);
      console.log('Thumbnail uploaded.');
    } catch (err) {
      console.error('Error uploading video:', err);
    }
  }
  

/**
 * Store a token to disk for later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
async function storeToken(token: any) {
  try {
    await fs.promises.mkdir(TOKEN_DIR, { recursive: true }); // Create directory recursively if needed
    await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(token), "utf-8");
    console.log('Token stored to ' + TOKEN_PATH);
  } catch (err) {
    throw err;
  }
}

/**
 * Placeholder for your UploadVideoToServices function.
 */
export default async function UploadVideoToServices() {
  try {
    const content = await fs.promises.readFile(TOKEN_PATH, "utf-8");
    // Authorize a client with the loaded credentials, then call the YouTube API.
    await authorize(JSON.parse(content), (auth) => uploadVideo(auth, "test", "test", ["test"]));
  } catch (err) {
    console.log('Error loading client secret file: ' + err);
  }
}
