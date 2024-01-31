import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IContact } from "../store/slices/contactSlice";

interface Props {
	contacts: IContact[];
}

const MapView = ({ contacts }: Props) => {
	const [map, setMap] = useState(null);

	useEffect(() => {
		if (map) {
			map.flyTo([contacts[0].latitude, contacts[0].longitude], 13);
		}
	}, [contacts, map]);

	return (
		<MapContainer whenCreated={setMap} center={[0, 0]} zoom={2} scrollWheelZoom={false} style={{ height: "400px", width: "100%", zIndex: 10 }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{contacts.map((contact, index) => (
				<Marker key={index} position={[contact.latitude, contact.longitude]}>
					<Popup>
						{contact.name} - {contact.email}
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default MapView;
