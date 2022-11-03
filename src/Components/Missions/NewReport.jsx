import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/NewReport.module.css";
import { successToast, errorToast } from "../../utils/hooks/useToast";

// NEEDED FOR REPORT - sql = ``

const NewReport = ({ mission, member, onPost }) => {
  const { mission_num, job_name } = mission;
  const { member_id, full_name } = member;
  const [reportDetails, setReportDetails] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!checked) {
      errorToast(
        "If you aren't willing to swear by what you say, we aren't willing to accept it as truth. Begone."
      );
      return;
    }

    // var filterDetails = reportDetails.replace(/'/g, "''");

    if (reportDetails !== "") {
      onPost({ mission_num, member_id, report_details: reportDetails });

      successToast("Report filed successfully.");
      goToMissionPage(mission_num);
    } else errorToast("Error! The report cannot be empty!");
  };

  return (
    <div id={styles.reportBackground}>
      <div id={styles.reportPage}>
        <h1>{job_name}</h1>
        <h2>Mission Report</h2>
        <hr />
        <form action="/reports/new" method="POST" onSubmit={onSubmit}>
          <label htmlFor="reportDetail">Report Details</label>
          <textarea
            name="reportDetails"
            id="reportDetail"
            rows="5"
            onChange={(e) => setReportDetails(e.target.value)}
            value={reportDetails}
          />
          <hr />
          <input type="checkbox" onChange={() => setChecked(!checked)} />
          <span>
            &nbsp;I, {full_name}, swear that (to the best of my knowledge)
            everything in this report is true.
          </span>
          <br />
          <br />
          <button type="submit">File Report</button>
        </form>
      </div>
    </div>
  );
};

export default NewReport;
