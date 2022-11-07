import React from "react";
import styles from "./css/MissionDetail.module.css";
import stamp from "../../utils/images/complete_2.png";
import pushPin from "../../utils/images/push_pin.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MemberInfo from "../Members/cardInfo/SingleMemberInfo";
import Reports from "./Reports";
import { errorToast } from "../../utils/hooks/useToast";

const MissionDetail = ({
  mission,
  handleSelectMem,
  memberInfo,
  clientInfo,
  selectedMember,
  onReportEdit,
}) => {
  const {
    complete,
    mission_num,
    job_name,
    contact_name,
    job_description,
    payout,
    organization,
    deadline_date,
    reports,
  } = mission;

  const deadline = new Date(deadline_date);

  const [viewMission, setViewMission] = useState(true);
  const [showMem, setShowMem] = useState(false);

  const loadMem = (member_id) => {
    handleSelectMem(member_id);
    setShowMem(true);
  };

  const displayReport = () => {
    return (
      <div className={styles.reportContainer}>
        {reports.map((report) => {
          return (
            <Reports
              report={report}
              loadMem={loadMem}
              onReportEdit={onReportEdit}
              member={memberInfo}
            />
          );
        })}
        ;
      </div>
    );
  };

  const navigate = useNavigate();
  const goToFileReport = () => {
    if (memberInfo) {
      navigate(`/missions/info/${mission_num}/reports/new`);
    } else {
      errorToast("Please log in as a member before filing a report.");
    }
  };

  const goToEditMission = () => {
    if (!clientInfo) {
      errorToast("Please log in as the client before editing the mission.");
      return;
    }
    if (clientInfo.organization !== organization) {
      errorToast(`Sorry, but only ${organization} can edit this mission.`);
    } else {
      navigate(`/missions/info/${mission_num}/edit`);
    }
  };

  return (
    <>
      <div id={styles.missionDetail}>
        <div id={styles.missionPage}>
          <div className={styles.detailTop}>
            <img
              src={pushPin}
              alt="A push pin to hold paper"
              className={styles.missionPin}
            />
            <h1>{job_name}</h1>
            {viewMission ? (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailRowHead}>Organization:</span>
                  <span>{organization}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailRowHead}>Contact Name:</span>
                  <span>{contact_name}</span>
                </div>

                <hr />
                <div className={styles.detailMid}>
                  <h2>Job Description</h2>
                  <p className={styles.description}>{job_description}</p>
                  {complete && (
                    <img
                      src={stamp}
                      alt="Completed mission"
                      className={styles.missionComplete}
                    />
                  )}
                </div>
                <hr />
                <div className={styles.detailBot}>
                  <div className={styles.detailPayout}>
                    <h3>Payout:</h3>
                    <ul>
                      <li>{payout} rocks</li>
                    </ul>
                  </div>

                  <div className={styles.missionNumContainer}>
                    <span id={styles.missionNum}>{mission_num}</span>
                    <span className={styles.missionNum}>Mission Number</span>
                  </div>
                  <div className={styles.deadline}>
                    <h3>Deadline:</h3>
                    <p className={styles.date}>
                      {deadline.toLocaleDateString()}
                    </p>
                  </div>
                  <div className={styles.signatureContainer}>
                    <span id={styles.signature}>Auron Warfield</span>
                    <span className={styles.signature}>
                      Guild Registrar Signature
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.reportTitle}>Mission Reports</h2>
                <hr />
                <div>
                  {reports.length > 0 ? displayReport() : `No reports to show.`}
                </div>
              </>
            )}
            <hr />

            <div className={styles.detailButtons}>
              <button onClick={goToEditMission}>Edit Mission</button>
              <button onClick={goToFileReport}>File Report</button>
              <button onClick={() => setViewMission(!viewMission)}>
                {viewMission ? `View Reports` : `View Mission Details`}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMem && <MemberInfo member={selectedMember} />}
    </>
  );
};

export default MissionDetail;
