import { getToken } from "./TokenService";
import api from './api'

export async function getAllFavoriteLinks() {
    try {
        const token = await getToken()
        const response = await api.get(
            '/favorite-link',
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function findFavoriteLinks(name) {
    try {
        const token = await getToken()
        const response = await api.get(
            `/favorite-link?search=${name}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function postFavoriteLink(name, url, folderId) {
    try {
        const token = await getToken()
        await api.post(
            '/favorite-link',
            { name, url, folderId },
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return "Favorite link save successfully";

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function putFavoriteLink(name, url, folderId, id) {
    try {
        const token = await getToken()
        await api.put(
            `/favorite-link/${id}`,
            { name, url, folderId },
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return "Updated successfully";

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}

export async function deleteFavoriteLink(id) {
    try {
        const token = await getToken()
        const response = await api.delete(
            `/favorite-link/${id}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : "Error"
    }
}