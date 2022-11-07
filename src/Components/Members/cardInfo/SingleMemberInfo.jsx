import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { successToast } from "../../../utils/hooks/useToast";
import AuthContext from "../../../utils/providers/MemberContextControl";
import styles from "./css/SingleMemberInfo.module.css";

const SingleMemberInfo = ({ member, pointEdit }) => {
  const authCtx = useContext(AuthContext);
  const {
    member_id,
    full_name,
    desc,
    title,
    join_date,
    rank_name,
    spec,
    image_url,
    completed,
    point_total,
  } = member;
  const date = new Date(join_date);
  const [newPointTotal, setNewPointTotal] = useState(point_total);

  const changePoints = async (e) => {
    e.preventDefault();
    pointEdit(newPointTotal, member_id);

    successToast("Point total updated.");
  };

  // Don't forget race!!
  return (
    <div className={styles.singleMemberInfo}>
      <div className={styles.infoContainer}>
        <div className={styles.imgLeft}>
          <img
            src={image_url}
            alt="This person has not uploaded a picture."
            className={"border" + `${rank_name}`}
          />
        </div>
        <div>
          <div className={styles.imgTop}>
            <img
              src={image_url}
              alt="This person has not uploaded a picture."
              className={"border" + `${rank_name}`}
            />
          </div>

          <h2 className={styles.infoName}>{full_name}</h2>
          <p className={styles.infoTitle}>{title}</p>
          <hr />
          <div className={styles.memberRank + ` ${rank_name}`}>{rank_name}</div>
          <hr />
          <div className={styles.infoInfo}>
            <div>
              <span>Member No:</span>
              <span>{member_id}</span>
            </div>
            <div>
              <span>Missions Completed:</span>
              <span>{completed ? completed : `0`}</span>
            </div>

            {authCtx.isAdmin ? (
              <form className={styles.pointForm} onSubmit={changePoints}>
                <label>Point Total:</label>
                <input
                  type="number"
                  value={newPointTotal}
                  onChange={(e) => {
                    setNewPointTotal(e.target.value);
                  }}
                />
              </form>
            ) : (
              <div>
                <span>Point Total:</span>
                <span>{point_total}</span>
              </div>
            )}

            <div>
              <span>Member Since:</span>
              <span>{date.toLocaleDateString()}</span>
            </div>
          </div>
          <hr />
          <div className={styles.infoSpecs}>
            <h3>Specialized Fields:</h3>
            <ul>
              {spec
                ? spec.map((speci) => <li key={speci}>{speci}</li>)
                : `No specs to show`}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.infoDesc}>
        <h2>Description</h2>
        <p>{desc ? desc : `No description available.`}</p>
      </div>
    </div>
  );
};

export default SingleMemberInfo;
