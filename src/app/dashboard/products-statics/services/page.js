'use client'

import DoughnutChart from "@/app/components/charts/DoughnutChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaProductsStaticsServicesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import { useEffect, useState } from "react";

const DaProductStaticsServices = () => {
    const [daOverviewBookingCount, setDaOverviewBookingCount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    async function fetchDaOverviewBookingCountService() {
        try {
            const data = await DaProductsStaticsServicesServiceApi(
                '68e3d07923d356db9432b3e1'
            );

            if (data?.hasError) {
                setErrorMessage(data?.message || 'مشکلی در فراخوانی اطلاعات وجود دارد');
                setErrorDialog(true);
            } else {
                setDaOverviewBookingCount(data?.data);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setErrorDialog(true);
        }
    }

    useEffect(() => {
        fetchDaOverviewBookingCountService();
    }, []);

    return <AdminLayout >
        <div className="p-3 w-50 w-lg-50 w-md-50 w-sm-100 d-flex justify-content-center">

            <DoughnutChart labels={daOverviewBookingCount?.labels}
                datasets={daOverviewBookingCount?.datasets} />

            <CuDialog isOpen={showErrorDialog}
                dialogHeader='خطا'
                dialogContent={errorMessage}
                handleClose={() => setErrorMessage(!errorMessage)}
            />
        </div>
    </AdminLayout>
};

export default DaProductStaticsServices;