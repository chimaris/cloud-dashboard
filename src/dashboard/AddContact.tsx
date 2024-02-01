import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactAdded } from "../store/slices/contactSlice";
import { toast } from "react-toastify";
import { validateAddresses, validateEmail, validateLocation, validateName, validatePhoneNumber } from "../utils/validations";
import { RootState } from "../store/store";
import { setLoading } from "../store/slices/contactSlice";

import { BeatLoader } from "react-spinners";
// import { getCoordinates } from "../services/api";

const maxAddresses = 5; // Maximum number of addresses
interface ContactErrors {
	name: string;
	phoneNumber: string;
	email: string;
	addresses: string[];
	location: string;
}

const AddContact = () => {
	const [contact, setContact] = useState({
		name: "",
		phoneNumber: "",
		email: "",
		addresses: [""],
		longitude: 0.0,
		latitude: 0.0,
	});
	const [errors, setErrors] = useState<ContactErrors>({
		name: "",
		phoneNumber: "",
		email: "",
		addresses: [],
		location: "",
	});

	const dispatch = useDispatch();
	const isLoading = useSelector((state: RootState) => state.contacts.isLoading);

	const fetchGeolocation = () => {
		dispatch(setLoading(true));

		if (!navigator.geolocation) {
			toast.error("Geolocation is not supported by your browser");
			dispatch(setLoading(false));
			return;
		}
		function success(position: Record<string, any>) {
			const longitude = position.coords.longitude.toFixed(4);
			const latitude = position.coords.latitude.toFixed(4);

			setContact((prevContact) => ({
				...prevContact,
				longitude,
				latitude,
			}));

			toast.success("Longitude and latitude retrieved successfully");
			dispatch(setLoading(false));
		}
		function error(err: GeolocationPositionError) {
			if (err.code === err.PERMISSION_DENIED) {
				// User denied the request for Geolocation
				toast.error("You have denied the request for Geolocation. Please enable it to use this feature.");
			} else {
				toast.error("Unable to retrieve your location");
			}
			dispatch(setLoading(false));
		}
		navigator.geolocation.getCurrentPosition(success, error);
	};

	useEffect(() => {
		fetchGeolocation();
	}, []);

	// Get coordinates of the first address
	// const getContactLocations = async (addresses: string) => {
	// 	const res = await getCoordinates(addresses);
	// 	if (res) {
	// 		setContact((prevContact) => ({
	// 			...prevContact,
	// 			longitude: res.longitude,
	// 			latitude: res.latitude,
	// 		}));
	// 	} else {
	// 		toast.error("Failed to get coordinates");
	// 	}
	// };

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setErrors({ ...errors, [name]: "" });
		setContact({ ...contact, [name]: value });
	};

	// Handle address change
	const handleAddressChange = (index: number, value: string) => {
		const updatedAddresses = [...contact.addresses];
		updatedAddresses[index] = value;
		setContact({ ...contact, addresses: updatedAddresses });
	};

	// Add address field
	const addAddressField = () => {
		if (contact.addresses.length < maxAddresses) {
			setContact({ ...contact, addresses: [...contact.addresses, ""] });
		}
	};

	// Remove address field
	const removeAddressField = (index: number) => {
		const updatedAddresses = [...contact.addresses];
		updatedAddresses.splice(index, 1);
		setContact({ ...contact, addresses: updatedAddresses });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const nameError = validateName(contact.name);
		const phoneNumberError = validatePhoneNumber(contact.phoneNumber);
		const emailError = validateEmail(contact.email);
		const addressesErrors = validateAddresses(contact.addresses);
		const locationErrors = validateLocation(contact.longitude, contact.latitude);

		if (nameError || phoneNumberError || emailError || addressesErrors.some((err) => err) || locationErrors) {
			setErrors({
				name: nameError,
				phoneNumber: phoneNumberError,
				email: emailError,
				addresses: addressesErrors,
				location: locationErrors,
			});
			return;
		}

		dispatch(contactAdded(contact));
		toast.success("Contact added successfully!");
		setContact({
			name: "",
			phoneNumber: "",
			email: "",
			addresses: [""],
			longitude: 0.0,
			latitude: 0.0,
		});
	};

	return (
		<div className="my-10 flex flex-col justify-center w-full md:w-2/4 m-auto">
			<form onSubmit={handleSubmit} className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">Add Contact</h2>

				<div className="flex flex-col mb-4">
					<label className="mb-2 font-bold text-lg text-gray-900" htmlFor="name">
						Name
					</label>
					<input
						className="border py-2 px-3 text-grey-800"
						type="text"
						name="name"
						id="name"
						value={contact.name}
						onChange={handleInputChange}
						required
					/>
					<p className="text-red-500 text-sm">{errors?.name}</p>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col mb-4">
						<label className="mb-2 font-bold text-lg text-gray-900" htmlFor="phoneNumber">
							Phone Number
						</label>
						<input
							className="border py-2 px-3 text-grey-800"
							type="tel"
							name="phoneNumber"
							id="phoneNumber"
							value={contact.phoneNumber}
							onChange={handleInputChange}
							required
							pattern="^\+?\d{0,13}"
						/>
						<p className="text-red-500 text-sm">{errors?.phoneNumber}</p>
					</div>

					<div className="flex flex-col mb-4">
						<label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">
							Email
						</label>
						<input
							className="border py-2 px-3 text-grey-800"
							type="email"
							name="email"
							id="email"
							value={contact.email}
							onChange={handleInputChange}
							required
						/>
						<p className="text-red-500 text-sm">{errors?.email}</p>
					</div>
				</div>

				{contact.addresses.map((address, index) => (
					<div key={index} className="flex flex-col mb-4">
						<label className="mb-2 font-bold text-lg text-gray-900" htmlFor={`address-${index}`}>
							Address {index + 1}
						</label>
						<div className="flex">
							<input
								className="border py-2 px-3 text-grey-800 flex-grow"
								type="text"
								name={`address-${index}`}
								id={`address-${index}`}
								value={address}
								onChange={(e) => handleAddressChange(index, e.target.value)}
								required
							/>
							{index > 0 && (
								<button type="button" onClick={() => removeAddressField(index)} className="ml-2 bg-red-500 text-white px-3 py-2 rounded shadow">
									Remove
								</button>
							)}
							<p className="text-red-500 text-sm">{errors?.addresses}</p>
						</div>
					</div>
				))}

				{contact.addresses.length < maxAddresses && (
					<button type="button" onClick={addAddressField} className="mb-4 bg-[#52C0C0] text-white px-3 py-2 rounded shadow">
						Add more
					</button>
				)}

				{/* Longitute and Latitude fields */}
				<div className="grid grid-cols-2 md:grid-cols-3 items-center gap-2">
					<div className="flex flex-col mb-4">
						<label className="mb-2 font-bold text-lg text-gray-900" htmlFor="longitude">
							Longitude
						</label>
						<input className="border py-2 px-3 text-grey-800" type="text" name="longitude" id="longitude" value={contact.longitude} readOnly />
					</div>
					<div className="flex flex-col mb-4">
						<label className="mb-2 font-bold text-lg text-gray-900" htmlFor="latitude">
							Latitude
						</label>
						<input className="border py-2 px-3 text-grey-800" type="text" name="latitude" id="latitude" value={contact.latitude} readOnly />
					</div>
					<div className="">
						<button type="button" className="bg-[#52C0C0] text-white p-2 mt-4" onClick={fetchGeolocation}>
							{isLoading ? (
								<BeatLoader color="#fff" loading={isLoading} size={10} aria-label="Loading Spinner" data-testid="loader" />
							) : (
								"Get lat & long"
							)}
						</button>
					</div>
					<p className="text-red-500 text-sm">{errors?.location}</p>
				</div>

				<div className="flex justify-center items-center w-full mt-10">
					<button type="submit" className="bg-[#52C0C0] text-white px-5 py-2 rounded shadow w-full">
						Save Contact
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddContact;
