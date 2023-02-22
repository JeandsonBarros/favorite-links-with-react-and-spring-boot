import { setToken, getToken, removeToken } from "./TokenService";
import api from './api'

export async function login(email, password) {
    try {

        const response = await api.post('/user/login', { email, password })
        const tokenResponse = await setToken(response.data.token)

        if (tokenResponse === 'save')
            return "authenticated"

        return "Error logging in"

    } catch (error) {
        console.log(error);
        return "Error logging in, wrong credentials or non-existent account."
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
        const token = await getToken()
        const response = await api.get(
            '/user/data',
            {
                headers: {
                    'Authorization': token,
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
        const token = await getToken()
        const response = await api.delete("/user/delete",
            {
                headers: {
                    'Authorization': token,
                }
            })
        await removeToken()
        return response.status
    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function patchUser(user) {
    try {
        const token = await getToken()
        const response = await api.patch('/user/update', user,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function sendCodeToResetPassword(email) {
    try {

        const response = await api.post("/email-for-forgot-password/send-email", { email })
        return response.status

    } catch (error) {
        console.log(error);
        return error.response.data
    }
} 

export async function changeForgottenPassword(email, newPassword, recoveryCode) {
    try {

        const response = await api.post("/email-for-forgot-password/change-forgotten-password", { email, newPassword, recoveryCode })

        return response.status

    } catch (error) {
        console.log(error);
        return error.response.data
    }
} 

//only user with MASTER and ADMIN permission can use other user
export async function getAllUsers(page = 0) {
    try {
        const token = await getToken()
        const response = await api.get(`/user/list-all-users?page=${page}&size=30`,
            {
                headers: {
                    'Authorization': token,
                }
            })

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

//only user with MASTER and ADMIN permission can use other user
export async function findUser(page = 0, name = '') {
    try {
        const token = await getToken()
        const response = await api.get(`/user/list-all-users?page=${page}&size=30&name=${name}`,
            {
                headers: {
                    'Authorization': token,
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
        const token = await getToken()
        const response = await api.patch(`/user/update-one-user/${email}`, user,
            {
                headers: {
                    'Authorization': token,
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
        const token = await getToken()
        const response = await api.delete(`/user/delete-one-user/${email}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

