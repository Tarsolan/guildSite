import React from "react";
import styles from "./css/memberInfo.module.css";

const MemberInfo = ({ member }) => {
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
  } = member;
  const date = new Date(join_date);

  // Don't forget race!!
  var borderStyle = `border${rank_name}`;
  return (
    <div className={styles.singleMemberInfo}>
      <div className={styles.infoContainer}>
        <div className={styles.imgLeft}>
          <img
            src={image_url}
            alt="Member"
            className={"border" + `${rank_name}`}
          />
        </div>
        <div>
          <div className={styles.imgTop}>
            <img
              src={image_url}
              alt="Member"
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

export default MemberInfo;
