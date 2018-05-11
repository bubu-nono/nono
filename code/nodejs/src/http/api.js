import axios from 'axios'

var instance = axios.create({
    baseURL: 'http://10.44.3.182:8084'
})

export const login = params => { return instance.get('/user/login', { params: params }) };
export const requestLogin = params => { return instance.post(`/user/login`, params) };
export const getUserList = params => { return instance.post('/user/getUser', params) };

// export const getUserListPage = params => { return axios.get(`${baseUrl}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${baseUrl}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${baseUrl}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${baseUrl}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${baseUrl}/user/add`, { params: params }); };
