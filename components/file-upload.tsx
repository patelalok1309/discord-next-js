"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const [isPdf, setIsPdf] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleRemove = () => {
        setIsPdf(false);
        setPdfUrl(null);
        onChange("");
    };

    const fileType = value.split(".").pop();

    if (value && !isPdf) {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full object-cover"
                    sizes="max-width: 100%; max-height: 100%;"
                />
                <button
                    onClick={handleRemove}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    if (isPdf && value) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    <p className="text-center max-w-[400px] truncate break-words">
                        {value}
                    </p>
                </a>
                <button
                    onClick={handleRemove}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("File uploaded:", res);
                if (res?.[0].type === "application/pdf") {
                    setIsPdf(true);
                }
                onChange(res?.[0].url);
            }}
            onUploadError={(err: Error) => console.log(err)}
        />
    );
};
