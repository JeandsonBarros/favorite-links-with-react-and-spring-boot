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
        console.log(status);
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
    }
}

export async function putUser(user) {
    try {

        const response = await api.put('/user/update', user,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data

    } catch (error) {
        console.log(error);
        return "Error updating"
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
        return error.status
    }
}

export async function sendingEmailFogotPassword(emailTo) {
    try {

        const response = await api.post("/user/forgot-password/sending-email-code", { emailTo })

        return { message: response.data, sent: true }

    } catch (error) {

        if (error.response) {
            return { message: error.response.data, sent: false }
        }

        return { message: "Erro!", sent: false }

    }
}

export async function changingForgottenPassword(changeForgottenPassword) {
    try {

        const response = await api.post("/user/forgot-password/change-password", changeForgottenPassword)

        return response.data

    } catch (error) {

        if (error.response) {
            return error.response.data
        }

        return "Erro!"
    }
}