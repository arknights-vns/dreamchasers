import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";eat
import { createClient } from "@supabase/supabase-js";

// FIXME: In case you can't run, replace yourself.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const BUCKET_NAME = "operator";
const LOCAL_FOLDER_PATH = "./public/operator/portraits";
const SUPABASE_FOLDER_PATH = "/portraits";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let fail = 0;
let pass = 0;
let total = 0;

/**
 * Recursively collect all file paths in a directory
 */
async function getAllFiles(dir: string): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await getAllFiles(fullPath)));
        } else if (entry.isFile()) {
            files.push(fullPath);
        }
    }

    return files;
}

async function uploadAllFiles() {
    const files = await getAllFiles(LOCAL_FOLDER_PATH);
    total = files.length;

    console.info(`Indexed ${total} files`);

    for (const filePath of files) {
        const relativePath = path.relative(LOCAL_FOLDER_PATH, filePath).replace(/\\/g, "/");
        const storagePath = path.posix.join(SUPABASE_FOLDER_PATH, relativePath);
        const fileData = await readFile(filePath);

        console.info(`Uploading: ${storagePath}`);

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, fileData, {
                upsert: true,
                contentType: "image/png"
            });

        if (error) {
            console.error(`❌ Failed to upload ${relativePath}:`, error.message);
            ++fail;
        } else {
            console.info(`✅ Uploaded ${relativePath}`);
            ++pass;
        }
    }
}

uploadAllFiles()
    .then(() => {
        console.info(`Pass: ${pass} - Fail: ${fail} - Total: ${total}`);
    })
    .catch((err) => {
        console.error("Unexpected error:", err);
    });
