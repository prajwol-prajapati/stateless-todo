import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoic2FjaGl0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpZCI6MSwibGFzdE5hbWUiOiJzaHJlc3RoYSIsImZpcnN0TmFtZSI6InNhY2hpdCJ9LCJpYXQiOjE1MTU0OTcwNzQsImV4cCI6MTUxNTU5NzA3NH0.LX4P_HSiJCQ71N8iB9FBkSsj2cezWXC4I_3ZoA1wxo4';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoic2FjaGl0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpZCI6MSwibGFzdE5hbWUiOiJzaHJlc3RoYSIsImZpcnN0TmFtZSI6InNhY2hpdCJ9LCJpYXQiOjE1MTU0OTcwNzQsImV4cCI6MTUxNjI5NzA3NH0.WBa-cYYlgLIo4LqNdZKMvYZ0IXMJ1cDiUufIWtsvuyg';

let axiosService = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 1000,
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