import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectModalState, toggle } from "../store/slices/sidebarSlice";
import { FaRegBell, FaStream, FaTimes } from "react-icons/fa";

const Nav = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector(selectModalState);

	const notificationCount = 3;

	return (
		<NavbarSection>
			<StyledAngleDown onClick={() => dispatch(toggle())}>{isOpen ? <FaTimes /> : <FaStream />}</StyledAngleDown>
			<ProfileDetails>
				<BellIconWrapper>
					<FaRegBell style={{ fontSize: "20px" }} />
					<NotificationCount>{notificationCount}</NotificationCount>
				</BellIconWrapper>
				<span style={{ fontWeight: "600", fontSize: "16px" }}>Stella Maris</span>
			</ProfileDetails>
		</NavbarSection>
	);
};

export default Nav;

const NavbarSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 20px;
	background: #fff;
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledAngleDown = styled.span`
	font-size: 1.5rem;
	cursor: pointer;
	display: block;
	padding-top: 3px;

	@media (min-width: 768px) {
		display: none;
	}
`;

const ProfileDetails = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-left: auto;
`;

const BellIconWrapper = styled.div`
	position: relative;
`;

const NotificationCount = styled.span`
	position: absolute;
	top: -10px;
	right: -16px;
	background-color: #c137a2;
	color: #fff;
	border-radius: 50%;
	padding: 3px 5px;
	font-size: 10px;
	font-weight: bold;
	border: 2px solid #fff;
	box-shadow: 0px 1px 3px 0px #00000029;
`;
