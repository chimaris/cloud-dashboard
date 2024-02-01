export const validateName = (name: string) => {
	if (!name) return "Name is required";
	if (name.length < 6) return "Name must be at least 6 characters long";
	return "";
};

export const validatePhoneNumber = (phoneNumber: string) => {
	const regex = /^\+?\d{0,13}$/;
	if (!phoneNumber) return "Phone number is required";
	// Remove leading + if present for length validation
	const numericPart = phoneNumber.replace(/^\+/, "");
	if (!regex.test(phoneNumber)) return "Invalid phone number";
	if (numericPart.length < 11 || numericPart.length > 13) return "Phone number must be 11 to 13 digits long.";

	return "";
};

export const validateEmail = (email: string) => {
	const regex = /^\S+@\S+\.\S+$/;
	if (!email) return "Email is required";
	if (!regex.test(email)) return "Invalid email address";
	return "";
};

export const validateAddresses = (addresses: string[]) => {
	return addresses.map((address) => {
		if (!address) return "Address is required";
		// Add any other address validations here
		return "";
	});
};
