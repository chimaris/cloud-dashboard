import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<DashboardLayout />} />
				<Route path="/dashboard/*" element={<DashboardLayout />} />
			</Routes>
		</>
	);
}

export default App;
