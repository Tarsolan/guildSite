import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import accountStyles from "../css/AccountInfo.module.css";
import { successToast, errorToast } from "../../../utils/hooks/useToast";

const CreateMember = ({ members, onAdd, miscData }) => {
  const { races, specializations } = miscData;
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
      races && (
        <>
          <option selected disabled>
            Choose...
          </option>
          {races.map((race) => {
            return <option key={race.race_id}>{race.race}</option>;
          })}
          ;
        </>
      )
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
        <option selected disabled>
          Add Spec...
        </option>
        <option></option>
        {specializations &&
          specializations.map((spec) => {
            return <option key={spec.spec_id}>{spec.spec_name}</option>;
          })}
        ;
      </select>
    );
  };

  const submitData = async (e) => {
    let returnFlag = false;
    e.preventDefault();

    // const nextID = getNextMemberID();

    // Validate what needs to be validated before saving anything!
    members.map((member) => member.title === title && (returnFlag = true));

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

    if (password !== passwordConfirm) {
      errorToast("Invalid entry. The two passwords do not match.");
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
      specArr
    );

    successToast("Account Created.");
    goToMembers();
  };

  return (
    <div className={accountStyles.accountSection}>
      <h2 className="create-acc-heading">Create Account</h2>
      <form action="/newMember" method="post" onSubmit={submitData}>
        <div className="form-row">
          <div className="form-group col-md-6 offset-md-3">
            <label htmlFor="inputTitle">Title (Username)</label>
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
        <div className="form-row">
          <div className="form-group col">
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
          <div className="form-group col">
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
        <hr />
        <div className="form-row">
          <div className="form-group col">
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
          <div className="form-group col">
            <label htmlFor="inputPassword5">Confirm Password</label>
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
        <div className="form-row">
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
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputSpec">Specialization 1</label>
            {specNames(1)}
          </div>
          <div className="form-group col-md-2"></div>
          <div className="form-group col-md-5">
            <label htmlFor="inputSpec">Specialization 2</label>
            {specNames(2)}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputSpec">Specialization 3</label>
            {specNames(3)}
          </div>
          <div className="form-group col-md-2"></div>
          <div className="form-group col-md-5">
            <label htmlFor="inputSpec">Specialization 4</label>
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
