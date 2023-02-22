import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken() {
    try {
        return AsyncStorage.getItem('token')
    } catch (error) {
        console.log(error);
        return "error"
    } 
}

export async function setToken(token) {
    try {
        await AsyncStorage.setItem('token', token);
        return "save"
    } catch (error) {
        console.log(error);
        return "error"
    }
    
}

export async function removeToken() {
    try {
        await AsyncStorage.removeItem('token');
        return "deleted"
    } catch (error) {
        console.log(error);
        return "error"
    }
}