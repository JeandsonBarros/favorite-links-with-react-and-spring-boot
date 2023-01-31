import { getToken } from "./TokenService";
import api from './api'

export async function getAllFavoriteLinks() {
    try {

        const response = await api.get(
            '/favorite-link',
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export async function postFavoriteLink(name, url, folderId) {
    try {

        await api.post(
            '/favorite-link',
            { name, url, folderId },
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return "Favorite link save successfully";

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export async function putFavoriteLink(name, url, folderId, id) {
    try {

       await api.put(
            `/favorite-link/${id}`,
            { name, url, folderId },
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return "Updated successfully";

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export async function deleteFavoriteLink(id) {
    try {

        const response = await api.delete(
            `/favorite-link/${id}`,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}