import { apiPost } from "../../bases/baseRequest";
import { apiRoutes } from "../../routes/apiRoutes";

export const DaAuthSignIn = (data) => {
    return apiPost(apiRoutes.signIn, data);
};

export const DaAuthSignUp = (data) => {
    return apiPost(apiRoutes.signUp, data);
};