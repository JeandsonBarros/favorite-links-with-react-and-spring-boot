import { getToken } from "./TokenService";
import api from './api'

export async function getAllFolderLinks() {
    try {
        const token = await getToken()
        const response = await api.get(
            '/links-folder',
            {
                headers: {
                    'Authorization': token,
                }
            }
        )
            
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function findFolderLinks(nameFolder) {
    try {
        const token = await getToken()
        const response = await api.get(
            `/links-folder?search=${nameFolder}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function getFolderLinks(folderName) {
    try {
        const token = await getToken()
        const response = await api.get(
            `/links-folder/get-folder-links/${folderName}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function findLinkInFolder(folderName, linkName) {
    try {
        const token = await getToken()
        const response = await api.get(
            `/links-folder/get-folder-links/${folderName}?link-name=${linkName}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function getDataFolderLinks(folderName) {
    try {
        const token = await getToken()
        const response = await api.get(
            `/links-folder/${folderName}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function postFolderLinks(folderName) {
    try {
        const token = await getToken()
        await api.post(
            `/links-folder`,
            { name: folderName },
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return "Links folder save successfully";

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function putFolderLinks(newFolderName, id) {
    try {
        const token = await getToken()
        await api.put(
            `/links-folder/${id}`,
            { name: newFolderName },
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return "Links folder updated successfully";

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}

export async function deleteFolderLinks(id) {
    try {
        const token = await getToken()
        const response = await api.delete(
            `/links-folder/${id}`,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )

        return response.data;

    } catch (error) {
        console.log(error);
        return error.response? error.response.data : "Error"
    }
}