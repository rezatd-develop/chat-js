'use client'

import { useEffect, useState } from "react";
import LineChart from "@/app/components/charts/LineChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewDiscountsServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import DashboardHeader from "@/app/view/dashboard/bases/DashboardHeader";
import { useRouter } from "next/navigation";
import DashboardSellerSales from "@/app/view/dashboard/bases/DashboardSellerSales";

const DaOverviewDiscounts = () => {
    const [daOverviewDiscounts, setDaOverviewDiscounts] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const router = useRouter()

    async function fetchDaOverviewDiscountsService(fileId, startDate, endDate) {
        try {
            if (!fileId) {
                setErrorMessage('شناسه فایل یافت نشد. لطفاً ابتدا فایل را آپلود کنید.');
                setShowErrorDialog(true);
                return;
            }

            const params = { range: 'daily' };
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const data = await DaOverviewDiscountsServiceApi(fileId, params);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'مشکلی در فراخوانی اطلاعات وجود دارد');
                setShowErrorDialog(true);
            } else {
                setDaOverviewDiscounts(data?.data);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');

        if (storedFileId) {
            fetchDaOverviewDiscountsService(storedFileId, startDate, endDate);
        } else {
            setErrorMessage('شناسه فایل در سیستم یافت نشد. لطفاً ابتدا فایل خود را آپلود کنید.');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, []);

    const datesChanged = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);

        const storedFileId = localStorage.getItem('fileId');
        if (storedFileId) {
            fetchDaOverviewDiscountsService(storedFileId, startDate, endDate);
        } else {
            setErrorMessage('شناسه فایل یافت نشد. لطفاً ابتدا فایل را آپلود کنید.');
            setShowErrorDialog(true);
        }
    };

    return (
        <AdminLayout>
            <div className="p-3 w-100">
                <DashboardSellerSales />

                <DashboardHeader datesChanged={datesChanged} />

                {daOverviewDiscounts ? (
                    <LineChart
                        labels={daOverviewDiscounts?.labels}
                        datasets={daOverviewDiscounts?.datasets}
                    />
                ) : (
                    <p className="text-muted">در حال بارگذاری اطلاعات...</p>
                )}

                <CuDialog
                    isOpen={showErrorDialog}
                    dialogHeader="خطا"
                    dialogContent={errorMessage}
                    handleClose={() => setShowErrorDialog(false)}
                />
            </div>
        </AdminLayout>
    );
};

export default DaOverviewDiscounts;
