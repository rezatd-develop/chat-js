'use client'

import LineChart from "@/app/components/charts/LineChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewTotalSalesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import { useEffect, useState } from "react";

const DaOverviewTotalSales = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setErrorDialog] = useState(false);

    useEffect(() => {
        async function fetchDaOverviewTotalSalesService() {
            try {
                const data = await DaOverviewTotalSalesServiceApi('68e2c674ecdb4714ce08828c')
                if (data === undefined) {
                    setErrorMessage('مشکلی در فراخوانی اطلاعات وجود دارد');
                    setErrorDialog(true)
                }
            } catch (err) {
                setErrorMessage(err);
                setErrorDialog(true);
            }
        }
        fetchDaOverviewTotalSalesService();
    }, []);


    return <AdminLayout >
        <div className="p-3 w-100">
            <LineChart />
            <CuDialog isOpen={showErrorDialog}
                dialogHeader='خطا'
                dialogContent={errorMessage}
                handleClose={() => setErrorMessage(!errorMessage)}
            />
        </div>
    </AdminLayout>
};

export default DaOverviewTotalSales;