import {API_URL} from '../utils/constants';
import axios from 'axios';
//import { API_URL } from '@env';

// export async function loginApi(formData) {
//     try {
//         const url = `${API_URL}/auth/local`;
//         const params = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(formData)
//         };

//         console.log('Request URL:', url);
//         console.log('Request Params:', params);

//         const response = await fetch(url, params);
//         const result = await response.json();

//         if (!response.ok) {
//             console.log('Error Response:', result);
//             return result;
//         }

//         console.log('Response:', result);
//         return result;
//     } catch (error) {
//         console.log('Error:', error);
//         return null;
//     }
// }

// export async function registerApi(formData) {
//     try {
//         const url = `${API_URL}/auth/local/register`;
//         const params = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(formData)
//         };

//         console.log('Request URL:', url);
//         console.log('Request Params:', params);

//         const response = await fetch(url, params);
//         const result = await response.json();

//         if (!response.ok) {
//             console.log('Error Response:', result);
//             return result;
//         }

//         console.log('Response:', result);
//         return result;
//     } catch (error) {
//         console.log('Error:', error);
//         return null;
//     }
// }

export const registerApi = async (formData) => {
    try {
        const response = await axios.post(`https://yamenadiosbandajksjdskj.azurewebsites.net/register`, formData);
        return response.data;
    } catch (error) {
        console.log('Error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

export const loginApi = async (formData) => {
    try {
        const response = await axios.post(`https://yamenadiosbandajksjdskj.azurewebsites.net/login`, formData);
        return response.data;
    } catch (error) {
        console.log('Error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};