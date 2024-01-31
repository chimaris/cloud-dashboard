import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggle } from "../store/slices/sidebarSlice";
import { styled } from "styled-components";
import { FaHouse } from "react-icons/fa6";
import { BiPlusCircle } from "react-icons/bi";
import logo from "../assets/logo.jpeg";

type Name = {
	name: string;
	link: string;
	icon: React.ReactNode;
};

// Defined the icons separately
const dashboardIcon = <FaHouse />;
const addContactIcon = <BiPlusCircle />;

// Dashboard navbar list
const sidebarNav: Name[] = [
	{ name: "Dashboard", link: "/dashboard/main", icon: dashboardIcon },
	{ name: "Add Contact", link: "/dashboard/add-contact", icon: addContactIcon },
];

const SidebarSection = () => {
	const dispatch = useDispatch();

	return (
		<>
			{/* <h3 style={{ paddingLeft: "20px" }}>Cloud Bank</h3> */}

			<img src={logo} alt="logo" />

			<div style={{ padding: "40px 0" }}>
				{sidebarNav.map((nav, i) => (
					<StyledNavLink to={nav.link} key={i} style={({ isActive }) => ({ color: isActive ? "#52C0C0" : "" })} onClick={() => dispatch(toggle())}>
						{nav.icon}
						{nav.name}
					</StyledNavLink>
				))}
			</div>
		</>
	);
};

export default SidebarSection;

const StyledNavLink = styled(NavLink)`
	padding: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px;
	color: #101828;
	font-size: 18px;
	font-weight: 500;
	text-decoration: none;
	border-radius: 10px;

	i {
		margin-right: 10px;
	}
	&:hover {
		color: #52c0c0;
	}
`;
