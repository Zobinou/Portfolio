import { google } from "googleapis";
import { Readable } from "node:stream";

interface DriveFileOptions {
    fileId: string;
    filename: string;
    disposition?: "inline" | "attachment";
    expectedMimeType?: string;
}

export async function getDriveFile({
    fileId,
    filename,
    disposition = "attachment",
    expectedMimeType,
}: DriveFileOptions): Promise<Response> {
    if (!fileId) {
        return Response.json(
            { error: "Google Drive file ID is missing." },
            { status: 404 }
        );
    }

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
        ?.replace(/\\n/g, "\n")
        .trim();

    if (!email || !privateKey) {
        console.error("Google Drive credentials are missing.");

        return Response.json(
            { error: "Google Drive credentials are not configured." },
            { status: 500 }
        );
    }

    if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
        console.error("Invalid Google service account private key.");

        return Response.json(
            { error: "Invalid Google Drive authentication configuration." },
            { status: 500 }
        );
    }

    try {
        const auth = new google.auth.JWT({
            email,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });

        const drive = google.drive({
            version: "v3",
            auth,
        });

        // 1. Lire les métadonnées du fichier avant de télécharger son contenu.
        const metadataResponse = await drive.files.get({
            fileId,
            fields: "id,name,mimeType,size,capabilities(canDownload)",
        });

        const metadata = metadataResponse.data;
        const actualMimeType =
            metadata.mimeType ?? "application/octet-stream";

        console.info("[Google Drive file]", {
            name: metadata.name,
            mimeType: actualMimeType,
            size: metadata.size,
            canDownload: metadata.capabilities?.canDownload,
        });

        if (metadata.capabilities?.canDownload === false) {
            return Response.json(
                {
                    error: "This Google Drive file cannot be downloaded.",
                    fileName: metadata.name,
                    actualMimeType,
                },
                { status: 403 }
            );
        }

        let stream: Readable;
        let responseMimeType: string;

        // 2. Les fichiers Google Workspace nécessitent un export.
        if (actualMimeType.startsWith("application/vnd.google-apps.")) {
            if (
                expectedMimeType?.toLowerCase() !== "application/pdf"
            ) {
                return Response.json(
                    {
                        error: "This is a Google Workspace document, not an image or a binary file.",
                        fileName: metadata.name,
                        actualMimeType,
                    },
                    { status: 415 }
                );
            }

            const exportedFile = await drive.files.export(
                {
                    fileId,
                    mimeType: "application/pdf",
                },
                {
                    responseType: "stream",
                }
            );

            stream = exportedFile.data as Readable;
            responseMimeType = "application/pdf";
        } else {
            // 3. Vérifier le véritable type MIME du fichier binaire.
            if (
                expectedMimeType &&
                !actualMimeType
                    .toLowerCase()
                    .startsWith(expectedMimeType.toLowerCase())
            ) {
                return Response.json(
                    {
                        error: "The Google Drive file has an unexpected format.",
                        fileName: metadata.name,
                        expectedMimeType,
                        actualMimeType,
                    },
                    { status: 415 }
                );
            }

            // 4. Télécharger le fichier original.
            const mediaResponse = await drive.files.get(
                {
                    fileId,
                    alt: "media",
                },
                {
                    responseType: "stream",
                }
            );

            stream = mediaResponse.data as Readable;
            responseMimeType = actualMimeType;
        }

        const safeFilename = filename.replace(/["\r\n]/g, "");

        return new Response(
            Readable.toWeb(stream) as ReadableStream,
            {
                status: 200,
                headers: {
                    "Content-Type": responseMimeType,
                    "Content-Disposition":
                        `${disposition}; filename="${safeFilename}"`,
                    "Cache-Control": "private, no-store",
                    "X-Content-Type-Options": "nosniff",
                },
            }
        );
    } catch (error) {
        console.error("Google Drive API error:", error);

        return Response.json(
            { error: "Unable to retrieve the Google Drive file." },
            { status: 500 }
        );
    }
}