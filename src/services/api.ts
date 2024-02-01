import axios from "axios";
import { toast } from "react-toastify";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY as string;

// Get coordinates from Google Maps API
export const getCoordinates = async (address: string) => {
	try {
		console.log("loading....");
		console.log("Api KEY", apiKey);

		const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

		const response = await axios.get(apiUrl);
		const data = response.data;

		if (data.status === "OK") {
			const latitude = data.results[0].geometry.location.lat;
			const longitude = data.results[0].geometry.location.lng;

			return { latitude, longitude };
		} else {
			console.log("Error....");

			throw new Error(data.status);
		}
	} catch (error) {
		toast.error("Something happened, couldn't get coordinates");
		console.error("Error fetching coordinates:", error);
		return null;
	}
};
