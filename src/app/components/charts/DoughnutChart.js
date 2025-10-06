"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
    const chartData = {
        labels: props?.labels,
        datasets: props?.datasets
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return chartData?.labels?.length > 0 && <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
