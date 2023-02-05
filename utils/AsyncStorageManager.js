import AsyncStorage from "@react-native-async-storage/async-storage"
// import Notify from "./Notify";

export const setData = async (key, value) => {
    try {
        const stringifyValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, stringifyValue);
    } catch (e) {
        // Notify("error", e.message)
    }
};

export const  getData = async (storageKey) => {
    try {
        const value = await AsyncStorage.getItem(storageKey);
        const parsedValue = JSON.parse(value)
        if (parsedValue !== null) {
            return parsedValue;
        }
    } catch (e) {
        // Notify("error", e.message)
    }
};

export const removeData = async (storageKey) => {
    try {
        await AsyncStorage.removeItem(storageKey);
    } catch (e) {
        // Notify("error", e.message)
    }
};