import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./slices/user_slice";

const reducer = combineReducers({
    user, // Add more slice from heare
})

const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;