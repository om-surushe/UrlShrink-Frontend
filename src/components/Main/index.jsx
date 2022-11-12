import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const callUrl = async () => {
		try {
			const url = "http://localhost:3000/api/users";
			const { data: res } = await axios.get(url, { withCredentials: true });

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
			setShrinks(res.tokens);

		} catch (error) {
			console.log(error);
		}
	}

	const [shrinks, setShrinks] = useState([]);

	useEffect(() => { callUrl() }, []);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Shrink Site</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Original</TableCell>
							<TableCell align="right">Shrink</TableCell>
							<TableCell align="right">Count</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{shrinks.map((row) => (
							<TableRow
								key={row.token}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.token}
								</TableCell>
								<TableCell align="right">{row.token}</TableCell>
								<TableCell align="right">{row.token}</TableCell>
							</TableRow>
						))};
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Main;