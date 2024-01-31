import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/sidebarSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		contacts: contactReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
