import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
	isOpen: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		closeModal: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { openModal, closeModal, toggle } = sidebarSlice.actions;
export const selectModalState = (state: RootState) => state.modal;
export default sidebarSlice.reducer;
