import { setToken, getToken, removeToken } from "./TokenService";
import api from './api'

export async function login(email, password) {
    try {

        const response = await api.post('/user/login', { email, password })

        setToken(response.data.token)

        return "authenticated"

    } catch (error) {
        console.log(error);
        return "Error logging in, check that the credentials are correct."
    }
}

export async function userResgister(email, password, name) {
    try {

        await api.post('/user/register', { email, password, name })

        const status = await login(email, password)
        return status;

    } catch (error) {
        console.log(error);
        return "Error registering."
    }
}

export async function getUserData() {
    try {

        const response = await api.get(
            '/user/data',
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function deleteUser() {
    try {

        const response = await api.delete("/user/delete",
            {
                headers: {
                    'Authorization': getToken(),
                }
            })
        removeToken()
        return response.status
    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function sendingEmailFogotPassword(emailTo) {
    try {

        const response = await api.post("/user/forgot-password/sending-email-code", { emailTo })

        return { message: response.data, sent: true }

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"

    }
}

export async function changingForgottenPassword(changeForgottenPassword) {
    try {

        const response = await api.post("/user/forgot-password/change-password", changeForgottenPassword)

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function patchUser(user) {
    try {

        const response = await api.patch('/user/update', user,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

//only user with MASTER and ADMIN permission can use other user
export async function getAllUsers(page = 0) {
    try {
       
        const response = await api.get(`/user/list-all-users?page=${page}&size=30`,
            {
                headers: {
                    'Authorization': getToken(),
                }
            })

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

//only user with MASTER and ADMIN permission can use other user
export async function findUser(page = 0, name='') {
    try {

        const response = await api.get(`/user/list-all-users?page=${page}&size=30&name=${name}`,
            {
                headers: {
                    'Authorization': getToken(),
                }
            })

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

//only user with MASTER and ADMIN permission can use other user
export async function patchOneUser(email, user) {
    try {

        const response = await api.patch(`/user/update-one-user/${email}`, user,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

//only user with MASTER and ADMIN permission can use other user
export async function deleteOneUser(email) {
    try {

        const response = await api.delete(`/user/delete-one-user/${email}`,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

