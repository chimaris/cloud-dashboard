import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Contact {
	id?: string;
	name: string;
	phoneNumber: string;
	email: string;
	addresses: string[];
	longitude: string;
	latitude: string;
}

interface ContactsState {
	contacts: Contact[];
}

const initialState: ContactsState = {
	contacts: [],
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		contactAdded: {
			reducer(state, action: PayloadAction<Contact>) {
				state.contacts.push(action.payload);
			},
			prepare(contact: Omit<Contact, "id">) {
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
