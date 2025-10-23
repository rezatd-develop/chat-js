'use client';

import { useEffect, useState } from "react";
import CuDialog from "@/app/components/dialog/CuDialog";
import { DaOverviewGetSellerSales } from "@/app/services/apis/dashboard/dashboardServices";
import { useRouter } from "next/navigation";

const DashboardSellerSales = () => {
    const [sellerSales, setSellerSales] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fileId, setFileId] = useState(null);
    const router = useRouter();

    async function fetchSellerSales(startDate, endDate) {
        try {
            if (!fileId) {
                setErrorMessage('شناسه فایل یافت نشد. لطفاً ابتدا فایل را آپلود کنید.');
                setShowErrorDialog(true);
                return;
            }

            const params = {};
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const data = await DaOverviewGetSellerSales(fileId, params);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'مشکلی در فراخوانی اطلاعات وجود دارد');
                setShowErrorDialog(true);
            } else {
                setSellerSales(data?.data || []);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');
        setFileId(storedFileId);
    }, []);

    useEffect(() => {
        if (fileId) {
            fetchSellerSales(startDate, endDate);
        } else if (fileId !== null) {
            setErrorMessage('شناسه فایل در سیستم یافت نشد. لطفاً ابتدا فایل خود را آپلود کنید.');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, [fileId]);

    const datesChanged = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        fetchSellerSales(start, end);
    };

    const colorClasses = [
        "bg-gradient-primary",
        "bg-gradient-success",
        "bg-gradient-info",
        "bg-gradient-warning",
        "bg-gradient-danger",
        "bg-gradient-purple",
        "bg-gradient-teal",
    ];

    return (
        <div className="mt-4 mb-5">

            {sellerSales?.length > 0 ? (
                <div className="row g-4">
                    {sellerSales.map((seller, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className={`card text-white rounded-4 shadow-sm border-0 ${colorClasses[index % colorClasses.length]} 
                                h-100 d-flex justify-content-center align-items-center p-3`}
                                style={{
                                    background: `linear-gradient(135deg, var(--bs-${[
                                        "primary",
                                        "success",
                                        "info",
                                        "warning",
                                        "danger",
                                        "purple",
                                        "teal",
                                    ][index % 7]}), #6c757d)`,
                                }}
                            >
                                <div className="card-body text-center">
                                    <h6 className="fw-semibold mb-2">{seller.name}</h6>
                                    <h5 className="fw-bold">{seller.amount.toLocaleString()} تومان</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted text-center mt-5">
                    داده‌ای برای نمایش وجود ندارد.
                </p>
            )}

            <CuDialog
                isOpen={showErrorDialog}
                dialogHeader="خطا"
                dialogContent={errorMessage}
                handleClose={() => setShowErrorDialog(false)}
            />
        </div>
    );
};

export default DashboardSellerSales;
