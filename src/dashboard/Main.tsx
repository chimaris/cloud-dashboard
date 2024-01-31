import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TableView from "../components/TableView";
import MapView from "../components/MapView";

const Main = () => {
	const contacts = useSelector((state: RootState) => state.contacts.contacts);
	console.log(contacts);

	return (
		<div>
			<div className="px-[35px] py-10">
				<h1 className="text-2xl font-extrabold text-center md:text-left">Welcome to Cloud Bank Admin Dashboard</h1>
			</div>
			<div className="p-4">
				{contacts.length > 0 ? <TableView contacts={contacts} /> : <h2 className="text-center text-3xl font-bold "> No Contact Found</h2>}
			</div>
			<div className="p-4">
				<MapView contacts={contacts} />
			</div>
		</div>
	);
};

export default Main;
