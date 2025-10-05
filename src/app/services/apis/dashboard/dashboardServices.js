import { apiGet } from "../../bases/baseRequest";
import { apiRoutes } from "../../routes/apiRoutes";

export const DaOverviewTotalSalesServiceApi = (id) => {
    apiGet(`${apiRoutes.DaOverviewTotalSales}${id}/charts`);
}