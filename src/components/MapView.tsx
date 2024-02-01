import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IContact } from "../store/slices/contactSlice";

// export interface Contact {
// 	id?: string;
// 	name: string;
// 	phoneNumber: string;
// 	email: string;
// 	addresses: string[];
// 	longitude: number;
// 	latitude: number;
// }

interface Props {
	contacts: IContact[];
}

const MapActions = ({ contacts }: Props) => {
	const map = useMap();

	useEffect(() => {
		if (contacts.length > 0) {
			const { latitude, longitude } = contacts[0];
			map.flyTo([latitude, longitude], 4);
		}
	}, [contacts, map]);

	return null;
};

const MapView = ({ contacts }: Props) => {
	return (
		<MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{contacts.map((contact, index) => (
				<Marker key={index} position={[+contact.latitude, +contact.longitude]}>
					<Popup>
						{contact.name} - {contact.email}
					</Popup>
				</Marker>
			))}
			<MapActions contacts={contacts} />
		</MapContainer>
	);
};

export default MapView;
