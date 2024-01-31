import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./dashboard";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<DashboardLayout />} />
				<Route path="/dashboard/*" element={<DashboardLayout />} />
			</Routes>
		</>
	);
}

export default App;
