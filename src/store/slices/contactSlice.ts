import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IContact {
	id?: string;
	name: string;
	phoneNumber: string;
	email: string;
	addresses: string[];
	longitude: string;
	latitude: string;
}

interface ContactsState {
	contacts: IContact[];
}

const initialState: ContactsState = {
	contacts: [],
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		contactAdded: {
			reducer(state, action: PayloadAction<IContact>) {
				state.contacts.push(action.payload);
			},
			prepare(contact: Omit<IContact, "id">) {
				return {
					payload: {
						...contact,
						id: nanoid(),
					},
				};
			},
		},
		// Add more reducers as needed
	},
});

export const { contactAdded } = contactsSlice.actions;
export const selectModalState = (state: RootState) => state.modal;

export default contactsSlice.reducer;
