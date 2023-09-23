import axios, { AxiosInstance } from "axios";

const request = axios.create({
    baseURL: "http://localhost:8014"
});

export function sendSessionIdAuthorization(request: AxiosInstance, token: string) : AxiosInstance
{   
    if(token)
    {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete request.defaults.headers.common['Authorization'];
    }
    return request;
}

export default request;