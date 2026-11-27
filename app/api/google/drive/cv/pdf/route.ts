
import { getDriveFile } from "@/lib/google-drive";

export async function GET() {
    const fileId = process.env.GOOGLE_DRIVE_CV_PDF_FILE_ID;

    if (!fileId) {
        return Response.json(
            { error: "CV PDF not configured." },
            { status: 500 }
        );
    }

    return getDriveFile({
        fileId,
        filename: "CV_Zo_Lantosoa_NIRITSIAFOY.pdf",
        disposition: "attachment",
        expectedMimeType: "application/pdf",
    });
}
