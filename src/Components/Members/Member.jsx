import React from "react";
import styles from "./css/members.module.css";
import { useNavigate } from "react-router-dom";

const Member = ({ member, handleSelect }) => {
	const { full_name, title, race, desc, rank_name, member_id } = member;

	const navigate = useNavigate();
	//const goToMemberPage = (name) => navigate(`/members/info/${name}`);
	const goToMemberPage = (id) => navigate(`/members/info/${id}`);

	const onSelect = (member) => {
		handleSelect(member);
		//goToMemberPage(member.full_name);
		goToMemberPage(member.member_id);
	};

	return (
		<div
			className={styles.memberInfo + ` border${rank_name}`}
			onClick={() => onSelect(member)}
			key={member_id}
		>
			<div>
				<div className={styles.memberName}>{full_name}</div>
				{/* <div className="member-race">{member.race}</div> */}
				<div className={styles.memberTitle}>
					{title} - {race}
				</div>
			</div>

			<div className={styles.memberDesc}>
				{desc === null ? `No description available.` : desc}
			</div>
			<div className={styles.memberId}>Member No: {member_id}</div>
		</div>
	);
};

export default Member;
