import { apiGet } from "../../bases/baseRequest";
import { apiRoutes } from "../../routes/apiRoutes";

export const DaOverviewTotalSalesServiceApi = (id, params = {}) => {
    return apiGet(`${apiRoutes.DaOverviewTotalSales}${id}/charts`, { params });
};

export const DaOverviewBookingCountServiceApi = (id, params = {}) => {
    return apiGet(`${apiRoutes.DaOverviewBookingCount}${id}/charts`, { params });
};

export const DaOverviewDiscountsServiceApi = (id, params = {}) => {
    return apiGet(`${apiRoutes.DaOverviewDiscountsCount}${id}/charts`, { params });
};

export const DaProductsStaticsServicesServiceApi = (id, params = {}) => {
    return apiGet(`${apiRoutes.DaProductsStaticsServices}${id}/charts`, { params });
};

export const DaOverviewGetSellerSales = (id, params = {} ) => {
    return apiGet(`${apiRoutes.getSellerSales}${id}`, { params });
};