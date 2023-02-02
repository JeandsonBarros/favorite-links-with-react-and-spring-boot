import api from './api'

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

        return response.data

    } catch (error) {
        console.log(error);
        return error.response.data
    }
} 