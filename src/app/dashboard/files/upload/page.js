"use client";

import CuDialog from "@/app/components/dialog/CuDialog";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function FileUploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogHeader, setDialogHeader] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setDialogHeader("خطا");
            setDialogMessage("لطفاً یک فایل انتخاب کنید.");
            setShowDialog(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setIsUploading(true);

            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:4000/api/files/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (result?.hasError) {
                setDialogHeader("خطا");
                setDialogMessage(result?.message || "آپلود فایل با خطا مواجه شد.");
            } else {
                localStorage.setItem("fileId", result.data);
                setDialogHeader("موفقیت");
                setDialogMessage("فایل با موفقیت آپلود شد و شناسه ذخیره شد.");
                setTimeout(() => router.push('/dashboard/overview/all-charts'), 2000)
            }
        } catch (err) {
            console.error("Upload error:", err);
            setDialogHeader("خطا");
            setDialogMessage("خطا در ارسال فایل به سرور.");
        } finally {
            setIsUploading(false);
            setShowDialog(true);
        }
    };

    return (
        <div
            dir="rtl"
            className="d-flex align-items-center justify-content-center vh-100 bg-light"
        >
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">آپلود فایل</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                            انتخاب فایل
                        </label>
                        <input
                            type="file"
                            id="file"
                            className="form-control text-end"
                            onChange={handleFileChange}
                            accept=".xlsx,.xls,.csv"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isUploading}
                    >
                        {isUploading ? "در حال آپلود..." : "ارسال فایل"}
                    </button>
                </form>
            </div>

            <CuDialog
                isOpen={showDialog}
                dialogHeader={dialogHeader}
                dialogContent={dialogMessage}
                handleClose={() => setShowDialog(false)}
            />
        </div>
    );
}
