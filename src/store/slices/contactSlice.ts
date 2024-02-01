import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IContact {
	id?: string;
	name: string;
	phoneNumber: string;
	email: string;
	addresses: string[];
	longitude?: string;
	latitude?: string;
}

interface ContactsState {
	contacts: IContact[];
}

const initialState: ContactsState = {
	contacts: [
		{
			addresses: ["23 Main Str. Awka, Anambra", "Another Address", "New Address"],
			email: "ray@gmail.com",
			id: "1",
			latitude: "30.8472",
			longitude: "5.9746",
			name: "Ray Allen",
			phoneNumber: "090374838493",
		},
		{
			addresses: ["23 Main Str. Awka, Anambra", "Another Address", "New Address"],
			email: "dami@gmail.com",
			id: "2",
			latitude: "30.8472",
			longitude: "30.9746",
			name: "Damilola Babalola",
			phoneNumber: "08123459349",
		},
	],
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
	},
});

export const { contactAdded } = contactsSlice.actions;
export const selectModalState = (state: RootState) => state.modal;

export default contactsSlice.reducer;
