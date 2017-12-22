import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoic21yaXRpZ2hpbWlyZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImdoaW1pcmUiLCJpZCI6MiwibGFzdE5hbWUiOiJnaGltaXJlIiwiZmlyc3ROYW1lIjoic21yaXRpIn0sImlhdCI6MTUxMzY2Njk4NCwiZXhwIjoxNTEzNzY2OTg0fQ.yGBeAI4e_qG2TxAk0_mSqFyvVCB_TJYDLD5ZPUQUOqs';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoieXVzaGdoaW1pcmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJheXVzaCIsImlkIjoxLCJsYXN0TmFtZSI6ImdoaW1pcmUiLCJmaXJzdE5hbWUiOiJheXVzaCJ9LCJpYXQiOjE1MTM3NzI3NTMsImV4cCI6MTUxNDU3Mjc1M30.WfPUFYyyMhUdzeOY9XXN2jFHKSpE3jqSeesjQbqNXHM';

let axiosService = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 2000,
    header: { 'Authorization': badToken }
});

function getRefreshToken() {
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