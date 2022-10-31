import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/createMember.module.css";

const CreateMember = ({ races, specializations, members, onAdd, toast }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [race, setRace] = useState("");
	const [spec1, setSpec1] = useState("");
	const [spec2, setSpec2] = useState("");
	const [spec3, setSpec3] = useState("");
	const [spec4, setSpec4] = useState("");
	const [captcha, setCaptcha] = useState(false);
	//   const [remember, setRemember] = useState(false);

	const navigate = useNavigate();
	const goToMembers = () => navigate("/members");

	const raceNames = () => {
		return (
			<>
				<option></option>
				{races.map((race) => {
					return <option key={race.race_id}>{race.race}</option>;
				})}
				;
			</>
		);
	};

	const specNames = (counter) => {
		var setSpec = "";
		switch (counter) {
			case 1:
				setSpec = (e) => setSpec1(e);
				break;
			case 2:
				setSpec = (e) => setSpec2(e);
				break;
			case 3:
				setSpec = (e) => setSpec3(e);
				break;
			case 4:
				setSpec = (e) => setSpec4(e);
				break;
			default:
				break;
		}
		return (
			<select
				id={`inputSpec ${counter}`}
				className="form-control"
				onChange={(e) => {
					setSpec(e.target.value);
				}}
			>
				<option></option>;
				{specializations.map((spec) => {
					return <option key={spec.spec_id}>{spec.spec_name}</option>;
				})}
				;
			</select>
		);
	};

	//   const addSpec = () => {
	//     return (
	//       <div className="form-group col-md-4">
	//         <label htmlFor="inputSpec">Specialization</label>
	//         <select
	//           id="inputSpec"
	//           className="form-control"
	//           onChange={(e) => {
	//             setSpec(e.target.value);
	//           }}
	//         >
	//           {specNames}
	//         </select>
	//       </div>
	//     );
	//   };

	const getNextMemberID = () => {
		return members[members.length - 1].member_id + 1;
	};

	const submitData = async (e) => {
		let returnFlag = false;
		e.preventDefault();

		const nextID = getNextMemberID();

		// Validate what needs to be validated before saving anything!
		members.map((member) => member.title === title && (returnFlag = true));

		if (returnFlag) {
			toast(
				"Sorry, that title is already in use. Please use another title.",
				"error"
			);
			return;
		}
		if (!captcha) {
			toast(
				"You, my friend, are a robot. We don't take kindly to your kind around here.",
				"error"
			);
			return;
		}

		if (password !== passwordConfirm) {
			toast("Invalid entry. The two passwords do not match.", "error");
			return;
		}
		// Member Data -- to member
		var raceID = "";
		races.forEach((species) => {
			if (species.race === race) {
				raceID = species.race_id;
			}
		});

		var specArr = [];

		specializations.forEach((spec) => {
			if (
				spec.spec_name === spec1 ||
				spec.spec_name === spec2 ||
				spec.spec_name === spec3 ||
				spec.spec_name === spec4
			) {
				specArr.push(spec.spec_id);
			}
		});

		var filterDescription = description.replace(/'/g, "''");

		await onAdd(
			{
				firstName,
				lastName,
				password,
				title,
				filterDescription,
				raceID,
			},
			{ nextID, specArr }
		);
		// const newMemRes = await fetch("http://localhost:3001/members");
		// const newMemData = await newMemRes.text();
		// const data = JSON.parse(newMemData);
		// const nextID = data[data.length - 1].member_id;
		// console.log(nextID);
		// await onAddSpec();
		// Spec Data -- to member_spec
		toast("Account Created.", "success");
		goToMembers();
	};

	return (
		<div className={styles.accountSection}>
			<h2 className="create-acc-heading">Create Account</h2>
			<form
				className={styles.createAccountForm}
				action="/newMember"
				method="post"
				onSubmit={submitData}
			>
				<div className={styles.formRow}>
					<div className="form-group col-md-5">
						<label htmlFor="inputFirstName4">First Name</label>
						<input
							type="text"
							className="form-control"
							id="inputFirstName4"
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							value={firstName}
						/>
					</div>
					<div className="form-group col-md-5">
						<label htmlFor="inputLastName4">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="inputLastName4"
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							value={lastName}
						/>
					</div>
				</div>
				<div className={styles.formRow}>
					<div className="form-group col-md-4">
						<label htmlFor="inputPassword4">Password</label>
						<input
							type="password"
							className="form-control"
							id="inputPassword4"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
						/>
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputPassword5"> Confirm Password</label>
						<input
							type="password"
							className="form-control"
							id="inputPassword5"
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
							value={passwordConfirm}
						/>
					</div>
				</div>
				<div className={styles.formRow}>
					<div className="form-group col-md-5">
						<label htmlFor="inputTitle">Title</label>
						<input
							type="text"
							className="form-control"
							id="inputTitle"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							value={title}
						/>
					</div>
				</div>
				<hr />
				<div>
					<h3>Other Information</h3>
				</div>
				<div className="form-group">
					<label htmlFor="inputDesc">Description</label>
					<textarea
						type="text"
						className="form-control"
						id="inputDesc"
						rows="4"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						value={description}
					/>
				</div>
				<div className={styles.formRow}>
					<div className="form-group col-md-4">
						<label htmlFor="inputRace">Race</label>
						<select
							id="inputRace"
							className="form-control"
							onChange={(e) => {
								setRace(e.target.value);
							}}
						>
							{raceNames()}
						</select>
					</div>
				</div>

				<h3>Specializations</h3>
				<div className={styles.formRow}>
					<div className="form-group col-md-4">
						<label htmlFor="inputSpec">Specialization</label>
						{specNames(1)}
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputSpec">Specialization</label>
						{specNames(2)}
					</div>
				</div>
				<div className={styles.formRow}>
					<div className="form-group col-md-4">
						<label htmlFor="inputSpec">Specialization</label>
						{specNames(3)}
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputSpec">Specialization</label>
						{specNames(4)}
					</div>
				</div>
				<hr />
				<div className="form-group">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							id="gridCheck"
							onChange={() => {
								setCaptcha(!captcha);
							}}
						/>
						<label className="form-check-label" htmlFor="gridCheck">
							I am not a robot!
						</label>
					</div>
					{/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck2"
              onChange={() => {
                setRemember(!remember);
              }}
            />
            <label className="form-check-label" htmlFor="gridCheck2">
              Log me in automatically!
            </label>
          </div> */}
				</div>
				<button type="submit" className="btn btn-primary">
					Create Account!
				</button>
			</form>
		</div>
	);
};

export default CreateMember;
