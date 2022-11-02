import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/editMember.module.css";
import { successToast, errorToast } from "../../../utils/hooks/useToast";

const EditMember = ({
  races,
  specializations,
  ranks,
  member,
  members,
  onEdit,
}) => {
  const { member_id, full_name, desc, title, rank_name, race, spec } = member;

  var name = full_name.split(" ");

  const [firstName, setFirstName] = useState(name[0]);
  const [lastName, setLastName] = useState(name[1]);
  const [description, setDescription] = useState(desc);
  const [newTitle, setTitle] = useState(title);
  const [newRace, setRace] = useState(race);
  const [newRank, setRank] = useState(rank_name);
  const [spec1, setSpec1] = useState(spec[0]);
  const [spec2, setSpec2] = useState(spec[1]);
  const [spec3, setSpec3] = useState(spec[2]);
  const [spec4, setSpec4] = useState(spec[3]);
  const [captcha, setCaptcha] = useState(false);

  const navigate = useNavigate();
  const goToAccountDetail = () => navigate("/account/member/info");

  const raceNames = () => {
    return (
      <>
        <option default>{newRace}</option>
        {races.map((race) => {
          return <option key={race.race_id}>{race.race}</option>;
        })}
        ;
      </>
    );
  };

  const rankNames = () => {
    return (
      <>
        <option default>{newRank}</option>
        {ranks.map((rank) => {
          return <option key={rank.rank_id}>{rank.rank_name}</option>;
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
        <option default>
          {spec[counter - 1] !== undefined ? `${spec[counter - 1]}` : null}
        </option>
        <option value=""></option>;
        {specializations.map((spec) => {
          return <option key={spec.spec_id}>{spec.spec_name}</option>;
        })}
        ;
      </select>
    );
  };

  const submitData = async (e) => {
    let returnFlag = false;
    e.preventDefault();

    // Validate what needs to be validated before saving anything!
    members.forEach((member) => {
      if (member.title === newTitle && newTitle !== title) {
        returnFlag = true;
      }
    });

    if (returnFlag) {
      errorToast(
        "Sorry, that title is already in use. Please use another title."
      );
      return;
    }
    if (!captcha) {
      errorToast(
        "You, my friend, are a robot. We don't take kindly to your kind around here."
      );
      return;
    }

    // Member Data -- to member
    var raceID = "";
    races.forEach((species) => {
      if (species.race === newRace) {
        raceID = species.race_id;
      }
    });
    console.log(raceID);

    var rankID = "";
    ranks.forEach((rank) => {
      if (rank.rank_name === newRank) {
        rankID = rank.rank_id;
      }
    });
    console.log(rankID);

    var specArr = [];

    specializations.forEach((spec) => {
      if (
        spec.spec_name === spec1 ||
        spec.spec_name === spec2 ||
        spec.spec_name === spec3 ||
        spec.spec_name === spec4
      ) {
        console.log(spec.spec_name);
        specArr.push(spec.spec_id);
      }
    });

    var filterDescription = description.replace(/'/g, "''");

    await onEdit(
      {
        member_id,
        firstName,
        lastName,
        newTitle,
        filterDescription,
        raceID,
        rankID,
      },
      specArr
    );
    successToast("Member Account Edited.", "success");

    goToAccountDetail();
  };

  return (
    <div className={styles.accountSection}>
      <h2 className="create-acc-heading">Edit Account Details</h2>
      <form
        className={styles.createAccountForm}
        action="/editMember"
        method="put"
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
          <div className="form-group col-md-5">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={newTitle}
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
          <div className="form-group col-md-4">
            <label htmlFor="inputRank">Rank</label>
            <select
              id="inputRank"
              className="form-control"
              onChange={(e) => {
                setRank(e.target.value);
              }}
            >
              {rankNames()}
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
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm Edit!
        </button>
      </form>
    </div>
  );
};

export default EditMember;
