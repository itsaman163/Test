import axios from "axios";
import { API_END_POINT } from "../config";
import { toast } from "react-toastify";

export const apiRequest = async (apiUrl, apiParams) => {
    try {
        let targetUrl = API_END_POINT + apiUrl;
        const method = apiParams.method;
        const data = apiParams.apiParams;
        const params = apiParams.params;
        if (params) targetUrl = `${targetUrl}/${params}`
        const loginInfo = getSession();
        const authToken = loginInfo ? loginInfo : null;


        const Authorization = "Bearer " + authToken.token;

        let config = {
            method: method,
            maxBodyLength: Infinity,
            url: targetUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            data: JSON.stringify(data)
        };
        const result = await axios.request(config);
        return result.data
    } catch (err) {
        console.log("----------->>", err);
        return { setting: { success: false, massage: err.response.data.msg } }
    }
}

export const successMsg = (message) =>
    toast.success(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    });

export const errorMsg = (message) =>
    toast.error(message, {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    });