import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IContact } from "../store/slices/contactSlice";

const customIcon = new L.Icon({
	iconUrl: "/images/marker-icon.png",
	iconRetinaUrl: "/images/marker-icon-2x.png",
	shadowUrl: "/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

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
				<Marker key={index} position={[+contact.latitude, +contact.longitude]} icon={customIcon}>
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
