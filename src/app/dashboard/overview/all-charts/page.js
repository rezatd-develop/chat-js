'use client'

import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import LineChart from "@/app/components/charts/LineChart";
import DoughnutChart from "@/app/components/charts/DoughnutChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import DashboardHeader from "@/app/view/dashboard/bases/DashboardHeader";

import {
    DaOverviewTotalSalesServiceApi,
    DaOverviewDiscountsServiceApi,
    DaOverviewBookingCountServiceApi,
    DaProductsStaticsServicesServiceApi
} from "@/app/services/apis/dashboard/dashboardServices";
import ChartCard from "@/app/components/cards/ChartCard";
import { useRouter } from "next/navigation";

const DaOverviewAllCharts = () => {
    const [fileId, setFileId] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalSales, setTotalSales] = useState(null);
    const [discounts, setDiscounts] = useState(null);
    const [bookingCount, setBookingCount] = useState(null);
    const [productStatics, setProductStatics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const router = useRouter();

    async function fetchAllCharts(fileIdParam, startDate, endDate) {
        try {
            if (!fileIdParam) {
                setErrorMessage('شناسه فایل یافت نشد. لطفاً ابتدا فایل را آپلود کنید.');
                setShowErrorDialog(true);
                return;
            }

            setIsLoading(true);

            const params = { range: 'daily' };
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const [
                salesData,
                discountData,
                bookingData,
                productData
            ] = await Promise.all([
                DaOverviewTotalSalesServiceApi(fileIdParam, params),
                DaOverviewDiscountsServiceApi(fileIdParam, params),
                DaOverviewBookingCountServiceApi(fileIdParam),
                DaProductsStaticsServicesServiceApi(fileIdParam)
            ]);

            if (salesData?.hasError || discountData?.hasError || bookingData?.hasError || productData?.hasError) {
                const firstError =
                    salesData?.message ||
                    discountData?.message ||
                    bookingData?.message ||
                    productData?.message ||
                    'مشکلی در فراخوانی اطلاعات وجود دارد';
                setErrorMessage(firstError);
                setShowErrorDialog(true);
            }

            setTotalSales(salesData?.data);
            setDiscounts(discountData?.data);
            setBookingCount(bookingData?.data);
            setProductStatics(productData?.data);

        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');
        if (storedFileId) {
            setFileId(storedFileId);
            fetchAllCharts(storedFileId, startDate, endDate);
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
        if (storedFileId) fetchAllCharts(storedFileId, startDate, endDate);
    };

    return (
        <AdminLayout>
            <div className="p-3 w-100">
                <DashboardHeader datesChanged={datesChanged} />

                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Row className="g-4 mt-3">
                        <Col xs={12} lg={6}>
                            {totalSales ? (
                                <ChartCard title='مجموع فروش'>
                                    <LineChart
                                        labels={totalSales?.labels}
                                        datasets={totalSales?.datasets}
                                    />
                                </ChartCard>
                            ) : (
                                <p className="text-muted text-center">در حال بارگذاری...</p>
                            )}

                        </Col>

                        <Col xs={12} lg={6}>
                            {discounts ? (
                                <ChartCard title='تخفیف ها'>
                                    <LineChart
                                        labels={discounts?.labels}
                                        datasets={discounts?.datasets}
                                    />
                                </ChartCard>
                            ) : (
                                <p className="text-muted text-center">در حال بارگذاری...</p>
                            )}
                        </Col>

                        <Col xs={12} lg={6}>
                            {bookingCount ? (
                                <ChartCard title='تعداد رزرو ها'>
                                    <DoughnutChart
                                        labels={bookingCount?.labels}
                                        datasets={bookingCount?.datasets}
                                    />
                                </ChartCard>
                            ) : (
                                <p className="text-muted text-center">در حال بارگذاری...</p>
                            )}
                        </Col>

                        <Col xs={12} lg={6}>
                            {productStatics ? (
                                <ChartCard title='آمار محصولات / خدمات'>
                                    <DoughnutChart
                                        labels={productStatics?.labels}
                                        datasets={productStatics?.datasets}
                                    />
                                </ChartCard>
                            ) : (
                                <p className="text-muted text-center">در حال بارگذاری...</p>
                            )}
                        </Col>
                    </Row>
                )}

                <CuDialog
                    isOpen={showErrorDialog}
                    dialogHeader="خطا"
                    dialogContent={errorMessage}
                    handleClose={() => setShowErrorDialog(false)}
                />
            </div>
        </AdminLayout >
    );
};

export default DaOverviewAllCharts;
