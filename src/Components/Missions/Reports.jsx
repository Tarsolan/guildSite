import React from "react";
import styles from "./css/MissionDetail.module.css";
import { useState } from "react";

const Reports = ({ report, loadMem, onReportEdit, member, toast }) => {
	const [editMode, setEditMode] = useState(false);
	const [newDetail, setNewDetail] = useState(report.report_details);

	const submitData = async (e) => {
		e.preventDefault();
		onReportEdit({ details: newDetail }, report.report_id);
		setEditMode(false);
	};

	const checkEdit = () => {
		if (member !== report.member_id) {
			toast(
				`Please log in as ${report.name} in order to edit this report.`,
				"error"
			);
			return;
		}

		setEditMode(!editMode);
	};

	return (
		<div className={styles.missionReport} key={report.report_id}>
			<div className={styles.reportHead}>
				<h3 onClick={() => loadMem(report)}>{report.name}</h3>
				<button onClick={checkEdit}>{editMode ? `Cancel Edit` : `Edit`}</button>
			</div>
			<hr />
			{editMode ? (
				<form method="put" onSubmit={submitData}>
					<textarea
						name="details"
						type="text"
						value={newDetail}
						onChange={(e) => setNewDetail(e.target.value)}
						rows="5"
					/>
					<hr />
					<button type="submit">Confirm Edits</button>
				</form>
			) : (
				<p>{report.report_details}</p>
			)}
		</div>
	);
};

export default Reports;
