import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TableView from "../components/TableView";

const Main = () => {
	const contacts = useSelector((state: RootState) => state.contacts.contacts);
	console.log(contacts);

	return (
		<div>
			<div className="px-[35px] py-[10px]">
				<h1 className="text-2xl font-extrabold">Dashboard</h1>
				<p>Welcome to Cloud Bank Admin Dashboard</p>
			</div>
			{/* <div>
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
			</div> */}
			<div className="p-4">
				{contacts.length > 0 ? <TableView contacts={contacts} /> : <h2 className="text-center text-4xl font-bold "> No Contacts found</h2>}
			</div>
		</div>
	);
};

export default Main;
