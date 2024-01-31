import React, { useState } from "react";

const maxAddresses = 5; // Maximum number of addresses

const AddContact = () => {
	const [contact, setContact] = useState({
		name: "",
		phoneNumber: "",
		email: "",
		addresses: [""],
		longitude: "0.0000", // Default value for longitude, not editable
		latitude: "0.0000", // Default value for latitude, not editable
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value });
	};

	const handleAddressChange = (index, value) => {
		const updatedAddresses = [...contact.addresses];
		updatedAddresses[index] = value;
		setContact({ ...contact, addresses: updatedAddresses });
	};

	const addAddressField = () => {
		if (contact.addresses.length < maxAddresses) {
			setContact({ ...contact, addresses: [...contact.addresses, ""] });
		}
	};

	const removeAddressField = (index) => {
		const updatedAddresses = [...contact.addresses];
		updatedAddresses.splice(index, 1);
		setContact({ ...contact, addresses: updatedAddresses });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Form submission logic here
		console.log(contact);
	};

	return (
		// <form onSubmit={handleSubmit}>
		// 	<input type="text" name="name" value={contact.name} onChange={handleInputChange} required />
		// 	<input
		// 		type="tel"
		// 		name="phoneNumber"
		// 		value={contact.phoneNumber}
		// 		onChange={handleInputChange}
		// 		required
		// 		pattern="^\+?\d{0,13}" // Simple phone number pattern, adjust as needed
		// 	/>
		// 	<input type="email" name="email" value={contact.email} onChange={handleInputChange} required />
		// 	{contact.addresses.map((address, index) => (
		// 		<div key={index}>
		// 			<input type="text" value={address} onChange={(e) => handleAddressChange(index, e.target.value)} required />
		// 			{index > 0 && (
		// 				<button type="button" onClick={() => removeAddressField(index)}>
		// 					Remove
		// 				</button>
		// 			)}
		// 		</div>
		// 	))}
		// 	<button type="button" onClick={addAddressField} disabled={contact.addresses.length >= maxAddresses}>
		// 		Add Address
		// 	</button>
		// 	<input type="text" name="longitude" value={contact.longitude} readOnly />
		// 	<input type="text" name="latitude" value={contact.latitude} readOnly />
		// 	<button type="submit">Submit</button>
		// </form>
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center">
			<form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
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
				</div>

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
						</div>
					</div>
				))}

				<button
					type="button"
					onClick={addAddressField}
					className="mb-4 bg-blue-500 text-white px-3 py-2 rounded shadow"
					disabled={contact.addresses.length >= maxAddresses}>
					Add Address
				</button>

				{/* Longitute and Latitude fields */}
				<div>
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
					<button type="button" className="btn">
						Get My Location
					</button>
				</div>

				<div className="flex justify-between items-center">
					<button type="submit" className="bg-green-500 text-white px-3 py-2 rounded shadow">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddContact;
