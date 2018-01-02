import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoieXVzaGdoaW1pcmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJheXVzaCIsImlkIjoxLCJsYXN0TmFtZSI6ImdoaW1pcmUiLCJmaXJzdE5hbWUiOiJheXVzaCJ9LCJpYXQiOjE1MTQ3MjEyNzQsImV4cCI6MTUxNDcyMTM3NH0.TmEe-lwHVLl23b3DiUNCl-nMuod8Z67wROPYzf8eM8U';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoieXVzaGdoaW1pcmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJheXVzaCIsImlkIjoxLCJsYXN0TmFtZSI6ImdoaW1pcmUiLCJmaXJzdE5hbWUiOiJheXVzaCJ9LCJpYXQiOjE1MTQ3MjEyNzQsImV4cCI6MTUxNTUyMTI3NH0.ehJewYnmzBncsPKc-Ts6yFNj0qgmnkUUg6J85NV_hOk';

let axiosService = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 2000,
    header: { 'Authorization': badToken }
});

function getRefreshToken() {
    console.log('getting refresh token');
    return axiosService({
        url: '/refresh',
        method: 'get',
        headers: { 'Authorization': refreshToken }
    });
}

axiosService.interceptors.response.use(undefined, err => {
    let res = err.response;
    console.log(err.response);

    if(res.status === 401){
        let tempConfig = res.config;

        return getRefreshToken()
        .then(data => {
            console.log('getting access token');
            axiosService.defaults.headers['Authorization'] = data.data.accessToken;
            tempConfig.headers.Authorization = data.data.accessToken;

            return axiosService.request(tempConfig)
            .then(response => response)
            .catch(err => err);
        });

    }

    return Promise.reject(err);
} );

export default axiosService;