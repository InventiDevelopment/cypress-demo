import globby from "globby";
import * as path from "path";
import Uploader from "s3-batch-upload";
import { logger } from "bs-logger";
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BUCKET_NAME
// AWS.config.loadFromPath('./aws-credentials.json');

AWS.config.accessKeyId = process.env.AWS_ACCESS_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
AWS.config.region = 'eu-west-3';

// files are uploaded to s3://cypress-slack-reporter/remote/path
// files are downloadable via aws s3 sync s3://cypress-slack-reporter/remote/path .
main();

function uploadS3(artefactPath: string, glob: string) {
    return new Uploader({
        accessControlLevel: "public-read",
        s3Client: s3,
        bucket: BUCKET_NAME,
        localPath: path.resolve(process.cwd(), artefactPath),
        remotePath: path.join(artefactPath),
        glob,
        cacheControl: "max-age=3600" // can be a string, for all uploade resources
    }).upload()
}
// }

async function main() {
    await logger.info("Starting to search for files");
    // await getVideos;
    await getScreenshots;
    await getReports;
    // const s3PathsVideos = await uploadS3("cypress/videos", "*.mp4");
    const s3PathsReports = await uploadS3("mochawesome-report", "*.*");
    const s3PathsScreenshots = await uploadS3("mochawesome-report/assets/screenshots/", "*.png");
    // const processedS3PathsVideos = processS3Paths(s3PathsVideos);
    const processedS3PathsScreenshots = processS3Paths(s3PathsScreenshots);
    const processedS3PathsReports = processS3Paths(s3PathsReports);
    // logger.info("processedS3PathsVideos", { processedS3PathsVideos });
    logger.info("processedS3PathsScreenshots", { processedS3PathsScreenshots });
    logger.info("processedS3PathsReports", { processedS3PathsReports });
}

function processS3Paths(paths: string[]) {
    const bucketURL = `https://${BUCKET_NAME}.s3.eu-west-3.amazonaws.com/`;
    const processedS3Paths: string[] = [];
    paths.forEach(element => {
        processedS3Paths.push(`${bucketURL}${element}`);
    });
    console.log(processedS3Paths)
    return processedS3Paths;
}

// const getVideos = (async () => {
//     const paths = await globby(path.resolve(process.cwd(), "cypress", "videos"), {
//         expandDirectories: {
//             files: ["*"],
//             extensions: ["mp4"]
//         }
//     });
//     return await paths;
// })();
export const getReports = (async () => {
    const paths = await globby(path.resolve(process.cwd(), "mochawesome-report"), {
        expandDirectories: {
            files: ["*"],
            extensions: ["html"]
        }
    });

    return await paths;
})();
export const getScreenshots = (async () => {
    const paths = await globby(
        path.resolve(process.cwd(), "cypress", "screenshots"),
        {
            expandDirectories: {
                files: ["*"],
                extensions: ["png"]
            }
        }
    );

    return await paths;
})();
