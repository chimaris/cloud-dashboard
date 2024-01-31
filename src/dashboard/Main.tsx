import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Main = () => {
	const contacts = useSelector((state: RootState) => state.contacts.contacts);

	return (
		<div>
			<div className="px-[35px] py-[10px]">
				<h1 className="text-2xl font-extrabold">Dashboard</h1>
				<p>Welcome to Cloud Bank Admin Dashboard</p>
			</div>
			<div>
				<h1>Contacts</h1>
				<ul>
					{contacts.map((contact) => (
						<li key={contact.id}>
							<p>Name: {contact.name}</p>
							<p>Phone Number: {contact.phoneNumber}</p>
							<p>Email: {contact.email}</p>
							<p>Addresses: {contact.addresses.join(", ")}</p>
							<p>
								Coordinates: {contact.latitude}, {contact.longitude}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Main;
