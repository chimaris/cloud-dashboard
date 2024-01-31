import styled from "styled-components";

const Main = () => {
	return (
		<div>
			<div style={{ padding: "35px 10px" }}>
				<h1 style={{ fontSize: "26px" }}>Dashboard</h1>
				<Para>Welcome to Cloud Bank Admin Dashboard</Para>
			</div>
		</div>
	);
};

export default Main;

const Para = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: 400;
`;
