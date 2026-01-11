import type { DataType, KeyType } from "../types";

/**
 * Retrieves and parses a value from localStorage by key.
 *
 * This function attempts to read a string value from localStorage.
 * If the value exists, it tries to parse it as JSON.
 * - If parsing results in an object or boolean, that value is returned.
 * - If parsing fails or the value is a plain string, the raw string is returned.
 *
 * @param {KeyType} key - The localStorage key to retrieve.
 * @returns {unknown | null} The parsed value (object, array, boolean), the raw string, or null if the key does not exist.
 */
export const getDataFromStorage = (key: KeyType): unknown | null => {
    const data = localStorage.getItem(key);

    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        if (
            (typeof parsed === "object" && parsed !== null) ||
            (typeof parsed === "boolean" && parsed !== null)
        ) {
            return parsed;
        }
        return data;
    } catch (error) {
        return data;
    }
};

/**
 * Saves a value under the specified key in localStorage.
 *
 * If the provided data is a string, it is stored directly.
 * For any other data type, it is serialized to a JSON string before storage.
 *
 * @param {KeyType} key - The key under which to store the data.
 * @param {DataType} data - The data to store; non-string types will be JSON-stringified.
 */
export const saveDataInStorage = (key: KeyType, data: DataType) => {
    if (typeof data === "string") {
        localStorage.setItem(key, data);
    }
    if (typeof data !== "string") {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

/**
 * Clears all data from localStorage and reloads the current page.
 *
 * Warning: This action is destructive and will force a browser refresh.
 */
export const deleteLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
};

/**
 * Removes a specific item from localStorage if it exists.
 *
 * @param {KeyType} key - The localStorage key to remove.
 * @returns {null | void} Returns null if the key does not exist, otherwise returns nothing after removal.
 */
export const removeFromStorage = (key: KeyType) => {
    const data = localStorage.getItem(key);

    if (!data) return null;

    if (data) localStorage.removeItem(key);
};

/**
 * Retrieves and parses a value from sessionStorage by key.
 *
 * This function attempts to read a string value from sessionStorage.
 * If the value exists, it tries to parse it as JSON.
 * - If parsing results in an object or boolean, that value is returned.
 * - If parsing fails or the value is a plain string, the raw string is returned.
 *
 * @param {KeyType} key - The sessionStorage key to retrieve.
 * @returns {unknown | null} The parsed value (object, array, boolean), the raw string, or null if the key does not exist.
 */
export const getDataFromSessionStorage = (key: KeyType): unknown | null => {
    const data = sessionStorage.getItem(key);

    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        if (
            (typeof parsed === "object" && parsed !== null) ||
            (typeof parsed === "boolean" && parsed !== null)
        ) {
            return parsed;
        }
        return data;
    } catch (error) {
        return data;
    }
};

/**
 * Saves a value under the specified key in sessionStorage.
 *
 * If the provided data is a string, it is stored directly.
 * For any other data type, it is serialized to a JSON string before storage.
 *
 * @param {KeyType} key - The key under which to store the data.
 * @param {DataType} data - The data to store; non-string types will be JSON-stringified.
 */
export const saveDataInSessionStorage = (key: KeyType, data: DataType) => {
    if (typeof data === "string") {
        sessionStorage.setItem(key, data);
    }
    if (typeof data !== "string") {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
};

/**
 * Removes a specific item from sessionStorage if it exists.
 *
 * @param {KeyType} key - The sessionStorage key to remove.
 * @returns {null | void} Returns null if the key does not exist, otherwise returns nothing after removal.
 */
export const removeFromSessionStorage = (key: KeyType) => {
    const data = sessionStorage.getItem(key);

    if (!data) return null;

    if (data) sessionStorage.removeItem(key);
};

/**
 * Clears all data from sessionStorage and reloads the current page.
 *
 * Warning: This action is destructive and will force a browser refresh.
 */
export const deletSessionStorage = () => {
    sessionStorage.clear();
    window.location.reload();
};
