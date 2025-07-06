import axios from 'axios'


const axiosProfile = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})


export default axiosProfile;