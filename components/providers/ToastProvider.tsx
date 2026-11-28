"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
    return (
        <Toaster
            position="bottom-right"
            theme="system"
            richColors
            closeButton
            duration={4500}
            visibleToasts={3}
        />
    );
}
