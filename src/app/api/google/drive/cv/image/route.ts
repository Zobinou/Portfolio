
import { getDriveFile } from "@/lib/google-drive";

export async function GET() {
    const fileId = process.env.GOOGLE_DRIVE_CV_IMAGE_FILE_ID;

    if (!fileId) {
        return Response.json(
            {
                error: "CV image not configured. Please configure GOOGLE_DRIVE_CV_IMAGE_FILE_ID.",
            },
            { status: 404 }
        );
    }

    return getDriveFile({
        fileId,
        filename: "CV-Zo-Lantosoa.jfif",
        disposition: "attachment",
        expectedMimeType: "image/",
    });
}
