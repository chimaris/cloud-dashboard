import { IContact } from "../store/slices/contactSlice";

interface Props {
	contacts: IContact[];
}

const TableView = ({ contacts }: Props) => {
	const getRandomAddress = (addresses: string[]) => {
		if (addresses.length === 0) {
			return null;
		}
		// Generate a random index based on the length of the addresses array
		const randomIndex = Math.floor(Math.random() * addresses.length);
		return addresses[randomIndex];
	};

	return (
		// <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
		// 	<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		// 		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		// 			<tr>
		// 				<th scope="col" className="py-3 px-6">
		// 					SN
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Name
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Phone
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Email
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Address
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Longitude
		// 				</th>
		// 				<th scope="col" className="py-3 px-6">
		// 					Latitude
		// 				</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 			{contacts.map((contact, index) => (
		// 				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
		// 					<td className="py-4 px-6">{index + 1}</td>
		// 					<td className="py-4 px-6">{contact.name}</td>
		// 					<td className="py-4 px-6">{contact.phoneNumber}</td>
		// 					<td className="py-4 px-6">{contact.email}</td>
		// 					<td className="py-4 px-6">{getRandomAddress(contact.addresses)}</td>
		// 					<td className="py-4 px-6">{contact.longitude}</td>
		// 					<td className="py-4 px-6">{contact.latitude}</td>
		// 				</tr>
		// 			))}
		// 		</tbody>
		// 	</table>
		// </div>
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table className="w-auto min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
				<thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">
							SN
						</th>
						<th scope="col" className="py-3 px-6">
							Name
						</th>
						<th scope="col" className="py-3 px-6">
							Phone
						</th>
						<th scope="col" className="py-3 px-6">
							Email
						</th>
						<th scope="col" className="py-3 px-6">
							Address
						</th>
						<th scope="col" className="py-3 px-6">
							Longitude
						</th>
						<th scope="col" className="py-3 px-6">
							Latitude
						</th>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contact, index) => (
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
							<td className="py-4 px-6">{index + 1}</td>
							<td className="py-4 px-6">{contact.name}</td>
							<td className="py-4 px-6">{contact.phoneNumber}</td>
							<td className="py-4 px-6">{contact.email}</td>
							<td className="py-4 px-6 whitespace-nowrap">{getRandomAddress(contact.addresses)}</td>
							<td className="py-4 px-6">{contact.longitude}</td>
							<td className="py-4 px-6">{contact.latitude}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableView;
