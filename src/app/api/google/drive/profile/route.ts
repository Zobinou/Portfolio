import { getDriveFile } from "@/lib/google-drive";

export async function GET() {
    const fileId = process.env.GOOGLE_DRIVE_PROFILE_FILE_ID;

    if (!fileId) {
        return Response.json(
            { error: "Profile photo not configured." },
            { status: 404 }
        );
    }

    return getDriveFile({
        fileId,
        filename: "profile.jpg",
        disposition: "inline",
        expectedMimeType: "image/",
    });
}
