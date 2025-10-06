'use client'

import LineChart from "@/app/components/charts/LineChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewTotalSalesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import DashboardHeader from "@/app/view/dashboard/bases/DashboardHeader";
import { useEffect, useState } from "react";

const DaOverviewTotalSales = () => {
    const [daOverviewTotalSales, setDaOverviewTotalSales] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    async function fetchDaOverviewTotalSalesService(startDate, endDate) {
        try {
            const params = {range: 'daily'};
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const data = await DaOverviewTotalSalesServiceApi(
                '68e3d07923d356db9432b3e1',
                params
            );

            if (data?.hasError) {
                setErrorMessage(data?.message || 'مشکلی در فراخوانی اطلاعات وجود دارد');
                setErrorDialog(true);
            } else {
                setDaOverviewTotalSales(data?.data);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setErrorDialog(true);
        }
    }



    useEffect(() => {
        fetchDaOverviewTotalSalesService();
    }, []);

    const datesChanged = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        fetchDaOverviewTotalSalesService(startDate, endDate);
    }

    return <AdminLayout >
        <div className="p-3 w-100">
            <DashboardHeader datesChanged={datesChanged} />

            <LineChart labels={daOverviewTotalSales?.labels}
                datasets={daOverviewTotalSales?.datasets} />

            <CuDialog isOpen={showErrorDialog}
                dialogHeader='خطا'
                dialogContent={errorMessage}
                handleClose={() => setErrorMessage(!errorMessage)}
            />
        </div>
    </AdminLayout>
};

export default DaOverviewTotalSales;