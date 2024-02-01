import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IContact {
	id?: string;
	name: string;
	phoneNumber: string;
	email: string;
	addresses: string[];
	longitude: number;
	latitude: number;
}

interface ContactsState {
	contacts: IContact[];
	isLoading: boolean;
}

const initialState: ContactsState = {
	contacts: [
		{
			id: "1",
			name: "Ray Allen",
			phoneNumber: "090374838493",
			email: "ray@gmail.com",
			latitude: 30.8472,
			longitude: 5.9746,
			addresses: ["33, Marina Lagos Island", "13, Idugaran Str, Enuowa Lagos"],
		},
		{
			id: "2",
			name: "Damilola Babalola",
			phoneNumber: "08123459349",
			email: "dami@gmail.com",
			latitude: 30.8472,
			longitude: 30.9746,
			addresses: ["10 Bakare Fuko Str, Amukoko", "No.133 Awolowo Road Ikoyi", "No. 1, Marina Raod Epe"],
		},
	],
	isLoading: false,
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
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { contactAdded, setLoading } = contactsSlice.actions;
export const selectModalState = (state: RootState) => state.modal;

export default contactsSlice.reducer;
