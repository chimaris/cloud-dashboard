import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IContact } from "../store/slices/contactSlice";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
	contacts: IContact[];
}

const MapActions = ({ contacts }: Props) => {
	const map = useMap();

	useEffect(() => {
		if (contacts.length > 0) {
			const { latitude, longitude } = contacts[0];
			map.flyTo([latitude, longitude], 3);
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
