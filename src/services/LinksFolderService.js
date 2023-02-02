import { getToken } from "./TokenService";
import api from './api'

export async function getAllFolderLinks() {
    try {

        const response = await api.get(
            '/links-folder',
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

export async function findFolderLinks(nameFolder) {
    try {

        const response = await api.get(
            `/links-folder?search=${nameFolder}`,
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

export async function getFolderLinks(folderName) {
    try {

        const response = await api.get(
            `/links-folder/get-folder-links/${folderName}`,
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

export async function getDataFolderLinks(folderName) {
    try {

        const response = await api.get(
            `/links-folder/${folderName}`,
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

export async function postFolderLinks(folderName) {
    try {

        await api.post(
            `/links-folder`,
            { name: folderName },
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return "Links folder save successfully";

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export async function putFolderLinks(newFolderName, id) {
    try {

        await api.put(
            `/links-folder/${id}`,
            { name: newFolderName },
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )

        return "Links folder updated successfully";

    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export async function deleteFolderLinks(id) {
    try {

        const response = await api.delete(
            `/links-folder/${id}`,
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