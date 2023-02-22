import axios from "axios";

const baseUrl = Platform.OS === 'android' ? 'http://10.0.0.136:8080/' : 'http://localhost:8080/';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;