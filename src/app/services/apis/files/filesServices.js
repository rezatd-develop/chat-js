import { apiGet } from "../../bases/baseRequest";
import { apiRoutes } from "../../routes/apiRoutes";

export const getPdfReportsService = (id, isFile = false) => {
  return apiGet(
    `${apiRoutes.getPdfReports}/${id}/report/pdf`,
    {}, // no params
    isFile
  );
};
