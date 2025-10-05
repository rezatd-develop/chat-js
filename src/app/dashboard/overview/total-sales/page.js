'use client'

import LineChart from "@/app/components/charts/LineChart";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewTotalSalesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import { apiGet } from "@/app/services/bases/baseRequest";
import { useEffect } from "react";

const DaOverviewTotalSales = () => {

    useEffect(() => {
        async function fetchDaOverviewTotalSalesService() {
            try {
                const data = await DaOverviewTotalSalesServiceApi('68e2c674ecdb4714ce08828c')
                console.log(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        }
        fetchDaOverviewTotalSalesService();
    }, []);


    return <AdminLayout >
        <div className="p-3 w-100">
            <LineChart />
        </div>
    </AdminLayout>
};

export default DaOverviewTotalSales;