import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModalState } from "../store/slices/sidebarSlice";
import { SidebarSection, Nav, Main, AddContact } from "./index";

interface SidebarSectionProps {
	$isOpen: boolean;
}

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector(selectModalState);

	const handleClose = () => {
		dispatch(closeModal());
	};
	return (
		<DashboardContainer>
			<ContentContainer>
				<Sidebar $isOpen={isOpen}>
					<SidebarSection />
				</Sidebar>
				<MainContent>
					<Nav />
					<Routes>
						<Route index element={<Main />} />
						<Route path="main" element={<Main />} />
						<Route path="add-contact" element={<AddContact />} />"
					</Routes>
				</MainContent>
			</ContentContainer>
		</DashboardContainer>
	);
};

export default AdminDashboard;

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	font-family: "Montserrat";
`;

const ContentContainer = styled.div`
	display: flex;
	/* margin-top: 60px; */
	height: calc(100vh - 60px);
	overflow: hidden;
`;

const Sidebar = styled.div<SidebarSectionProps>`
	width: 250px;
	padding: 20px;
	height: 100%;
	overflow-y: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	background-color: #f7f7f7;

	@media (max-width: 768px) {
		position: fixed;
		top: 60px;
		left: ${({ $isOpen }) => ($isOpen ? "0" : "-250px")};
		z-index: 100;
		transition: left 0.3s ease;
		width: 250px;
		background-color: #fff;
		color: white;
	}
`;

const MainContent = styled.div`
	overflow-y: auto;
	flex: 1;
	/* padding-left: 10px; */
	background-color: #f9fafb;

	@media (max-width: 768px) {
		padding: 0;
	}
`;
