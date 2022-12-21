import { app_local_storage_key } from "./constants";
import { IUser } from "./interfaces";

export const localStorage = {
    get: (key: string) => window.localStorage.getItem(app_local_storage_key + ':' + key),
    remove: (key: string) => window.localStorage.removeItem(app_local_storage_key + ':' + key),
    set: (key: string, data: string) => window.localStorage.setItem(app_local_storage_key + ':' + key, data)
}

export const getUserSession = () => {
    try {
        var user = localStorage.get('u_user_info');
        if (user === "" || user === null) return undefined;
        return JSON.parse(user) as IUser;
    } catch (error) {
        return undefined;
    }
}

export const cacheUserData = (userInfo: string, token: string, expiry: string) => {
    localStorage.set("u_user_info", userInfo);
    localStorage.set("u_token", token);
    localStorage.set("u_token_expiry", expiry);
}

export const clearUserData = () => {
    localStorage.remove("u_user_info");
    localStorage.remove("u_token");
    localStorage.remove("u_token_expiry");
}